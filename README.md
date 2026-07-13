# 🌌 MLnexus

[![Backend: Express.js](https://img.shields.io/badge/Backend-Express.js-blue.svg)]()
[![Frontend: React](https://img.shields.io/badge/Frontend-React.js-61dafb.svg)]()
[![Database: PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791.svg)]()

Welcome to **MLnexus**—the next-generation, high-performance package manager that seamlessly integrates Machine Learning models directly into production Node.js backends. Say goodbye to bloated Python microservices and complex infrastructure; MLnexus lets you run ML models natively, right where your business logic lives.

---

## ⚡ What is MLnexus?

Historically, executing AI models meant setting up dedicated Python API servers (FastAPI/Flask), managing complex HTTP requests, and paying for idle GPU resources. 

**MLnexus** changes the paradigm. By leveraging the power of **ONNX Runtime** natively in Node.js, developers can install, import, and execute machine learning models just like standard NPM packages. No Python required at runtime.

---

## 🔥 Key Features

### 📦 Seamless NPM-Style Workflow
- **Familiar CLI**: Use the MLnexus CLI (`@mlnexus/cli`) to download and manage models (`mlnexus install <model>`).
- **Global Caching**: Models are downloaded to a global cache directory. If multiple projects require the same model, it's shared to save disk space and bandwidth.
- **Native OS Bindings**: The runtime dynamically detects and hardware-accelerates via NVIDIA CUDA, Apple CoreML, or DirectML depending on your environment.

### 🧠 Advanced Runtime Architecture
- **Automatic Scaffolding**: Installing a model dynamically scaffolds an isolated execution environment inside `node_modules/@mlnexus`.
- **Sucrase Compilation**: Wrapper code is safely compiled on the client side using Sucrase before it even reaches the database, guaranteeing safe Javascript execution.
- **Dynamic Syntax Generation**: Automatically detects if a model supports `predict()` or `stream()` and customizes documentation snippets on the fly.

### 🛡️ Enterprise-Grade Infrastructure
- **Cloudflare R2 Storage**: All model binaries are hosted on Cloudflare's edge network, delivered securely via 60-minute expiring Presigned URLs.
- **PostgreSQL Analytics**: High-performance B-tree indexing tracks global model usage (`access_count`) in constant time, scaling effortlessly.
- **Brevo V3 Communications**: OTP authentication and mission-critical emails are handled entirely via the Brevo REST API, ensuring high deliverability.

---

## 💻 The CLI Ecosystem

The `@mlnexus/cli` gives you complete control over your model lifecycle:

- `mlnexus install <package>`: Downloads a model from the global registry and binds it to your local project.
- `mlnexus list`: Displays all locally installed and cached MLnexus models.
- `mlnexus cache`: Manages your global model binaries to free up disk space.
- `mlnexus restore`: Repairs your project's model environment from the manifest.
- `mlnexus uninstall`: Safely detaches a model from your dependencies.

---

## 🔒 Security Posture

We take security seriously:
- **Binary Integrity**: SHA-256 signatures are used to verify the integrity of all multi-gigabyte files after cloud transit.
- **Robust Authentication**: Passwords are encrypted with Bcrypt (12 rounds) and OTPs are enforced with strict 10-minute TTL expiration.
- **Application Hardening**: Helmet.js and strict CORS whitelisting prevent XSS, CSRF, and iframe-injection attacks.

---

## 🚀 Deployment Architecture

- **Client (Vercel)**: A lightning-fast React SPA, optimized with Vite and Tailwind CSS. Routing is handled natively with a custom Vercel rewrite configuration for clean, bookmarkable URLs.
- **Server (Render)**: A stateless Node.js / Express backend. Since all authentication relies on stateless JWTs and R2 presigned URLs, the backend scales horizontally without bottlenecks.

---

## 🛠️ Tech Stack Overview

- **Core Inference**: ONNX Runtime Node
- **Frontend**: React 18, Vite, Tailwind CSS, Sucrase
- **Backend API**: Node.js, Express.js
- **Database Engine**: PostgreSQL
- **Object Storage**: Cloudflare R2
- **Email Delivery**: Brevo Transactional API (V3)

---

## 📄 License

MLnexus is an open-source initiative designed to bring native Machine Learning to the JavaScript ecosystem. Licensed under the MIT License.
