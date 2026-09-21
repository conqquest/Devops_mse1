run "dev_environment" {
  command = plan

  variables {
    aws_region          = "ap-south-1"
    project_name        = "vibepass"
    environment         = "dev"
    vpc_cidr            = "10.10.0.0/16"
    public_subnet_cidr  = "10.10.1.0/24"
    private_subnet_cidr = "10.10.2.0/24"
    instance_type       = "t3.micro"
    instance_count      = 1
    root_volume_size    = 8
    enable_monitoring   = false
    db_instance_class   = "db.t3.micro"
  }

  assert {
    condition     = var.environment == "dev"
    error_message = "Environment must be dev."
  }

  assert {
    condition     = var.instance_type == "t3.micro"
    error_message = "Dev must use t3.micro."
  }

  assert {
    condition     = var.instance_count == 1
    error_message = "Dev must use one instance."
  }
}

run "prod_environment" {
  command = plan

  variables {
    aws_region          = "ap-south-1"
    project_name        = "vibepass"
    environment         = "prod"
    vpc_cidr            = "10.20.0.0/16"
    public_subnet_cidr  = "10.20.1.0/24"
    private_subnet_cidr = "10.20.2.0/24"
    instance_type       = "t3.small"
    instance_count      = 3
    root_volume_size    = 20
    enable_monitoring   = true
    db_instance_class   = "db.t3.micro"
  }

  assert {
    condition     = var.environment == "prod"
    error_message = "Environment must be prod."
  }

  assert {
    condition     = var.instance_type == "t3.small"
    error_message = "Prod must use t3.small."
  }

  assert {
    condition     = var.instance_count == 3
    error_message = "Prod must use three instances."
  }

  assert {
    condition     = var.enable_monitoring == true
    error_message = "Prod monitoring must be enabled."
  }
}