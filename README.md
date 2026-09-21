# VibePass — Concert & Music Festival Ticket Platform

VibePass is a concert and music festival ticket platform developed as an MSE/DevOps project. The project combines a React frontend, Node.js backend, Docker containerization, and AWS infrastructure provisioned using Terraform.

The main focus of the project is **multi-environment infrastructure provisioning using Terraform**.

---

## Project Overview

The application is divided into three main parts:

```text
vibepass/
├── frontend/
├── backend/
└── terraform/
```

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express
* TypeScript
* REST API

### Infrastructure

* AWS
* Terraform
* Amazon EC2
* Amazon VPC
* Amazon RDS PostgreSQL
* Amazon CloudWatch
* Security Groups
* Docker

---

# Terraform Infrastructure

Terraform is used as Infrastructure as Code (IaC) for provisioning the AWS infrastructure.

Instead of manually creating AWS resources through the AWS Console, the infrastructure is defined using Terraform configuration files.

The Terraform configuration creates and manages:

* VPC
* Public subnet
* Private subnets
* Internet Gateway
* Route tables
* Security Groups
* EC2 instances
* RDS PostgreSQL
* CloudWatch Log Group
* Terraform outputs
* Infrastructure tests

The configuration is divided into separate files so that each part of the infrastructure can be managed independently.

```text
terraform/
├── terraform.tf
├── provider.tf
├── variables.tf
├── locals.tf
├── main.tf
├── networking.tf
├── security.tf
├── compute.tf
├── database.tf
├── monitoring.tf
├── outputs.tf
├── terraform.tfvars.dev
├── terraform.tfvars.prod
└── tests/
    └── infrastructure.tftest.hcl
```

---

# Terraform Workspaces

Terraform Workspaces are used to manage separate environments using the same Terraform configuration.

The project uses:

```text
dev
prod
```

Each workspace has its own Terraform state.

This means that the development infrastructure and production infrastructure are tracked separately even though they use the same Terraform code.

For example:

```bash
terraform workspace select dev
```

selects the development environment.

```bash
terraform workspace select prod
```

selects the production environment.

The current workspace can be checked using:

```bash
terraform workspace show
```

Available workspaces can be viewed using:

```bash
terraform workspace list
```

---

# How Dev and Prod Work

The Terraform code is shared between environments. Environment-specific settings are provided through separate variable files.

### Development

```text
terraform.tfvars.dev

EC2 Instance Type: t3.micro
EC2 Instance Count: 1
Root Volume: 8 GB
Monitoring: Disabled
VPC: 10.10.0.0/16
```

### Production

```text
terraform.tfvars.prod

EC2 Instance Type: t3.small
EC2 Instance Count: 3
Root Volume: 20 GB
Monitoring: Enabled
VPC: 10.20.0.0/16
```

The same Terraform resources can therefore create different infrastructure depending on the selected environment and variable file.

Example:

```bash
terraform workspace select dev
terraform plan -var-file="terraform.tfvars.dev"
```

For production:

```bash
terraform workspace select prod
terraform plan -var-file="terraform.tfvars.prod"
```

The workspace controls the Terraform state, while the `.tfvars` file provides the environment-specific configuration.

---

# Terraform Workflow

The project follows the normal Terraform workflow.

### 1. Initialize

```bash
terraform init
```

Downloads the required providers and initializes the Terraform working directory.

### 2. Format

```bash
terraform fmt
```

Formats Terraform configuration files.

### 3. Validate

```bash
terraform validate
```

Checks whether the Terraform configuration is valid.

### 4. Test

```bash
terraform test
```

Runs the Terraform infrastructure tests.

### 5. Plan

Development:

```bash
terraform plan -var-file="terraform.tfvars.dev"
```

Production:

```bash
terraform plan -var-file="terraform.tfvars.prod"
```

`terraform plan` shows what Terraform intends to create, modify or destroy before making changes.

### 6. Apply

Development:

```bash
terraform apply -var-file="terraform.tfvars.dev"
```

Production:

```bash
terraform apply -var-file="terraform.tfvars.prod"
```

`terraform apply` creates or modifies the AWS infrastructure.

### 7. Outputs

```bash
terraform output
```

Displays useful information such as VPC IDs, subnet IDs, EC2 information and the RDS endpoint.

---

# AWS Architecture

The Terraform infrastructure is designed around an AWS VPC.

```text
                    Internet
                       |
                 Internet Gateway
                       |
                  Public Subnet
                       |
                  EC2 Instances
                       |
                Private Subnets
                       |
                 RDS PostgreSQL
```

The production environment contains multiple EC2 instances and multiple private subnets.

The RDS database is placed in private networking and is not publicly accessible.

---

# AWS Resources

## VPC

Separate CIDR ranges are used for different environments.

```text
Development: 10.10.0.0/16
Production:  10.20.0.0/16
```

## Subnets

The infrastructure contains public and private subnets.

A secondary private subnet is also used in another Availability Zone so that the RDS DB subnet group covers multiple Availability Zones.

## EC2

Development:

```text
1 × t3.micro
```

Production:

```text
3 × t3.small
```

The EC2 instances use Amazon Linux and encrypted GP3 root volumes.

## RDS

The database uses:

```text
PostgreSQL 17
db.t3.micro
Encrypted storage
Private access
```

The database security group allows PostgreSQL traffic from the application security group.

## CloudWatch

CloudWatch resources are provisioned through Terraform.

Monitoring is enabled for the production environment and disabled for development.

---

# Docker

The frontend and backend are containerized using Docker.

### Frontend

The frontend is built using Vite and served through an Nginx container.

```text
React
  ↓
Vite Build
  ↓
Nginx Docker Container
  ↓
Port 80
```

### Backend

The backend is built using Node.js and Express.

```text
Node.js / Express
        ↓
Docker Container
        ↓
Port 5000
```

Docker allows the application to be packaged consistently before deployment to AWS.

---

# Future AWS Deployment

The next deployment stage can use Amazon ECR for storing the Docker images.

```text
Frontend / Backend
       ↓
   Docker Build
       ↓
  Amazon ECR
       ↓
      EC2
       ↓
 VibePass Application
```

An Application Load Balancer can also be added later to distribute traffic between multiple EC2 instances.

---

# Terraform Data Sources

The project uses Terraform data sources to retrieve AWS information dynamically.

Examples include:

```text
aws_availability_zones.available
aws_caller_identity.current
aws_region.current
aws_ami.amazon_linux
```

This avoids hardcoding values such as the Amazon Linux AMI ID.

---

# Terraform Testing

Terraform infrastructure tests are stored at:

```text
terraform/tests/infrastructure.tftest.hcl
```

The tests verify important environment-specific configurations such as:

```text
Development:
t3.micro
1 instance

Production:
t3.small
3 instances
Monitoring enabled
```

---

# Git Development Checkpoints

The project is developed through separate Git checkpoints.

```text
01 — Frontend
02 — Backend
03 — Terraform Foundation
04 — Terraform Data Sources
05 — Terraform Networking
06 — Terraform Security
07 — Terraform Compute
08 — Terraform Database
09 — Terraform Monitoring
10 — Terraform Outputs
11 — Terraform Tests
12 — Docker
13 — ECR
14 — AWS Deployment
```

Each checkpoint represents a major development stage of the project.

---

# Git Commands

Initialize the repository:

```bash
git init
```

Create the main branch:

```bash
git branch -M main
```

Add the repository:

```bash
git remote add origin https://github.com/conqquest/Devops_mse1.git
```

Add changes:

```bash
git add .
```

Commit:

```bash
git commit -m "checkpoint: description"
```

Push:

```bash
git push -u origin main
```

---

# Files Not Committed

The following files are ignored because they contain generated files, local dependencies, environment configuration or Terraform state:

```text
node_modules/
dist/
build/
.env
*.log
terraform/.terraform/
terraform/*.tfstate
terraform/*.tfstate.*
terraform/*.tfplan
.vscode/
.idea/
.DS_Store
```

The Terraform lock file should remain committed:

```text
terraform/.terraform.lock.hcl
```

---

# Project Status

The frontend and backend have been developed and containerized.

The Terraform infrastructure includes the core AWS networking, security, compute, database and monitoring configuration.

Development and production environments are managed through Terraform Workspaces with separate environment-specific variable files.

The remaining deployment expansion can include Amazon ECR, Application Load Balancer and automated deployment of the Docker containers to AWS.

---

## Repository

**https://github.com/conqquest/Devops_mse1**
