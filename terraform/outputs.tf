output "resource_group_name" {
  description = "Name of the resource group"
  value       = azurerm_resource_group.main.name
}

output "static_web_app_default_hostname" {
  description = "Default hostname of the Static Web App"
  value       = azurerm_static_web_app.main.default_host_name
}

output "static_web_app_url" {
  description = "URL of the deployed Static Web App"
  value       = "https://${azurerm_static_web_app.main.default_host_name}"
}

output "static_web_app_api_key" {
  description = "API key for deploying to Static Web App"
  value       = azurerm_static_web_app.main.api_key
  sensitive   = true
}
