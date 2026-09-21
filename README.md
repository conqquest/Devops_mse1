#  VibePass — Concert & Music Festival Ticket Platform

> A full-stack concert discovery and ticket booking prototype, built as the application workload for a **Multi-Environment AWS Provisioning** university MSE project using Terraform.

---

## 📋 Problem Statement

Universities and organizations need real-world application workloads to demonstrate multi-environment cloud infrastructure provisioning. Existing demo applications are often too simplistic or not representative of production systems.

## 💡 Solution

**VibePass** is a production-quality concert and music festival ticket platform prototype that serves as the application layer for a Terraform-managed AWS infrastructure project. It provides:

- A visually impressive frontend that mimics a real ticketing platform
- A clean REST API backend designed for cloud deployment
- Multi-environment awareness (Dev/Prod) tied to Terraform workspaces
- Infrastructure monitoring dashboard for DevOps visibility

---

## ✨ Features

### User-Facing
- 🎪 **Event Discovery** — Browse upcoming concerts and festivals
- 🎤 **Artist Profiles** — Explore performing artists and their events
- 🎫 **Ticket Selection** — Choose from multiple ticket tiers (GA, VIP, 3-Day, Premium)
- 🛒 **Shopping Cart** — Add tickets, manage quantities, persistent across navigation
- 💳 **Demo Checkout** — Complete prototype bookings without real payment
- ✅ **Booking Confirmation** — View and download mock tickets
- ⏰ **Live Countdown** — Real-time countdown to the featured festival
- 📸 **Event Gallery** — Visual gallery with lightbox viewer
- 📰 **Newsletter** — Subscribe to event updates
- 🔍 **Search & Filter** — Find events by name, genre, city, date

### Infrastructure (MSE/DevOps)
- 🏗️ **Infrastructure Dashboard** — View Dev/Prod environment status
- 🔄 **Terraform Integration** — Ready for validate/test/plan/apply operations
- 📊 **Resource Monitoring** — EC2, VPC, Subnet visibility per environment
- 🔒 **Security** — CORS, input validation, no exposed secrets

---

## 🏗 Architecture

```
User
 ↓
VibePass React Frontend (Vite + TypeScript + Tailwind)
 ↓
Express REST API (TypeScript)
 ↓
Application Services
 ↓
Terraform Service (Abstraction Layer)
 ↓
AWS Infrastructure
 ↓
DEV / PROD Environments
```

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| React Router v6 | Client-side routing |
| Axios | HTTP client |
| Lucide React | Icon library |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime |
| Express | Web framework |
| TypeScript | Type safety |
| CORS | Cross-origin requests |
| dotenv | Environment config |
| uuid | Booking ID generation |

---

## 📁 Folder Structure

```
vibepass/
│
├── frontend/                    # React + Vite frontend
│   ├── public/
│   │   └── images/             # Event & gallery images
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── context/            # React Context (Cart)
│   │   ├── pages/              # Page components
│   │   ├── services/           # API service layer
│   │   ├── types/              # TypeScript interfaces
│   │   ├── App.tsx             # Router & app shell
│   │   ├── main.tsx            # Entry point
│   │   └── index.css           # Global styles & design system
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/                     # Express + TypeScript API
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   ├── data/               # Mock data (events, artists, tickets)
│   │   ├── middleware/         # Error handling, logging, validation
│   │   ├── routes/             # Route definitions
│   │   ├── services/           # Business logic layer
│   │   ├── types/              # TypeScript interfaces
│   │   ├── utils/              # Helper functions
│   │   ├── app.ts              # Express app configuration
│   │   └── server.ts           # Server startup
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── nodemon.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

The API server starts at `http://localhost:5000`.

### Frontend Setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

The frontend starts at `http://localhost:3000`.

---

## 🔐 Environment Variables

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (`backend/.env`)

```env
PORT=5000
TERRAFORM_DIR=../terraform
AWS_REGION=ap-south-1
NODE_ENV=development
```

> ⚠️ **Security**: Never expose AWS credentials to the frontend. All infrastructure operations go through the backend's Terraform Service.

---

## 📡 API Documentation

### Health Check
```
GET /api/health
→ { success: true, status: "ok", service: "vibepass-api" }
```

### Events
```
GET /api/events                    # List all events
GET /api/events?search=rock        # Search events
GET /api/events?genre=Electronic   # Filter by genre
GET /api/events?city=Mumbai        # Filter by city
GET /api/events?sort=price         # Sort (date|price|popularity)
GET /api/events/:id                # Get event details
GET /api/events/:id/lineup         # Get event lineup
GET /api/events/:id/tickets        # Get event tickets
GET /api/events/:id/gallery        # Get event gallery
```

### Artists
```
GET /api/artists                   # List all artists
GET /api/artists/:id               # Get artist details
GET /api/artists/:id/events        # Get artist's events
```

### Bookings
```
POST /api/bookings                 # Create demo booking
GET /api/bookings/:id              # Get booking details
```

**Create Booking Request:**
```json
{
  "eventId": "evt-001",
  "ticketType": "tkt-001-general",
  "quantity": 2,
  "customer": {
    "name": "Demo User",
    "email": "demo@example.com",
    "phone": "9999999999"
  }
}
```

### Newsletter
```
POST /api/newsletter/subscribe     # Subscribe to newsletter
```

### Terraform (Infrastructure)
```
GET  /api/terraform/environments              # List environments
GET  /api/terraform/environments/:env/status   # Environment status
POST /api/terraform/environments/:env/validate # Validate config
POST /api/terraform/environments/:env/test     # Run tests
POST /api/terraform/environments/:env/plan     # Generate plan
POST /api/terraform/environments/:env/apply    # Apply changes
```

### Response Format

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Event not found"
}
```

---

## 🔧 Terraform Integration

The backend includes a `TerraformService` abstraction designed to integrate with a separate Terraform directory:

```
terraform/
├── main.tf
├── variables.tf
├── outputs.tf
├── terraform.tfvars.dev
└── terraform.tfvars.prod
```

### Operations Supported
| Operation | Command | Description |
|-----------|---------|-------------|
| Validate | `terraform validate` | Validate configuration syntax |
| Test | `terraform test` | Run Terraform tests |
| Plan | `terraform plan` | Preview infrastructure changes |
| Apply | `terraform apply` | Apply infrastructure changes |

### Environment Mapping
| Environment | Workspace | Terraform Vars |
|------------|-----------|----------------|
| DEV | `dev` | `terraform.tfvars.dev` |
| PROD | `prod` | `terraform.tfvars.prod` |

> 📝 In the current prototype, Terraform operations return `"Terraform service is not configured"`. Connect the actual Terraform directory to enable real operations.

---

## ⚖️ Dev vs Prod

| Resource | DEV | PROD |
|----------|-----|------|
| EC2 Instances | 1 | 3 |
| Instance Type | t3.micro | t3.small |
| Storage | 8 GB | 20 GB |
| Monitoring | Basic | Enhanced |
| AWS Region | ap-south-1 | ap-south-1 |

---

## ⚠️ Prototype Limitations

This is a **prototype** application. The following are intentionally simplified:

- ❌ No real payment gateway integration
- ❌ No real authentication/authorization
- ❌ No real database (uses in-memory mock data)
- ❌ No real ticket inventory synchronization
- ❌ No email delivery for bookings
- ❌ Bookings reset on server restart
- ❌ Terraform operations not connected (returns "not configured")

---

## 🔮 Future Improvements

1. **Database Integration** — PostgreSQL/DynamoDB for persistent data
2. **Authentication** — AWS Cognito or Auth0
3. **Payment Gateway** — Razorpay/Stripe integration
4. **Real Terraform Execution** — Connect to actual AWS provisioning
5. **CI/CD Pipeline** — GitHub Actions for automated deployment
6. **Monitoring** — CloudWatch integration
7. **CDN** — CloudFront for static assets
8. **Containerization** — Docker for consistent deployments
9. **Load Testing** — Verify infrastructure scaling

---

## 📄 License

This project is part of a university MSE (Multi-Environment AWS Provisioning) assignment. For academic use only.

---

**Built with ❤️ for the VibePass experience.**
