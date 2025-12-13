# Generate self-signed certificate for local HTTPS development
# Usage: .\dev-certs-win.ps1 -Domain "localhost" -Days 365 -OutputDir "certs" -UpdateHosts

param(
    [Parameter(Mandatory=$false)]
    [string]$Domain = "localhost",
    
    [Parameter(Mandatory=$false)]
    [int]$Days = 365,
    
    [Parameter(Mandatory=$false)]
    [string]$OutputDir = "certs",
    
    [Parameter(Mandatory=$false)]
    [int]$KeySize = 2048,
    
    [Parameter(Mandatory=$false)]
    [switch]$UpdateHosts
)

# Function to check if running as Administrator
function Test-Administrator {
    $currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

# Function to update hosts file
function Update-HostsFile {
    param([string]$Domain)
    
    $hostsPath = "$env:windir\System32\drivers\etc\hosts"
    $hostsEntry = "127.0.0.1`t$Domain"
    
    if (!(Test-Administrator)) {
        Write-Host "Warning: Administrator privileges required to update hosts file." -ForegroundColor Yellow
        Write-Host "Please run PowerShell as Administrator or manually add:" -ForegroundColor Yellow
        Write-Host "  $hostsEntry" -ForegroundColor Cyan
        Write-Host "to $hostsPath" -ForegroundColor Cyan
        return $false
    }
    
    # Read current hosts file
    $hostsContent = Get-Content $hostsPath -Raw
    
    # Check if domain already exists
    if ($hostsContent -match "[\s]$([regex]::Escape($Domain))([\s]|$)") {
        Write-Host "Domain '$Domain' already exists in hosts file." -ForegroundColor Green
        return $true
    }
    
    # Add entry
    try {
        Add-Content -Path $hostsPath -Value "`n$hostsEntry" -NoNewline:$false
        Write-Host "Added '$Domain' to hosts file." -ForegroundColor Green
        return $true
    } catch {
        Write-Host "Failed to update hosts file: $_" -ForegroundColor Red
        return $false
    }
}

Write-Host "Generating self-signed certificate for: $Domain" -ForegroundColor Green

# Create output directory if it doesn't exist
if (!(Test-Path -Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir | Out-Null
}

# Create OpenSSL config file with SAN (DNS.1 is for Subject Alternative Name)
$opensslConfig = @"
[req]
default_bits = $KeySize
prompt = no
default_md = sha256
distinguished_name = dn
req_extensions = v3_req

[dn]
CN = $Domain

[v3_req]
subjectAltName = @alt_names

[alt_names]
DNS.1 = $Domain
"@

$configPath = Join-Path $OutputDir "openssl.cnf"
$keyPath = Join-Path $OutputDir "server.key"
$certPath = Join-Path $OutputDir "server.crt"

$opensslConfig | Out-File -FilePath $configPath -Encoding ASCII

# Generate the certificate with SAN
openssl req -x509 -newkey rsa:$KeySize -nodes -sha256 `
    -keyout $keyPath -out $certPath `
    -days $Days -config $configPath -extensions v3_req

# Clean up the OpenSSL config file
if (Test-Path $configPath) {
    Remove-Item $configPath -Force
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "Certificate generated successfully!" -ForegroundColor Green
    Write-Host ""
    
    # Check if certificate already exists and remove old ones
    Write-Host "Checking for existing certificates..." -ForegroundColor Green
    $existingCerts = Get-ChildItem -Path Cert:\CurrentUser\Root | Where-Object { 
        $_.Subject -like "*$Domain*" 
    }
    
    if ($existingCerts) {
        Write-Host "Found $($existingCerts.Count) existing certificate(s). Removing..." -ForegroundColor Yellow
        $existingCerts | Remove-Item
    }
    
    Write-Host "Installing certificate to Trusted Root Certification Authorities..." -ForegroundColor Green
    Import-Certificate -FilePath $certPath -CertStoreLocation Cert:\CurrentUser\Root | Out-Null
    
    if ($?) {
        Write-Host "Certificate installed successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Domain: $Domain" -ForegroundColor Cyan
        Write-Host "Valid for: $Days days" -ForegroundColor Cyan
        Write-Host "Key size: $KeySize bits" -ForegroundColor Cyan
        Write-Host ""
        
        # Update hosts file if requested and domain is not localhost
        if ($UpdateHosts -and $Domain -ne "localhost" -and $Domain -ne "127.0.0.1") {
            Write-Host "Updating hosts file..." -ForegroundColor Green
            Update-HostsFile -Domain $Domain
            Write-Host ""
        }
        
        Write-Host "Setup complete! Please restart your browser for changes to take effect." -ForegroundColor Yellow
    } else {
        Write-Host "Failed to install certificate. You can manually import it:" -ForegroundColor Red
        Write-Host "1. Run: certmgr.msc" -ForegroundColor Yellow
        Write-Host "2. Import $certPath to Trusted Root Certification Authorities" -ForegroundColor Yellow
    }
} else {
    Write-Host "Error generating certificate. Make sure OpenSSL is installed." -ForegroundColor Red
}
