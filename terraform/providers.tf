terraform {
  required_version = ">= 1.0"

  backend "azurerm" {
    resource_group_name  = "terraform-state-rg"
    storage_account_name = "tfstatebensnow"
    container_name       = "tfstate"
    key                  = "portfolio.terraform.tfstate"
  }

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm",
      version = "~> 4.0"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = var.azure_subscription_id
}
