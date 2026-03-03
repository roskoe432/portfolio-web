# Migration from Container Apps to Azure Static Web Apps

## Overview

This guide walks you through migrating from Azure Container Apps to Azure Static Web Apps for your portfolio static site. This will significantly reduce costs while maintaining all functionality including custom domain support.

## What Changed

### Before (Container Apps)

- ❌ Azure Container Registry (~$5/month)
- ❌ Container App Environment (~$15-30/month)
- ❌ Container App instance (~$10-20/month)
- ❌ Log Analytics Workspace (Pay per GB)
- 🐳 Requires Docker builds
- **Total: ~$30-55/month**

### After (Static Web Apps)

- ✅ Azure Static Web App (Free tier)
- ✅ No Docker needed
- ✅ Built-in SSL/TLS
- ✅ Custom domain support
- ✅ Global CDN included
- **Total: $0/month (Free tier)**

## Migration Steps

### Step 1: Destroy Current Infrastructure

1. Go to your GitHub repository
2. Navigate to **Actions** tab
3. Select **Portfolio Web - Destroy** workflow
4. Click **Run workflow** → **Run workflow**
5. Wait for completion (~2-5 minutes)

This will clean up:

- Container App
- Container App Environment
- Container Registry
- Log Analytics Workspace

### Step 2: Verify Destruction

Check that all resources were removed:

```bash
az resource list --resource-group portfolio-rg --output table
```

Should return empty or only show the resource group itself.

### Step 3: Deploy New Infrastructure

1. Go to **Actions** tab
2. Select **Portfolio Web - Deploy** workflow
3. Click **Run workflow** → **Run workflow**
4. Wait for completion (~3-5 minutes)

This will:

- Create Azure Static Web App
- Build your site
- Deploy to Static Web App
- Output the default URL (e.g., `https://portfolio-web-xxxxx.azurestaticapps.net`)

### Step 4: Configure Custom Domain (Optional)

If you have a custom domain:

#### Option A: Through Azure Portal

1. Go to Azure Portal → Static Web Apps → portfolio-web
2. Navigate to **Custom domains**
3. Click **+ Add**
4. Choose **Custom domain on any DNS provider**
5. Enter your domain (e.g., `www.yourdomain.com`)
6. Add the provided CNAME record to your DNS provider
7. Wait for validation (~5-15 minutes)

#### Option B: Through Terraform (Recommended)

1. Update `terraform/terraform.tfvars`:

   ```terraform
   custom_domain = "www.yourdomain.com"
   ```

2. Uncomment the custom domain resource in `terraform/main.tf`:

   ```terraform
   resource "azurerm_static_web_app_custom_domain" "main" {
     static_web_app_id = azurerm_static_web_app.main.id
     domain_name       = var.custom_domain
     validation_type   = "cname-delegation"
   }
   ```

3. Uncomment the variable in `terraform/variables.tf`:

   ```terraform
   variable "custom_domain" {
     type        = string
     description = "Custom domain name for the static web app"
     default     = ""
   }
   ```

4. Add CNAME record to your DNS:

   ```
   Name: www (or @)
   Type: CNAME
   Value: <your-static-web-app>.azurestaticapps.net
   ```

5. Run the deploy workflow again

### Step 5: Update Environment Variables (If Needed)

If you added new GitHub Actions variables/secrets for the container deployment:

- The new workflow uses the same variables
- No changes needed for existing VITE\_\* variables

### Step 6: Clean Up (Optional)

Files you can now remove (optional):

- `Dockerfile` - No longer needed
- `nginx.conf` - No longer needed for static hosting
- `.dockerignore` - No longer needed

Or keep them for reference/documentation purposes.

## Custom Domain DNS Configuration

### For Root Domain (yourdomain.com)

```
Type: ALIAS or ANAME
Value: <your-static-web-app>.azurestaticapps.net
```

### For Subdomain (www.yourdomain.com)

```
Type: CNAME
Value: <your-static-web-app>.azurestaticapps.net
```

### Apex Domain with CNAME Flattening

Some DNS providers (Cloudflare, Azure DNS) support CNAME flattening:

```
Type: CNAME
Name: @
Value: <your-static-web-app>.azurestaticapps.net
```

## Rollback Plan

If you need to rollback to Container Apps:

1. Revert the following files using git:

   ```bash
   git checkout HEAD~1 -- terraform/
   git checkout HEAD~1 -- .github/workflows/
   ```

2. Run the deploy workflow

## Testing Checklist

After migration, verify:

- [ ] Site loads on default URL
- [ ] All pages work correctly
- [ ] Static assets load (images, fonts, etc.)
- [ ] Custom domain resolves (if configured)
- [ ] SSL/TLS certificate is valid
- [ ] Resume PDF downloads correctly
- [ ] Perlenspiel iframe works

## FAQ

**Q: Will my custom domain work?**  
A: Yes! Azure Static Web Apps supports custom domains with free SSL certificates.

**Q: Is there a limit on the free tier?**  
A: Free tier includes:

- 100 GB bandwidth/month
- 0.5 GB storage
- 2 custom domains
- Sufficient for most personal portfolios

**Q: Can I add a backend API later?**  
A: Yes! Static Web Apps supports Azure Functions as API backends. You can add this later.

**Q: What about the backend I'm working on?**  
A: Deploy your backend separately as a Container App. Your frontend (static site) can call the backend API.

**Q: Will GitHub Actions still work?**  
A: Yes! The new workflow is simpler and faster (no Docker build needed).

## Cost Comparison

### Old Setup (Monthly)

- Container Registry: ~$5
- Container App Environment: ~$15-30
- Container App (1 replica): ~$10-20
- Log Analytics: ~$2-5
- **Total: ~$32-60/month**

### New Setup (Monthly)

- Static Web Apps (Free tier): $0
- **Total: $0/month**

### Annual Savings

**~$384-720/year** 💰

## Support

If you encounter issues:

1. Check GitHub Actions logs
2. Check Azure Portal → Static Web Apps → Deployment history
3. Verify DNS propagation: https://dnschecker.org/

## Next Steps

1. ✅ Run destroy workflow
2. ✅ Run deploy workflow
3. ⏳ Test your site
4. ⏳ Configure custom domain (if needed)
5. ⏳ Celebrate savings! 🎉
