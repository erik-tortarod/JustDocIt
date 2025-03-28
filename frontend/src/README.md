CODE STRUCTURE:

      src/
      ├── assets/                  # Static resources
      │   ├── images/              # Images and icons
      │   ├── fonts/               # Custom fonts
      │   └── styles/              # Global styles (if you use global CSS/SCSS)
      │
      ├── components/              # Reusable components
      │   ├── common/              # Very generic components (buttons, inputs, etc.)
      │   ├── layout/              # Layout components (Header, Footer, Sidebar)
      │   └── ui/                  # Specific UI components
      │
      ├── config/                  # Configurations
      │   ├── api.ts               # API client configuration
      │   └── constants.ts         # Global constants
      │
      ├── context/                 # React contexts
      │   └── AuthContext.tsx      # Authentication context
      │
      ├── features/                # Features organized by domain
      │   ├── auth/                # Authentication
      │   │   ├── components/      # Specific authentication components
      │   │   ├── hooks/           # Specific authentication hooks
      │   │   └── services/        # Specific authentication services
      │   │
      │   ├── documentation/       # Documentation generation
      │   │   ├── components/      # Documentation components
      │   │   ├── hooks/           # Hooks related to documentation
      │   │   └── services/        # Services for documentation
      │   │
      │   └── repositories/        # Repository management
      │       ├── components/      # Repository components
      │       ├── hooks/           # Hooks for repositories
      │       └── services/        # Services for repositories
      │
      ├── hooks/                   # Custom global hooks
      │   ├── useApi.ts            # Hook for API calls
      │   └── useLocalStorage.ts   # Hook for managing localStorage
      │
      ├── models/                  # TypeScript types and interfaces
      │   ├── auth.types.ts        # Types related to authentication
      │   ├── repository.types.ts  # Types related to repositories
      │   └── documentation.types.ts # Types for documentation
      │
      ├── pages/                   # Page-level components
      │   ├── Auth/                # Authentication pages
      │   ├── Dashboard/           # Main dashboard
      │   ├── Documentation/       # Documentation viewer
      │   └── NotFound/            # 404 page
      │
      ├── services/                # Global services
      │   ├── api.service.ts       # Service for API calls
      │   ├── auth.service.ts      # Authentication service
      │   └── github.service.ts    # Service for interacting with GitHub
      │
      ├── utils/                   # Utilities and helpers
      │   ├── formatting.ts        # Formatting functions
      │   ├── validation.ts        # Validation functions
      │   └── github.ts            # GitHub-specific helpers
      │
      ├── App.tsx                  # Main component
      ├── index.tsx                # Entry point
      └── routes.tsx               # Routing configuration
