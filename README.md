# Portfolio Web

A modern, interactive portfolio website built with React and Phaser, featuring game-based navigation and showcasing engineering best practices across full-stack development and deployment.

🌐 **Live Site:** [https://bensnow.dev]

## 🎯 Project Overview

This portfolio takes a unique approach to web development by combining traditional React patterns with game-based interactions. Instead of conventional navigation, users explore an interactive Phaser scene where clicking objects navigates to different sections (About, Blog, Contact).

This project demonstrates proficiency in:

- **Interactive UI/UX** - Game-based navigation with Phaser event bus integration
- **Modern React architecture** - Server state management with TanStack React Query
- **Clean, tested, maintainable code** - Comprehensive testing and quality tooling
- **DevOps and CI/CD** - Automated pipelines with GitHub Actions
- **Cloud infrastructure** - Infrastructure as Code with Terraform
- **Production deployment** - Azure Container Apps with zero-downtime deploys
- **Internationalization** - Multi-language support with i18next

## ✨ Key Features

### Interactive Navigation

- **Phaser-powered scene** - Navigate by clicking interactive objects in a game world
- **Event bus architecture** - Clean separation between game logic and React components
- **Smooth transitions** - Seamless integration between game scenes and React pages

### Modern Architecture

- **Server state** - TanStack React Query manages blog data fetching, caching, and synchronization
- **Client state** - Zustand ready for theme management and UI preferences
- **Custom design system** - LESS-based color variables replacing third-party UI libraries
- **Code splitting** - Manual vendor chunks for optimal caching (React, Phaser)

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern component-based UI
- **Phaser 3** - Game engine for interactive scene-based navigation
- **Vite 8** - Lightning-fast build tool with Rolldown bundler
- **React Router v7** - Client-side routing
- **TanStack React Query** - Server state management for blog data fetching
- **Zustand** - Client state management (reserved for theme switching)
- **LESS** - CSS preprocessing with custom design system
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
│   ├── pages/            # Page components (About, Blog, Contact)
│   ├── game/             # Phaser game scene and entities
│   ├── i18n/             # Internationalization
│   ├── services/         # API services for data fetching
│   ├── shared/           # Shared components and assets
│   └── styles/           # Global styles and design system
├── __tests__/            # Test files
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

✅ **Interactive game-based navigation** - Phaser 3 scene with event bus integration  
✅ **Modern React patterns** - Hooks, context, custom hooks  
✅ **Smart state management** - TanStack React Query for server state, Zustand for client state  
✅ **Custom design system** - LESS-based color system replacing component libraries  
✅ **Comprehensive testing** - High coverage with Vitest  
✅ **CI/CD automation** - Automated testing and deployment  
✅ **Infrastructure as Code** - Reproducible infrastructure with Terraform  
✅ **Container orchestration** - Docker + Azure Container Apps  
✅ **Security best practices** - OIDC, secrets management  
✅ **Performance optimization** - Manual code splitting, lazy loading  
✅ **Code quality** - Linting, formatting, pre-commit hooks  
✅ **Internationalization** - Multi-language support

_This portfolio is a living example of production-ready web application development with a unique interactive twist._

---

## 📦 Package Updates

### Packages Pending Major Version Updates

**Last checked:** April 5, 2026

The following packages have major version updates available. Review changelogs for breaking changes before upgrading:

- **eslint**: 9.39.4 → 10.2.0
- **i18next**: 25.10.10 → 26.0.3
- **react-i18next**: 16.6.6 → 17.0.2
- **jsdom**: 27.4.0 → 29.0.1
- **globals**: 16.5.0 → 17.4.0
