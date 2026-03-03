# Configure the Azure Resource Group
resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location

  tags = {
    environment = var.environment
    Project     = "Portfolio"
    ManagedBy   = "Terraform"
  }
}

# Azure Static Web App
resource "azurerm_static_web_app" "main" {
  name                = var.static_web_app_name
  resource_group_name = azurerm_resource_group.main.name
  location            = var.static_web_app_location
  sku_tier            = var.static_web_app_sku
  sku_size            = var.static_web_app_sku

  tags = {
    Environment = var.environment
    Project     = "Portfolio"
  }
}

# Custom domain (optional - configure after deployment)
# Uncomment and configure once you have your domain ready
# resource "azurerm_static_web_app_custom_domain" "main" {
#   static_web_app_id = azurerm_static_web_app.main.id
#   domain_name       = var.custom_domain
#   validation_type   = "cname-delegation"
# }
