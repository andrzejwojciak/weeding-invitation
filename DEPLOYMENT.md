# Deployment Guide

## VPS Deployment

### Prerequisites

- Ubuntu/Debian VPS with root access
- Node.js 20+ installed
- Domain name (optional)
- Nginx installed

### Step 1: Prepare the Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

### Step 2: Deploy the Application

```bash
# Clone or upload your application
cd /var/www
sudo git clone <your-repo-url> wedding-invitation
cd wedding-invitation

# Install dependencies
npm install

# Set up environment variables
sudo nano .env.local
# Add:
# ADMIN_SECRET_KEY=your_secure_password
# NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Build the application
npm run build

# Create data directory with proper permissions
mkdir -p data
sudo chown -R $USER:$USER data
chmod 755 data
```

### Step 3: Start with PM2

```bash
# Start the application
pm2 start npm --name "wedding-invitation" -- start

# Save PM2 configuration
pm2 save

# Enable PM2 to start on system boot
pm2 startup
# Follow the instructions printed by the command above
```

### Step 4: Configure Nginx

Create Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/wedding-invitation
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/wedding-invitation /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5: SSL with Let's Encrypt (Recommended)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is configured automatically
```

### Step 6: Firewall Configuration

```bash
# Allow HTTP and HTTPS
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## Vercel Deployment (Easiest)

### Prerequisites

- Vercel account
- GitHub repository

### Steps

1. Push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)

3. Click "Add New Project"

4. Import your GitHub repository

5. Configure environment variables:
   - `ADMIN_SECRET_KEY`: Your secure admin password

6. Click "Deploy"

That's it! Vercel will automatically build and deploy your application.

## Environment Variables

Required for production:

- `ADMIN_SECRET_KEY`: Strong password for admin panel access
- `NEXT_PUBLIC_APP_URL`: Full URL of your deployed application

## Monitoring

### VPS with PM2

```bash
# View logs
pm2 logs wedding-invitation

# Monitor processes
pm2 monit

# Restart application
pm2 restart wedding-invitation

# Stop application
pm2 stop wedding-invitation
```

### Vercel

Monitor deployments and logs in the Vercel dashboard.

## Backup

### Data Directory Backup (VPS)

```bash
# Create backup script
cat > /home/ubuntu/backup-invitations.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/home/ubuntu/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR
tar -czf $BACKUP_DIR/invitations_$DATE.tar.gz /var/www/wedding-invitation/data
# Keep only last 30 backups
ls -t $BACKUP_DIR/invitations_*.tar.gz | tail -n +31 | xargs -r rm
EOF

chmod +x /home/ubuntu/backup-invitations.sh

# Add to crontab (daily at 2 AM)
(crontab -l 2>/dev/null; echo "0 2 * * * /home/ubuntu/backup-invitations.sh") | crontab -
```

## Troubleshooting

### Application won't start

```bash
# Check logs
pm2 logs wedding-invitation

# Ensure port 3000 is free
sudo lsof -i :3000

# Check data directory permissions
ls -la /var/www/wedding-invitation/data
```

### Nginx errors

```bash
# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# Test Nginx configuration
sudo nginx -t
```

### Permission issues with data directory

```bash
cd /var/www/wedding-invitation
sudo chown -R www-data:www-data data
chmod 755 data
```

## Performance Optimization

### Enable caching in Nginx

Add to your Nginx server block:

```nginx
location /_next/static {
    proxy_pass http://localhost:3000;
    proxy_cache_valid 200 60m;
    add_header Cache-Control "public, max-age=3600, immutable";
}
```

### PM2 Cluster Mode

For better performance on multi-core systems:

```bash
pm2 delete wedding-invitation
pm2 start npm --name "wedding-invitation" -i max -- start
pm2 save
```

## Security Checklist

- [ ] Strong `ADMIN_SECRET_KEY` set
- [ ] SSL certificate installed
- [ ] Firewall configured
- [ ] Regular backups enabled
- [ ] Keep Node.js and dependencies updated
- [ ] Data directory has proper permissions
- [ ] Monitor application logs regularly

---

For additional support, refer to the main README.md file.
