provider "aws" {
  region = var.aws_region
}

resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr
}

resource "aws_subnet" "public" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.public_subnet_cidr
  availability_zone = var.availability_zone
}

resource "aws_eks_cluster" "this" {
  name     = var.cluster_name
  role_arn = aws_iam_role.eks_role.arn

  vpc_config {
    subnet_ids = [aws_subnet.public.id]
  }

  depends_on = [aws_iam_role_policy_attachment.eks_policy]
}

resource "aws_iam_role" "eks_role" {
  name = "eks_role"

  assume_role_policy = data.aws_iam_policy_document.eks_assume_role_policy.json
}

data "aws_iam_policy_document" "eks_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["eks.amazonaws.com"]
    }
  }
}

resource "aws_db_instance" "postgres" {
  allocated_storage    = 20
  engine             = "postgres"
  engine_version     = "13.3"
  instance_class     = "db.t3.micro"
  name               = var.db_name
  username           = var.db_user
  password           = var.db_password
  db_subnet_group_name = aws_db_subnet_group.default.name
  vpc_security_group_ids = [aws_security_group.db_sg.id]
  skip_final_snapshot = true
}

resource "aws_db_subnet_group" "default" {
  name       = "default"
  subnet_ids = [aws_subnet.public.id]
}

resource "aws_security_group" "db_sg" {
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Adjust for security
  }
}

output "eks_cluster_endpoint" {
  value = aws_eks_cluster.this.endpoint
}

output "db_instance_endpoint" {
  value = aws_db_instance.postgres.endpoint
}