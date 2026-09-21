resource "aws_instance" "app" {
  count = var.instance_count

  ami                         = data.aws_ami.amazon_linux.id
  instance_type               = var.instance_type
  subnet_id                   = aws_subnet.public.id
  vpc_security_group_ids      = [aws_security_group.app.id]
  associate_public_ip_address = true

  monitoring = var.enable_monitoring

  root_block_device {
    volume_size           = var.root_volume_size
    volume_type           = "gp3"
    encrypted             = true
    delete_on_termination = true
  }

  user_data = <<-EOF
              #!/bin/bash
              dnf update -y
              dnf install -y nginx
              systemctl enable nginx
              systemctl start nginx

              cat > /usr/share/nginx/html/index.html <<HTML
              <!DOCTYPE html>
              <html>
              <head>
                <title>VibePass - ${var.environment}</title>
              </head>
              <body>
                <h1>VibePass Infrastructure</h1>
                <h2>Environment: ${var.environment}</h2>
                <p>Managed by Terraform</p>
                <p>Instance: ${count.index + 1}</p>
              </body>
              </html>
              HTML
              EOF

  tags = merge(
    local.common_tags,
    {
      Name = "${local.name_prefix}-app-${count.index + 1}"
      Role = "Application"
    }
  )
}