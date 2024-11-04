# Project Name

A brief description of your project goes here. For example:

This is a job assignment project developed using **Next.js**, **TypeScript**, **React**, and **SCSS**. The project aims to [describe the purpose, like "create a user-friendly interface for..." or "demonstrate expertise in..."].

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)

---

## Features

List the main features of your project. For example:

- Responsive design using SCSS
- Type-safe development with TypeScript
- Client-side routing and SSR using Next.js
- Modular component architecture with React
- authentication using next auth

---

## Tech Stack

The project is built with the following technologies:

- **Next.js** - Framework for server-rendered React applications
- **React** - Library for building user interfaces
- **TypeScript** - For static typing and improved developer experience
- **SCSS** - For styling with nested rules and modular CSS

---

## Project Structure

project-root/
│
├── app/
│ ├── (pages)/ # Main application pages, organized by feature
│ │ ├── auth/ # Authentication pages (e.g., login, register)
│ │ ├── dashboard/ # Dashboard module
│ │ │ ├── customers/ # Customer-related pages
│ │ │ ├── user/ # User-specific pages
│
│ ├── components/ # Reusable components, grouped by type or feature
│ │ ├── cards/ # Card components (e.g., InfoCard, UserCard)
│ │ ├── commons/ # Common reusable components (e.g., Button, Loader)
│ │ ├── headers/ # Header components (e.g., MainHeader, SubHeader)
│ │ ├── navigation/ # Navigation-related components (e.g., Sidebar, Navbar)
│ │ ├── pagination/ # Pagination components
│ │ ├── table/ # Table components (e.g., DataTable, TableRow)
│ │ └── tabs/ # Tab components for tabbed views
│
│ ├── assets/ # Static assets, constants, and configuration files
│ │ ├── constants/ # Constant values and configurations
│ │  
│
│ ├── fonts/ # Custom fonts
│
│ ├── providers/ # Context providers or custom hooks (e.g., AuthProvider, ThemeProvider)
│
│ ├── styles/
│ ├── index.scss # Global SCSS or CSS stylesheets and design system
│ │ ├── colors/ # global color styles
│ │ └── pageStyles #page styles
│ │ ├── userPageStyles/  
│ │ └── loginPageStyles/  
│
│ ├── types/ # TypeScript types and interfaces
│
│ └── pages/api/ # API routes (Next.js API routes)
│
├── public/ # Public assets served directly
│ └── images/ # Public images
│ ├── icons/ # Icons
│ └── userIcons/ # User-related icons
│
├── .eslintrc.json # ESLint configuration
├── .prettierrc # Prettier configuration
├── next.config.js # Next.js configuration
├── tsconfig.json # TypeScript configuration
└── README.md # Project README

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- **Node.js** and **npm** (or **yarn**) installed globally.

### Installation

npm install

# or, if using yarn:

yarn install

## Run development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ephraimiyanda/lendsqr-fe-test
   cd project-directory
   ```
