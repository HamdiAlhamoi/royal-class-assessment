# 👑 Royal Class Microservices - API Gateway Architecture

This project showcases a microservice-based architecture using **NestJS** with **Redis transport** for inter-service communication. The system includes:

- **API Gateway** – The single entry point for external requests
- **a-svc** – Delegates `double` operations to `b-svc`
- **b-svc** – Handles both `double` and `square` operations directly

---

## 🧠 Architecture Overview

### 🔁 Request Flows

- **Double Operation**  
  `Client → API Gateway → a-svc → b-svc`

- **Square Operation**  
  `Client → API Gateway → b-svc`

Each service is built with NestJS and communicates through Redis microservice messaging. The API Gateway handles routing, exposing only one interface to clients.

---

## 📊 Why Use an API Gateway?

Using an API Gateway brings several architectural benefits:

- ✅ **Centralized Routing**  
  Clean separation between client and internal service structure

- ✅ **Security**  
  Only the Gateway is exposed to the internet; simplifies authentication, logging, and rate limiting

- ✅ **Abstraction**  
  Clients don’t need to know which internal service performs which task

- ✅ **Aggregation**  
  Combine responses from multiple services if needed

- ✅ **Scalability**  
  Each service can scale independently based on its load

---

## 🚀 Features

| Endpoint                 | Description                            | Route Flow                  |
| ------------------------ | -------------------------------------- | --------------------------- |
| `GET /a-svc/double/:num` | Doubles a number via `a-svc` → `b-svc` | API Gateway → a-svc → b-svc |
| `GET /b-svc/square/:num` | Squares a number via `b-svc` directly  | API Gateway → b-svc         |

---

## 🧪 Running Tests

We use **Jest** to write and run unit tests for each service.

### Step-by-step

1. Install dependencies from root:

   ```bash
   npm install
   ```

2. Run tests for all services:

   ```bash
   npm run test
   ```

3. Run tests individually:

   ```bash
   # a-svc
   cd apps/a-svc && npm run test

   # b-svc
   cd apps/b-svc && npm run test

   # api-gateway
   cd apps/api-gateway && npm run test
   ```

---

## 🐳 Running with Docker

This project supports Docker for easy orchestration of all services.

### Step 1: Build the Docker Images

```bash
docker compose build --no-cache
```

### Step 2: Start All Services

```bash
docker compose up
```

### Step 3: Access the Services

- **API Gateway**: `http://localhost:3000`
- **a-svc**: Not directly exposed (internal only)
- **b-svc**: Not directly exposed (internal only)

---

## 📘 Swagger API Docs

This project uses Swagger for API documentation.

### 🔐 Protected Access

Swagger UI is protected with basic authentication using credentials from `.api.env`:

```
SWAGGER_API=/docs
SWAGGER_ALLOW=yes
SWAGGER_USER_NAME=royal
SWAGGER_PASSWORD=clas$
```

### 🛠️ Setup

Swagger is automatically initialized in `main.ts` using a `SwaggerGenerator` class.

If enabled via `SWAGGER_ALLOW=yes`, the docs are available at:

👉 http://localhost:3000/docs

### ✅ How It Works

- Only loads if allowed via env
- Secured with basic auth
- Routes auto-documented using NestJS decorators

## 📝 Environment Configuration

Ensure the following `.env` files exist with proper configurations:

- `.gateway.env` – for API Gateway
- `.a.env` – for a-svc
- `.b.env` – for b-svc

Each should include:

```dotenv
PORT=...
REDIS_HOST=redis
REDIS_PORT=6379
```

---

## 📦 Tech Stack

- **NestJS** – Modular Node.js framework
- **Redis** – Microservice transport layer
- **Jest** – Unit testing framework
- **Docker / Docker Compose** – Containerization and orchestration

---

## ✅ Status

This project demonstrates a simplified but production-ready microservices setup using NestJS and an API Gateway approach. Perfect for teams starting with distributed services and looking to scale safely.
