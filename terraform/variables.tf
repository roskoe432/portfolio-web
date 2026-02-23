variable "azure_subscription_id" {
  type        = string
  description = "Azure subscription id"
  sensitive   = true
}

variable "resource_group_name" {
  type        = string
  description = "The name of the Azure resource group"
  default     = "portfolio-rg"
}

variable "location" {
  type        = string
  description = "The Azure region to deploy resources in"
  default     = "eastus"
}

variable "environment" {
  type        = string
  description = "Environment name"
  default     = "prod"
}

variable "static_web_app_name" {
  type        = string
  description = "Name of the Azure Static Web App"
  default     = "portfolio-web"
}

variable "static_web_app_location" {
  type        = string
  description = "Location for Static Web App (limited regions)"
  default     = "eastus2"
}

variable "static_web_app_sku" {
  type        = string
  description = "SKU for Static Web App (Free or Standard)"
  default     = "Free"
}

# Optional: Uncomment when ready to add custom domain
# variable "custom_domain" {
#   type        = string
#   description = "Custom domain name for the static web app"
#   default     = ""
# }
