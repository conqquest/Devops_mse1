resource "aws_cloudwatch_log_group" "vibepass" {
  name              = "/vibepass/${var.environment}"
  retention_in_days = var.environment == "prod" ? 30 : 7

  tags = merge(
    local.common_tags,
    {
      Name = "${local.name_prefix}-logs"
      Role = "Monitoring"
    }
  )
}