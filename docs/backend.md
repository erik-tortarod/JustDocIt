---
icon: database
---

# Backend

### 📚 Key Technologies

#### API Service

| Technology      | Version  | Purpose              |
| --------------- | -------- | -------------------- |
| Spring Boot     | 3.4.4    | Core framework       |
| Java            | 17       | Programming language |
| MongoDB         | Latest   | Database             |
| Spring Security | 3.4.4    | Security framework   |
| JWT             | 0.11.5   | Token authentication |
| iText PDF       | 5.5.13.3 | PDF generation       |
| PDFBox          | 3.0.0    | PDF manipulation     |
| Lombok          | Latest   | Code generation      |

#### Auth Service

| Technology         | Version | Purpose              |
| ------------------ | ------- | -------------------- |
| Spring Boot        | 3.4.4   | Core framework       |
| Java               | 21      | Programming language |
| MongoDB            | Latest  | User data storage    |
| Spring Security    | 3.4.4   | Security framework   |
| JWT                | 0.11.5  | Token authentication |
| Spring LDAP        | Latest  | LDAP integration     |
| UnboundID LDAP SDK | Latest  | LDAP client          |
| Lombok             | Latest  | Code generation      |

### 🚀 Overview

#### API Service

The API service is the main backend component of JustDocIt, handling business logic, data persistence, and PDF document management. It's built with Spring Boot and provides RESTful endpoints for the frontend application.

#### Auth Service

The Auth service is a dedicated authentication and authorization service for JustDocIt. It handles user authentication, LDAP integration, and JWT token management. Built with Spring Boot, it provides secure authentication endpoints for the entire application.

### 🛠️ Core Features

#### API Service

* RESTful API endpoints
* MongoDB integration for data persistence
* PDF document generation and manipulation
* OAuth2 client integration
* JWT-based authentication
* Secure endpoints with Spring Security

#### Auth Service

* User authentication and authorization
* LDAP integration for enterprise authentication
* JWT token generation and validation
* OAuth2 client support
* MongoDB user data persistence
* Secure password handling
* Session management

### 📁 Project Structure

#### API Service

```
api/src/
├── main/
│   ├── java/
│   │   └── com/api/
│   │       ├── config/      # Configuration classes
│   │       ├── controller/  # REST controllers
│   │       ├── model/       # Data models
│   │       ├── repository/  # MongoDB repositories
│   │       ├── service/     # Business logic
│   │       └── util/        # Utility classes
│   └── resources/
│       └── application.yml  # Application configuration
└── test/                    # Test classes
```

#### Auth Service

```
auth/src/
├── main/
│   ├── java/
│   │   └── api/
│   │       ├── config/      # Security and LDAP configuration
│   │       ├── controller/  # Auth endpoints
│   │       ├── model/       # User and token models
│   │       ├── repository/  # MongoDB repositories
│   │       ├── service/     # Auth business logic
│   │       └── util/        # JWT and security utilities
│   └── resources/
│       └── application.yml  # Application configuration
└── test/                    # Test classes
```

### 🚀 Getting Started

#### Prerequisites

* Java 17 (for API) and Java 21 (for Auth)
* Maven
* MongoDB
* LDAP Server (for Auth service)

#### API Service Setup

1.  Navigate to the API service directory:

    ```bash
    cd api
    ```
2. Configure MongoDB connection in `application.yml`
3.  Run the application:

    ```bash
    ./mvnw spring-boot:run
    ```

#### Auth Service Setup

1.  Navigate to the Auth service directory:

    ```bash
    cd auth
    ```
2. Configure MongoDB and LDAP settings in `application.yml`
3.  Run the application:

    ```bash
    ./mvnw spring-boot:run
    ```

### 🔧 Configuration

Both services use similar configuration files:

* `application.yml` - Main configuration file
* `pom.xml` - Maven dependencies and build configuration
* `Dockerfile` - Container configuration

### 🐳 Docker Support

Both services include Dockerfiles for containerization.

#### API Service

```bash
cd api
docker build -t justdocit-api .
docker run -p 8082:8082 justdocit-api
```

#### Auth Service

```bash
cd auth
docker build -t justdocit-auth .
docker run -p 8080:8080 justdocit-auth
```

### 📝 Additional Notes

#### API Service

* Uses Spring Boot 3.4.4 for modern Java features
* Implements secure authentication with JWT
* Provides PDF generation and manipulation capabilities
* Follows RESTful API best practices
* Includes comprehensive test coverage

#### Auth Service

* Uses Spring Boot 3.4.4 for modern Java features
* Implements secure authentication with JWT
* Provides LDAP integration for enterprise environments
* Follows security best practices
* Includes comprehensive test coverage
* Supports both MongoDB and LDAP user storage
