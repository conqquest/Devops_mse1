output "environment" {
  description = "Current deployment environment."
  value       = var.environment
}

output "workspace" {
  description = "Current Terraform workspace."
  value       = terraform.workspace
}

output "vpc_id" {
  description = "VibePass VPC ID."
  value       = aws_vpc.main.id
}

output "public_subnet_id" {
  description = "Public subnet ID."
  value       = aws_subnet.public.id
}

output "private_subnet_id" {
  description = "Private subnet ID."
  value       = aws_subnet.private.id
}

output "instance_ids" {
  description = "Application EC2 instance IDs."
  value       = aws_instance.app[*].id
}

output "instance_public_ips" {
  description = "Application EC2 public IP addresses."
  value       = aws_instance.app[*].public_ip
}

output "database_endpoint" {
  description = "RDS database endpoint."
  value       = aws_db_instance.main.endpoint
}

output "aws_region" {
  description = "AWS deployment region."
  value       = data.aws_region.current.region
}