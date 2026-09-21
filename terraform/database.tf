resource "aws_db_subnet_group" "main" {
  name = "${local.name_prefix}-db-subnet-group"

  subnet_ids = [
    aws_subnet.private.id,
    aws_subnet.private_secondary.id
  ]

  tags = merge(
    local.common_tags,
    {
      Name = "${local.name_prefix}-db-subnet-group"
    }
  )
}

resource "aws_db_instance" "main" {
  identifier = "${local.name_prefix}-database"

  engine         = "postgres"
  engine_version = "17"

  instance_class        = var.db_instance_class
  allocated_storage     = var.environment == "prod" ? 20 : 10
  max_allocated_storage = var.environment == "prod" ? 50 : 20
  storage_type          = "gp3"
  storage_encrypted     = true

  db_name  = "vibepass"
  username = "vibepass_admin"
  password = "VibePassDev123!"

  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.database.id]

  skip_final_snapshot = true
  publicly_accessible = false

  tags = merge(
    local.common_tags,
    {
      Name = "${local.name_prefix}-database"
      Role = "Database"
    }
  )
}