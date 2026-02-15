# Wedding Invitation Web Application

A modern, elegant wedding invitation management system built with Next.js 16, TypeScript, and a custom file-based database.

## Features

- 📧 **Interactive Invitations**: Beautiful boarding pass-style invitations with envelope animation
- 🎨 **Responsive Design**: Optimized for both mobile and desktop devices
- 💾 **File-Based Storage**: Custom database using text files with automatic sharding (1000 lines per file)
- 🔐 **Admin Panel**: Secure admin interface for managing invitations
- ✨ **Animations**: Smooth Framer Motion animations for enhanced UX
- 🎟️ **Boarding Pass Design**: Unique wedding invitation styled as a flight boarding pass

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Fonts**: Playfair Display (serif) & Inter (sans-serif)

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` and set your admin secret key:

```
ADMIN_SECRET_KEY=your_secure_password_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── admin/              # Admin panel page
│   ├── api/                # API routes
│   │   ├── auth/           # Authentication endpoint
│   │   └── invitations/    # CRUD operations for invitations
│   ├── i/[slug]/           # Public invitation view
│   ├── globals.css         # Global styles with custom theme
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── BoardingPass.tsx    # Boarding pass invitation component
│   └── Envelope.tsx        # Envelope animation component
├── lib/
│   ├── services/
│   │   └── invitation-service.ts  # File-based database service
│   └── types/
│       └── invitation.ts   # TypeScript interfaces
└── data/                   # Auto-generated data storage directory
    └── invitations_*.txt   # Sharded invitation data files
```

## Usage

### Admin Panel

1. Navigate to `/admin`
2. Enter your admin secret key
3. Create invitations by entering guest names
4. Copy invitation links to share with guests

### Invitation Flow

**First Visit**: Guests see an elegant envelope animation, click to open and reveal their boarding pass invitation.

**Return Visits**: The boarding pass is displayed directly.

## Wedding Details

Configure wedding information in [components/BoardingPass.tsx](components/BoardingPass.tsx).

## API Endpoints

- `GET /api/invitations` - List all invitations
- `POST /api/invitations` - Create new invitation
- `GET /api/invitations/[slug]` - Get invitation by slug
- `PATCH /api/invitations/[slug]` - Mark invitation as read
- `POST /api/auth` - Authenticate admin access

## Deployment

Build the application for production:

```bash
npm run build
npm start
```

Deploy to Vercel, VPS, or any platform supporting Next.js.

---

Built with ❤️ for Sofiia & Andrzej's special day
