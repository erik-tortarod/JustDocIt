output "vpc_id" {
  description = "ID de la VPC creada"
  value       = aws_vpc.vpc.id
}

output "subnet_id" {
  description = "ID de la subred pública"
  value       = aws_subnet.public_subnet_erik.id
}

output "bucket_name" {
  description = "Nombre del bucket S3"
  value       = aws_s3_bucket.s3.bucket
}

