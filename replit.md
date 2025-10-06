# Overview

This is an event management application called "Organizador do 14º Aniversário da Filosofia X no Pará" - a Trello/Linear-inspired web application for organizing participants across different departments for an anniversary event. The system provides a kanban-style board interface where participants can be registered, assigned to multiple departments and roles, and managed by administrators.

The application features a modern, responsive design with dark/light theme support, participant registration forms, drag-and-drop functionality (planned), search/filter capabilities, and export features for managing event participants across departments like Marketing, Licensing, Restaurant Logistics, and Financial/Purchase Logistics.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast HMR and optimized production builds
- **Wouter** for lightweight client-side routing (currently single-page dashboard)
- **TanStack React Query** for server state management and data fetching

**UI Component System**
- **shadcn/ui** components built on Radix UI primitives (extensive component library including dialogs, forms, cards, badges, etc.)
- **Tailwind CSS** for utility-first styling with custom design tokens
- **CVA (Class Variance Authority)** for component variant management
- Custom design system inspired by Trello/Linear with specific color palettes for dark/light modes

**State Management Pattern**
- Context API for global state (AuthContext for admin authentication, ThemeContext for dark/light mode)
- Local component state for UI interactions
- React Query for server-side data synchronization (currently in-memory storage)

**Key Design Decisions**
- Font stack: Inter (UI/forms) and Poppins (headers) from Google Fonts
- Color-coded departments with gradient headers and distinctive badges
- Responsive design with mobile-first approach (stacked columns on small screens)
- Accessible components via Radix UI primitives with keyboard navigation support

## Backend Architecture

**Server Framework**
- **Express.js** as the HTTP server framework
- **TypeScript** with ESM modules for type safety and modern JavaScript features
- Vite middleware integration for development mode with HMR

**Data Layer**
- **Drizzle ORM** configured for PostgreSQL with type-safe schema definitions
- **@neondatabase/serverless** for database connectivity with WebSocket support
- Currently using **in-memory storage** (MemStorage class) for development - production will use PostgreSQL
- Shared schema definitions between client and server via `@shared/schema.ts`

**Authentication Strategy**
- Simple password-based admin authentication stored in localStorage
- Admin password: "admin123" (hardcoded, should be environment variable in production)
- Session persistence via localStorage with 'adminAuth' flag
- No user authentication - public viewing mode with admin-only edit capabilities

**API Architecture (Planned)**
- RESTful API pattern with `/api` prefix for all routes
- CRUD operations interface defined in storage.ts
- Currently minimal routes - full participant management endpoints to be implemented

## Data Models

**Core Entities**
- **Participant**: id, nome, telefone, email, cidadeEstado, assignments[]
- **ParticipantAssignment**: departamento (enum), funcao (string)
- **User**: id, username, password, isAdmin (for future multi-admin support)

**Department Structure**
- Marketing (6 functions including social media, field communication, manual design)
- Licensing (3 functions for public agency coordination)
- Restaurant Logistics (3 functions for meal planning)
- Financial/Purchase Logistics (3 functions for budget management)
- Security (planned)
- Volunteer Teams (mutiroes - planned)

## External Dependencies

**Database**
- **Neon Serverless Postgres** as the production database provider
- Connection via DATABASE_URL environment variable
- WebSocket support for serverless execution environments

**UI Component Libraries**
- **@radix-ui/** suite (20+ component primitives for accessible UI)
- **lucide-react** for icon system
- **react-hook-form** with **@hookform/resolvers** and **zod** for form validation
- **date-fns** for date formatting and manipulation

**Development Tools**
- **Replit-specific plugins** (@replit/vite-plugin-runtime-error-modal, cartographer, dev-banner)
- **tsx** for TypeScript execution in development
- **esbuild** for production server bundling

**Design System**
- **Tailwind CSS** with PostCSS and Autoprefixer
- **class-variance-authority** and **clsx** for dynamic className composition
- **tailwind-merge** for conflict resolution

**Deployment**
- **Vercel** configuration for static site deployment
- Build outputs to `dist/public` directory
- Client-side routing handled via rewrites to index.html