---
icon: globe-pointer
---

# Frontend

### 📚 Key Libraries

| Library         | Version | Purpose                     |
| --------------- | ------- | --------------------------- |
| React           | 19.0.0  | Core UI framework           |
| TypeScript      | 5.7.2   | Type safety and development |
| Vite            | 6.2.0   | Build tool and dev server   |
| TailwindCSS     | 4.0.17  | Utility-first CSS framework |
| i18next         | 25.2.1  | Internationalization        |
| React Router    | 7.4.0   | Client-side routing         |
| Framer Motion   | 12.12.1 | Animation library           |
| DaisyUI         | 5.0.9   | UI component library        |
| Radix UI        | 1.2.9   | Accessible UI primitives    |
| React Hot Toast | 2.5.2   | Toast notifications         |

### 📁 Project Structure

```
src/
├── assets/         # Static resources (images, fonts, etc.)
├── components/     # Reusable components
├── config/         # Application configurations
├── data/          # Static data and constants
├── fixtures/      # Test data
├── hooks/         # Custom React hooks
├── i18n/          # Internationalization files
├── lib/           # Utilities and library configurations
├── models/        # Data interfaces and types
├── pages/         # Page components
├── services/      # API services and calls
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

### 🚀 Available Scripts

* `npm run dev` - Start development server
* `npm run build` - Build for production
* `npm run preview` - Preview production build
* `npm run lint` - Run linter
* `npm run format` - Format code using Biome
* `npm run test` - Run tests with Vitest

### 🎨 Key Features

* **Responsive Design** - Adaptable to all devices
* **Internationalization** - Multi-language support
* **Dark/Light Theme** - Dark and light mode
* **Smooth Animations** - Fluid transitions and animations
* **Syntax Highlighting** - Code highlighting support
* **Notifications** - Notification system with react-hot-toast

### 🛠️ Development Tools

* **ESLint** - For code linting
* **Biome** - For code formatting and linting
* **TypeDoc** - For documentation generation
* **Vitest** - For testing

### 🚀 Getting Started

1. Clone the repository
2.  Install dependencies:

    ```bash
    npm install
    ```
3.  Start development server:

    ```bash
    npm run dev
    ```

### 🔧 Configuration

The project uses several configuration files:

* `vite.config.ts` - Vite configuration
* `tsconfig.json` - TypeScript configuration
* `biome.json` - Biome configuration
* `eslint.config.js` - ESLint configuration

### 📝 Additional Notes

* The project uses TypeScript for safer and more maintainable development
* Implements a consistent design system with TailwindCSS and DaisyUI
* Internationalization is configured with i18next
* The project follows React and TypeScript best practices
