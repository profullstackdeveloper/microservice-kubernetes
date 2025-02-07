variable "aws_region" {
  description = "The AWS region to deploy in"
  default     = "us-west-2"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "CIDR block for the public subnet"
  default     = "10.0.1.0/24"
}

variable "availability_zone" {
  description = "The availability zone to deploy resources in"
  default     = "us-west-2a"
}

variable "cluster_name" {
  description = "EKS Cluster name"
  default     = "my-cluster"
}

variable "db_name" {
  description = "Name of the PostgreSQL database"
  default     = "test_db"
}

variable "db_user" {
  description = "Database user"
  default     = "postgres"
}

variable "db_password" {
  description = "Database password"
  default     = "postgres"
}