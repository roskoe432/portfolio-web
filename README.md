# Portfolio Web

A modern, interactive portfolio website built with React and Phaser, featuring game-based navigation and showcasing engineering best practices across full-stack development and deployment.

🌐 **Live Site:** [https://www.bensnow.dev]

## [Roadmap](https://trello.com/invite/b/69de00f97d998c6c86831f2c/ATTI89d9b4c0db75e90089081bae05560815CBB0F7EC/portfolio)

## 🎯 Project Overview

This portfolio takes a unique approach to web development by combining traditional React patterns with game-based interactions. Instead of conventional navigation, users explore an interactive Phaser scene using keyboard controls, interacting with objects to navigate to different sections (About, Blog, Contact).

This project demonstrates proficiency in:

- **Interactive UI/UX** - Game-based navigation with Phaser event bus integration
- **Modern React architecture** - Server state management with TanStack React Query
- **DevOps and CI/CD** - Automated pipelines with GitHub Actions
- **Cloud infrastructure** - Infrastructure as Code with Terraform
- **Production deployment** - Azure Static Web Apps
- **Internationalization** - Multi-language support with i18next

## ✨ Key Features

### Interactive Navigation

- **Phaser-powered scene** - Navigate using keyboard controls and interact with objects in a game world
- **Event bus architecture** - Clean separation between game logic and React components
- **Smooth transitions** - Seamless integration between game scenes and React pages

### Modern Architecture

- **Server state** - TanStack React Query manages blog data fetching, caching, and synchronization
- **Custom design system** - LESS-based color variables replacing third-party UI libraries
- **Code splitting** - Manual vendor chunks for optimal caching (React, Phaser)

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern component-based UI
- **Phaser 3** - Game engine for interactive scene-based navigation
- **Vite 8** - Lightning-fast build tool with Rolldown bundler
- **React Router v7** - Client-side routing
- **TanStack React Query** - Server state management for blog data fetching
- **LESS** - CSS preprocessing with custom design system
- **i18next** - Internationalization (English/Spanish)
- **react-hook-form** - Performant form state management and validation
- **react-overlays** - Accessible modal and overlay primitives

### Testing & Quality

- **Vitest** - Unit and integration testing
- **Testing Library** - React component testing
- **ESLint** - Code linting with accessibility rules
- **Prettier** - Code formatting
- **Husky** - Git hooks for pre-commit checks
- **Coverage reporting** - Automated test coverage tracking

### DevOps & Infrastructure

- **Terraform** - Infrastructure as Code (Azure)
- **GitHub Actions** - CI/CD pipelines
- **Azure Static Web Apps** - Serverless static site hosting with global CDN
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

# Open https://localhost:4000
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

> **Note:** Tests exist for stable components but coverage is limited while the project is evolving quickly.

```bash
npm test               # Run tests in watch mode
npm run test:coverage  # Generate coverage report
```

## ☁️ Deployment

### Infrastructure

The project uses **Terraform** to provision Azure infrastructure:

- **Azure Static Web App** - Serverless static site hosting with global CDN
- **Custom domain** with free SSL/TLS certificates
- **Remote state** management in Azure Storage

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

### CI/CD Pipelines

**GitHub Actions** automate the entire deployment workflow:

#### Check Pipeline (Pull Requests)

- Runs on pull requests to main branch
- Builds Vite application
- Validates Terraform configuration
- Tests disabled temporarily (being rewritten)

#### Deploy Pipeline (Manual)

- Manually triggered via workflow_dispatch
- Provisions/updates Azure Static Web App via Terraform
- Builds optimized production bundle
- Deploys `dist/` folder to Azure Static Web Apps

#### PI Deploy Pipeline (Auto + Manual)

- Triggers on push to `main` or manually via workflow_dispatch
- Runs on a self-hosted Raspberry Pi runner
- Builds the project and deploys to a local staging server (`/var/www/portfolio-web`)
- Used for local network staging before production release

#### Destroy Pipeline (Manual)

- Manually triggered via workflow_dispatch
- Tears down all Azure infrastructure provisioned by Terraform
- Uses the same OIDC auth and backend config as the deploy pipeline
- ⚠️ Destructive — permanently removes the Static Web App and resource group

### Security

- **OIDC authentication** - No stored credentials
- **GitHub Secrets** - Encrypted secret management
- **Environment-based** federated credentials
- **HTTPS only** - SSL/TLS certificates

## 🌍 Internationalization

The application supports multiple languages:

- English (default)
- Spanish

Language files are located in `src/i18n/locales/`.

## License

ISC

## 👤 Author

**Ben Snow**

---

## 🔧 Engineering Highlights

This project showcases:

✅ **Interactive game-based navigation** - Phaser 3 scene with keyboard controls and event bus integration  
✅ **Modern React patterns** - Hooks, context, custom hooks  
✅ **Smart state management** - TanStack React Query for server state  
✅ **Custom design system** - LESS-based color system replacing component libraries  
✅ **CI/CD automation** - Automated deployment with GitHub Actions  
✅ **Infrastructure as Code** - Reproducible infrastructure with Terraform  
✅ **Static site deployment** - Azure Static Web Apps with global CDN  
✅ **Security best practices** - OIDC, secrets management  
✅ **Performance optimization** - Manual code splitting, lazy loading, CDN delivery  
✅ **Code quality** - Linting, formatting, pre-commit hooks  
✅ **Internationalization** - Multi-language support

_This portfolio is a living example of production-ready web application development with a unique interactive twist._

---

## 📦 Package Updates

### Packages Pending Major Version Updates

The following packages have major version updates available. Review changelogs for breaking changes before upgrading.

---

**Checked: April 16, 2026**

- **eslint** + **@eslint/js**: 9.39.4 → 10.2.0 (`eslint-plugin-react` does not yet support v10)
- **phaser**: 3.90.0 → 4.0.0 (major new release — review migration guide before upgrading)

---

**Checked: April 5, 2026**

- **eslint**: 9.39.4 → 10.2.0 (`eslint-plugin-react` does not yet support v10)
