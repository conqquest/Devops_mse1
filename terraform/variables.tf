variable "aws_region" {
  description = "AWS region where VibePass infrastructure will be deployed."
  type        = string
  default     = "ap-south-1"
}

variable "project_name" {
  description = "Name of the project."
  type        = string
  default     = "vibepass"
}

variable "environment" {
  description = "Deployment environment."
  type        = string

  validation {
    condition     = contains(["dev", "prod"], var.environment)
    error_message = "Environment must be either dev or prod."
  }
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC."
  type        = string
}

variable "public_subnet_cidr" {
  description = "CIDR block for the public subnet."
  type        = string
}

variable "private_subnet_cidr" {
  description = "CIDR block for the private subnet."
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type."
  type        = string
}

variable "instance_count" {
  description = "Number of EC2 instances."
  type        = number

  validation {
    condition     = var.instance_count >= 1 && var.instance_count <= 10
    error_message = "Instance count must be between 1 and 10."
  }
}

variable "root_volume_size" {
  description = "Root EBS volume size in GB."
  type        = number

  validation {
    condition     = var.root_volume_size >= 8
    error_message = "Root volume size must be at least 8 GB."
  }
}

variable "enable_monitoring" {
  description = "Enable detailed EC2 monitoring."
  type        = bool
}

variable "db_instance_class" {
  description = "RDS instance class."
  type        = string
}