# Portfolio Web

A modern, production-ready portfolio website built with React, showcasing engineering best practices
and full-stack deployment capabilities.

🌐 **Live Site:** [https://bensnow.dev]

## 🎯 Project Overview

This portfolio demonstrates proficiency in modern web development, focusing on:

- Clean, tested, and maintainable code
- DevOps and CI/CD pipelines
- Cloud infrastructure as code
- Production deployment best practices
- Internationalization and accessibility

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern component-based UI
- **Vite** - Lightning-fast build tool
- **React Router v7** - Client-side routing
- **LESS** - CSS preprocessing
- **i18next** - Internationalization (English/Spanish)
- **@react-pdf/renderer** - PDF resume generation

### Testing & Quality

- **Vitest** - Unit and integration testing
- **Testing Library** - React component testing
- **ESLint** - Code linting with accessibility rules
- **Prettier** - Code formatting
- **Husky** - Git hooks for pre-commit checks
- **Coverage reporting** - Automated test coverage tracking

### DevOps & Infrastructure

- **Docker** - Containerization with Nginx
- **Terraform** - Infrastructure as Code (Azure)
- **GitHub Actions** - CI/CD pipelines
- **Azure Container Apps** - Serverless container hosting
- **Azure Container Registry** - Private Docker registry
- **OIDC Authentication** - Secure, keyless Azure deployment

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Local Development

```bash
# Clone the repository
git clone https://github.com/roskoe432/portfolio-web.git
cd portfolio-web

# Install dependencies
npm install

# Start development server
npm start

# Open https://localhost:5173
```

### Available Scripts

```bash
npm start              # Start dev server
npm run build          # Production build
npm run serve          # Preview production build
npm test               # Run tests in watch mode
npm run test:coverage  # Generate coverage report
npm run lint           # Lint code
npm run lint:fix       # Fix linting issues
npm run format         # Format code with Prettier
npm run format:check   # Check code formatting
```

## 🧪 Testing

The project maintains high test coverage with comprehensive unit and integration tests:

```bash
# Run tests
npm test

# Generate coverage report
npm run test:coverage

# View coverage report
open coverage/index.html
```

Test coverage includes:

- Component rendering and behavior
- User interactions and form validation
- Routing and navigation
- i18n translations
- Custom hooks

## 🐳 Docker

Build and run the containerized application:

```bash
# Build image
docker build -t portfolio-web .

# Run container
docker run -p 8080:80 portfolio-web

# Access at http://localhost:8080
```

## ☁️ Deployment

### Infrastructure

The project uses **Terraform** to provision Azure infrastructure:

- **Azure Container Registry** - Private Docker image storage
- **Azure Container Apps** - Serverless container hosting
- **Custom domain** with SSL/TLS
- **Remote state** management in Azure Storage

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

### CI/CD Pipelines

**GitHub Actions** automate the entire deployment workflow:

#### Check Pipeline (Feature Branches)

- Runs on `feature/**` and `hotfix/**` branches
- Executes tests with coverage reporting
- Builds Docker image
- Validates Terraform configuration
- Posts coverage report to PR

#### Deploy Pipeline (Main Branch)

- Provisions/updates Azure infrastructure
- Builds and pushes Docker image to ACR
- Deploys to Azure Container Apps
- Zero-downtime deployments

### Security

- **OIDC authentication** - No stored credentials
- **GitHub Secrets** - Encrypted secret management
- **Environment-based** federated credentials
- **HTTPS only** - SSL/TLS certificates

## 📦 Project Structure

```
portfolio-web/
├── .github/workflows/     # CI/CD pipelines
├── src/
│   ├── app/              # App layout and components
│   ├── pages/            # Page components
│   ├── i18n/             # Internationalization
│   ├── shared/           # Shared components and assets
│   └── styles/           # Global styles
├── tests/                # Test files
├── terraform/            # Infrastructure as Code
├── public/               # Static assets
└── Dockerfile            # Container configuration
```

## 🌍 Internationalization

The application supports multiple languages:

- English (default)
- Spanish

Language files are located in `src/i18n/locales/`.

## ♿ Accessibility

Built with accessibility in mind:

- Semantic HTML
- ARIA labels and roles
- Keyboard navigation
- ESLint accessibility plugin
- WCAG 2.1 compliance

## 📊 Bundle Analysis

View bundle size and composition:

```bash
npm run build
# View stats.html in browser
```

## 📝 License

ISC

## 👤 Author

**Ben Snow**

---

## 🔧 Engineering Highlights

This project showcases:

✅ **Modern React patterns** - Hooks, context, custom hooks  
✅ **Comprehensive testing** - High coverage with Vitest  
✅ **CI/CD automation** - Automated testing and deployment  
✅ **Infrastructure as Code** - Reproducible infrastructure  
✅ **Container orchestration** - Docker + Azure Container Apps  
✅ **Security best practices** - OIDC, secrets management  
✅ **Performance optimization** - Code splitting, lazy loading  
✅ **Code quality** - Linting, formatting, pre-commit hooks  
✅ **Internationalization** - Multi-language support

_This portfolio is a living example of production-ready web application development._
