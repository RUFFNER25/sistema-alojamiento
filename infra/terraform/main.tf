terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Ejemplo simplificado: un solo EC2 donde luego desplegarás Docker (manual o por script)

resource "aws_instance" "backend_host" {
  ami           = var.aws_ami
  instance_type = "t3.micro"

  tags = {
    Name = "airbnb-backend-host"
  }
}


