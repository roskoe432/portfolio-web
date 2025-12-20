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

# Container registry
resource "azurerm_container_registry" "acr" {
  name                = var.container_registry_name
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "Basic"
  admin_enabled       = true

  tags = {
    Environment = var.environment
    Project     = "Porfolio"
  }
}

# Log Analytics Workspace - required for Container Apps
resource "azurerm_log_analytics_workspace" "logs" {
  name                = "${var.container_app_name}-logs"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "PerGB2018"
  retention_in_days   = 30

  tags = {
    Environment = var.environment
    Project     = "Porfolio"
  }
}

# Container App Environment - Runtime environment for Container Apps
resource "azurerm_container_app_environment" "env" {
  name                       = "${var.container_app_name}-env"
  resource_group_name        = azurerm_resource_group.main.name
  location                   = azurerm_resource_group.main.location
  log_analytics_workspace_id = azurerm_log_analytics_workspace.logs.id

  tags = {
    Environment = var.environment
    Project     = "Portfolio"
  }
}

resource "azurerm_container_app" "app" {
  name                         = var.container_app_name
  resource_group_name          = azurerm_resource_group.main.name
  container_app_environment_id = azurerm_container_app_environment.env.id
  revision_mode                = "Single"

  template {
    container {
      name   = "portfolio-web"
      image  = "${azurerm_container_registry.acr.login_server}/portfolio-web:latest"
      cpu    = "0.25"
      memory = "0.5Gi"
    }

    min_replicas = 1
    max_replicas = 3
  }

  ingress {
    external_enabled = true
    target_port      = 80
    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }

  registry {
    server               = azurerm_container_registry.acr.login_server
    username             = azurerm_container_registry.acr.admin_username
    password_secret_name = "registry-password"
  }

  secret {
    name  = "registry-password"
    value = azurerm_container_registry.acr.admin_password
  }

  tags = {
    Environment = var.environment
    Project     = "Portfolio"
  }
}
