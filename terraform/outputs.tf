output "resource_group_name" {
  description = "Name of the resource group"
  value       = azurerm_resource_group.main.name
}

output "container_registry_login_server" {
  description = "Login server for the container registry"
  value       = azurerm_container_registry.acr.login_server
}

output "container_registry_admin_username" {
  description = "Admin username for container registry"
  value       = azurerm_container_registry.acr.admin_username
  sensitive   = true
}

output "container_registry_admin_password" {
  description = "Admin password for container registry"
  value       = azurerm_container_registry.acr.admin_password
  sensitive   = true
}

output "container_app_url" {
  description = "URL of the deployed container app"
  value       = "https://${azurerm_container_app.app.ingress[0].fqdn}"
}

output "container_app_fqdn" {
  description = "FQDN of the container app"
  value       = azurerm_container_app.app.ingress[0].fqdn
}
