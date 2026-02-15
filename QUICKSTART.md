# Quick Start Guide

Welcome to your Wedding Invitation Application! Here's everything you need to know to get started.

## 🚀 First Time Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

The app includes a default `.env.local` file with the admin password: `wedding2026secret`

**⚠️ IMPORTANT**: Change this password before deploying to production!

Edit `.env.local`:

```env
ADMIN_SECRET_KEY=your_new_secure_password
```

### 3. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000` (or another port if 3000 is busy).

## 📋 How to Use

### Step 1: Access Admin Panel

1. Navigate to `http://localhost:3000/admin`
2. Enter your admin secret key
3. You'll see the admin dashboard

### Step 2: Create Invitations

1. In the admin panel, enter a guest's full name
2. Click "Create Invitation"
3. The invitation will appear in the table below

### Step 3: Share Invitations

1. Click "Copy Link" next to any guest name
2. Share the copied URL with your guest
3. Each invitation has a unique URL like: `http://localhost:3000/i/john-smith-abc123`

### Step 4: Track Opens

- The status column shows whether guests have opened their invitations
- "Not Opened" = Guest hasn't viewed it yet
- "Opened" = Guest has clicked and viewed the invitation

## 🎨 Customizing Your Invitations

All wedding details can be edited in one place: [`lib/config/wedding.ts`](lib/config/wedding.ts)

### Update Couple Names

```typescript
couple: {
  bride: {
    firstName: 'Sofiia',
    fullName: 'Sofiia Havrilchenko',
    phone: '666 710 336',
  },
  // ...
}
```

### Update Wedding Date & Time

```typescript
date: {
  full: 'June 13, 2026',
  year: 2026,
  month: 6,
  day: 13,
},

ceremony: {
  time: '14:00',
  // ...
}
```

### Update Venues

```typescript
ceremony: {
  locationName: 'Chapel of Our Lady on the Hill',
  address: 'Lipska 36, 51-003 Wrocław',
  // ...
},

reception: {
  locationName: 'Topacz Castle',
  address: 'Templariuszy 1, 55-040 Ślęza',
  // ...
}
```

### Update RSVP Deadline

```typescript
rsvp: {
  deadline: 'May 23, 2026',
  deadlineDate: new Date('2026-05-23'),
}
```

## 🎨 Changing Colors

Edit [`app/globals.css`](app/globals.css) to modify the color scheme:

```css
/* Navy colors */
--color-navy-600: #486581;
--color-navy-800: #243b53;

/* Burgundy colors */
--color-burgundy-600: #d1315a;
--color-burgundy-800: #931f42;
```

## 📱 Testing the Invitation Flow

### Test First-Time View

1. Create a test invitation in admin panel
2. Copy the invitation link
3. Open it in a new incognito/private window
4. You'll see the envelope animation
5. Click the envelope to reveal the boarding pass

### Test Return View

1. After opening once, close the window
2. Open the same link again
3. You'll see the boarding pass directly (no envelope)

## 🗄️ Where Data is Stored

All invitation data is stored in the `/data` directory as text files:

- `data/invitations_1.txt` - First 1000 invitations
- `data/invitations_2.txt` - Next 1000 invitations (if needed)
- And so on...

Each line in these files is a JSON object representing one invitation.

**⚠️ Backup Important**: Make sure to backup the `/data` directory regularly!

## 🔧 Common Tasks

### Reset All Data

Delete all files in the `data/` directory:

```bash
rm -rf data/*.txt
```

### Export All Invitations

Use the API endpoint:

```bash
curl http://localhost:3000/api/invitations > invitations-backup.json
```

### Change Admin Password

1. Edit `.env.local`
2. Update `ADMIN_SECRET_KEY`
3. Restart the development server

## 🐛 Troubleshooting

### Port Already in Use

If port 3000 is busy, Next.js will automatically use the next available port (3001, 3002, etc.)

### Can't Access Admin Panel

- Make sure you're using the correct password from `.env.local`
- Check that `.env.local` file exists in the project root

### Invitation Link Doesn't Work

- Check that the development server is running
- Verify the slug in the URL matches an existing invitation

### Data Not Persisting

- Check that the `/data` directory exists
- Ensure the application has write permissions to `/data`

## 📚 Project Structure

```
├── app/
│   ├── admin/          ← Admin panel page
│   ├── api/            ← Backend API routes
│   ├── i/[slug]/       ← Public invitation pages
│   └── page.tsx        ← Home page
├── components/
│   ├── Envelope.tsx    ← Envelope animation
│   └── BoardingPass.tsx ← Invitation design
├── lib/
│   ├── config/         ← Wedding configuration
│   ├── services/       ← File-based database
│   └── types/          ← TypeScript types
└── data/               ← Database files (auto-created)
```

## 🚀 Next Steps

1. ✅ Test the application locally
2. ✅ Customize wedding details in `lib/config/wedding.ts`
3. ✅ Adjust colors/fonts in `app/globals.css` if needed
4. ✅ Create a few test invitations
5. ✅ When ready, follow [DEPLOYMENT.md](DEPLOYMENT.md) to go live

## 💡 Pro Tips

- **Test on Mobile**: Open the invitation on your phone to see how it looks
- **Create Test Invitations**: Make a few test invitations with different names
- **Backup Before Deployment**: Export your invitations before deploying
- **Use Strong Password**: Change the admin password to something secure
- **Monitor Opens**: Check the admin panel regularly to see who's viewed their invitation

## 🎉 Ready to Deploy?

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions for:

- VPS deployment (Ubuntu/Debian)
- Vercel deployment (easiest option)
- SSL certificate setup
- Backup configuration

## ❓ Need Help?

Check these files for more information:

- [README.md](README.md) - Full documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- `lib/config/wedding.ts` - Wedding configuration reference

---

Enjoy your beautiful wedding invitations! 💒✨
