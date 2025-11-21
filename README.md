# SoulPrint Landing Page

A modern, responsive landing page built with Next.js 15, TypeScript, and Tailwind CSS, featuring dark/light theme support and smooth animations.

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ installed
- npm or pnpm package manager

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## ✨ Features

- 🎨 **Modern UI** - Built with shadcn/ui and Radix primitives
- 🌓 **Dark/Light Theme** - Seamless theme switching with next-themes
- ⚡ **Animations** - Smooth transitions using Framer Motion
- 📱 **Responsive** - Desktop-first design that adapts to all screen sizes
- 🎯 **TypeScript** - Full type safety
- 🚀 **Next.js 15** - Latest features with App Router
- 🎨 **Tailwind CSS** - Utility-first CSS framework

## 📦 Tech Stack

- **Framework**: Next.js 16.0.3
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.15
- **UI Components**: shadcn/ui + Radix UI
- **Animations**: Framer Motion 11
- **Icons**: Lucide React
- **Theme**: next-themes

## 📂 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── sections/           # Landing page sections
│   └── providers/          # React context providers
├── lib/
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## 🎨 Design System

### Colors

- **Primary**: `#ea580c` (Orange)
- **Secondary**: `#9747ff` (Purple)
- **Dark Background**: `#0a0a0a`
- **Light Background**: `#ffffff`

### Typography

- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold, tracking-tight
- **Body**: Regular weight

## 🧩 Components

### UI Components

- **Button** - Multiple variants (default, outline, ghost, etc.)
- **Card** - Flexible card component with header, content, footer

### Sections

- **Navbar** - Sticky navigation with theme toggle
- **Hero** - Animated hero section with gradient text
- **Features** - Feature grid with icons and hover effects
- **Pricing** - Pricing tiers with highlighted popular plan
- **Footer** - Multi-column footer with links

## 🎬 Animations

- Fade-in and slide-up on scroll
- Gradient text animation
- Button hover effects
- Card hover transitions
- Theme toggle animation

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🔧 Configuration

### Tailwind Config

Custom colors, animations, and design tokens defined in `tailwind.config.ts`.

### shadcn/ui

Configuration in `components.json`. Add new components with:

```bash
npx shadcn@latest add [component-name]
```

## 📄 License

Private - All rights reserved

## 👨‍💻 Development

Built for the SoulPrint platform - AI-powered cognitive analysis and identity mapping.

---

**Ready to deploy!** 🚀

Deploy easily to:
- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- Any Next.js-compatible host
