---
icon: aws
---

# CICD

### 🚀 Continuous Integration

#### GitHub Actions Workflows

**Test PR Workflow**

* **Trigger**: Pull requests to `dev` and `main` branches
* **Purpose**: Run tests and report results
* **Steps**:
  1. Setup Node.js environment
  2. Install dependencies
  3. Run tests
  4. Comment PR with test results
* **Features**:
  * Automatic test execution
  * Detailed test reporting in PR comments
  * Test result formatting with emojis
  * Node.js caching for faster builds

**Format Code Workflow**

* **Trigger**: Pull requests
* **Purpose**: Ensure code formatting consistency
* **Tools**:
  * Biome for frontend
  * Spring Java Format for backend

**Generate Docs Workflow**

* **Trigger**: Pull requests and pushes to main branches
* **Purpose**: Generate and update documentation
* **Features**:
  * Automatic documentation generation
  * Documentation deployment

**Deploy/Destroy Workflow**

* **Trigger**: Manual workflow dispatch
* **Purpose**: Infrastructure deployment and cleanup
* **Features**:
  * Environment selection (dev/prod)
  * Action selection (deploy/destroy)
  * Terraform integration
  * AWS credentials management
  * State management in S3

### 🏗️ Infrastructure

#### Terraform Configuration

**Core Components**

* **VPC Configuration** (`vpc.tf`)
  * Network setup
  * Subnet configuration
  * Internet Gateway
  * Route tables
* **Security Groups** (`security-groups.tf`)
  * Inbound/outbound rules
  * Service-specific security configurations
* **S3 Storage** (`s3.tf`)
  * Bucket configurations
  * Access policies
  * Lifecycle rules

**Infrastructure Management**

* **State Management**
  * Remote state storage in S3
  * State locking
  * Version control
* **Variables** (`variables.tf`)
  * Environment-specific configurations
  * Resource naming conventions
  * Network configurations

#### Kubernetes Configuration

Located in `infra/k8s/`, includes:

* Deployment configurations
* Service definitions
* Ingress rules
* ConfigMaps and Secrets

### 🔄 Deployment Process

1.  **Infrastructure Setup**

    ```bash
    # Deploy infrastructure
    gh workflow run deploy-destroy.yaml -f environment=dev -f action=deploy
    ```
2. **Application Deployment**
   * Frontend deployment to S3
   * Backend services deployment to ECS
   * Database migrations
   * Service discovery configuration
3. **Verification**
   * Health checks
   * Smoke tests
   * Performance monitoring

### 🔧 Infrastructure as Code

#### Terraform Modules

* VPC Module
* Security Groups Module
* S3 Module
* ECS Module

#### Kubernetes Manifests

* Frontend deployment
* API service deployment
* Auth service deployment
* Monitoring stack

### 🔐 Security

* AWS IAM roles and policies
* Network security groups
* SSL/TLS configuration
* Secrets management
* Access control lists

### 📊 Monitoring

* CloudWatch integration
* Prometheus metrics
* Grafana dashboards
* Alert configurations

### 🚨 Disaster Recovery

* Automated backups
* State recovery procedures
* Multi-region support
* Failover configurations
