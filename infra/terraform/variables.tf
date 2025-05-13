variable "vpc_cidr_block" {
  description = "CIDR block para la VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "subnet_cidr_block" {
  description = "CIDR block para la Subnet Pública"
  type        = string
  default     = "10.0.0.0/24"
}

variable "availability_zone" {
  description = "Zona de disponibilidad para la Subnet Pública"
  type        = string
  default     = "us-east-1a"
}

variable "region" {
  description = "Región para el proveedor de AWS"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "Tipo de instancia EC2"
  type        = string
  default     = "t2.micro"
}

variable "key_name" {
  description = "Nombre de la clave SSH para la instancia EC2"
  type        = string
  default     = "miPrimeraClave"
}

variable "ingress_http_cidr" {
  description = "CIDR para acceso HTTP (puerto 80)"
  type        = string
  default     = "0.0.0.0/0"
}

variable "ingress_ssh_cidr" {
  description = "CIDR para acceso SSH (puerto 22)"
  type        = string
  default     = "0.0.0.0/0"
}
