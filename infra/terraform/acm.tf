# Create ACM certificate for the domain
resource "aws_acm_certificate" "cert" {
  domain_name       = "tortarod.shop"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "tortarod.shop-certificate"
  }
}

# Create ACM certificate for justdocitauth.site
resource "aws_acm_certificate" "auth_cert" {
  domain_name       = "justdocitauth.site"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "justdocitauth.site-certificate"
  }
}

# Create ACM certificate for justdocitoauth.site
resource "aws_acm_certificate" "oauth_cert" {
  domain_name       = "justdocitoauth.site"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "justdocitoauth.site-certificate"
  }
}

# Create DNS validation records for tortarod.shop
resource "aws_acm_certificate_validation" "cert_validation" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_acm_certificate.cert.domain_validation_options : record.resource_record_name]
}

# Create DNS validation records for justdocitauth.site
resource "aws_acm_certificate_validation" "auth_cert_validation" {
  certificate_arn         = aws_acm_certificate.auth_cert.arn
  validation_record_fqdns = [for record in aws_acm_certificate.auth_cert.domain_validation_options : record.resource_record_name]
}

# Create DNS validation records for justdocitoauth.site
resource "aws_acm_certificate_validation" "oauth_cert_validation" {
  certificate_arn         = aws_acm_certificate.oauth_cert.arn
  validation_record_fqdns = [for record in aws_acm_certificate.oauth_cert.domain_validation_options : record.resource_record_name]
}
