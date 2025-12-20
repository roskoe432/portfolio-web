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

variable "container_registry_name" {
  type        = string
  description = "Name of the Azure Container Registry"
}

variable "container_app_name" {
  type        = string
  description = "Name of the Azure Container App"
  default     = "portfolio-web"
}
