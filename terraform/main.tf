# Available Availability Zones
data "aws_availability_zones" "available" {
  state = "available"
}

# Current AWS account information
data "aws_caller_identity" "current" {}

# Current AWS region information
data "aws_region" "current" {}

# Latest Amazon Linux 2023 AMI
data "aws_ami" "amazon_linux" {
  most_recent = true

  owners = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-*-x86_64"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  filter {
    name   = "root-device-type"
    values = ["ebs"]
  }
}