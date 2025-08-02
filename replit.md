# Travel Insider - AI Travel Planner

## Overview

Travel Insider is a modern AI-powered travel planning application that helps users create personalized travel itineraries with smart recommendations and Google Maps integration. The application uses AI (Google Gemini) to generate detailed trip plans based on user preferences, destinations, budget, and interests.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with a clear separation between frontend, backend, and shared code:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Library**: Radix UI components with shadcn/ui styling
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Style**: RESTful endpoints
- **Development**: Hot reload with Vite middleware integration

### Authentication
- **Provider**: Clerk for user authentication and management
- **Integration**: Full frontend and backend authentication flow
- **User Management**: Automatic user creation in database on first sign-in

## Key Components

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Schema Management**: Centralized schema definitions in `/shared/schema.ts`
- **Migrations**: Drizzle Kit for database migrations

### AI Integration
- **Provider**: Google Gemini AI for trip itinerary generation
- **Service**: Dedicated Gemini service in `/server/gemini.ts`
- **Functionality**: Generates detailed trip plans including activities, hotels, restaurants, and attractions

### UI Components
- **Design System**: Comprehensive component library based on Radix UI
- **Theming**: Dark/light mode support with CSS custom properties
- **Responsive**: Mobile-first design with responsive components
- **Accessibility**: Built-in accessibility features from Radix UI

### Trip Management
- **Creation**: Multi-step form for trip preferences and details
- **Storage**: Database persistence with user association
- **Display**: Trip cards with status tracking and visual previews
- **Status**: Draft, upcoming, and completed trip states

### External Integrations
- **Google Places**: Location autocomplete and place suggestions
- **Google Maps**: Integration for location-based features
- **Clerk**: User authentication and profile management

## Data Flow

1. **User Authentication**: Clerk handles authentication, user data synced to local database
2. **Trip Creation**: Users fill form → validation → AI generation → database storage
3. **Trip Display**: Database query → trip cards with visual previews
4. **AI Processing**: User preferences → Gemini API → structured itinerary response
5. **Real-time Updates**: TanStack Query manages cache invalidation and updates

## External Dependencies

### Core Dependencies
- **@clerk/clerk-react**: User authentication and management
- **@google/genai**: Google Gemini AI integration
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: UI component primitives

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tailwindcss**: Utility-first CSS framework
- **drizzle-kit**: Database migration tool

### API Keys Required
- `CLERK_PUBLISHABLE_KEY`: For authentication
- `GEMINI_API_KEY`: For AI trip generation
- `GOOGLE_MAPS_API_KEY`: For places autocomplete
- `DATABASE_URL`: PostgreSQL connection string

## Deployment Strategy

### Development
- Vite development server with hot reload
- Express server with middleware integration
- Environment variable configuration for API keys

### Production Build
- Vite builds client code to `/dist/public`
- esbuild bundles server code to `/dist`
- Static file serving from Express server
- Environment variables for production configuration

### Database
- Drizzle migrations for schema changes
- Connection pooling with Neon serverless
- Automatic user provisioning on first authentication

The application is structured as a monorepo with clear separation of concerns, making it maintainable and scalable. The shared schema ensures type safety across the entire stack, while the modular architecture allows for easy feature additions and modifications.