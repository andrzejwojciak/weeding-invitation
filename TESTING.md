# Testing Checklist

Use this checklist to ensure everything works correctly before deploying.

## ✅ Pre-Deployment Testing

### Environment Setup

- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` file exists
- [ ] `ADMIN_SECRET_KEY` is set
- [ ] Development server starts without errors
- [ ] No TypeScript errors (`npm run build`)

### Admin Panel Tests

#### Authentication

- [ ] Can access `/admin` page
- [ ] Login with correct password works
- [ ] Login with wrong password is rejected
- [ ] After login, admin panel is displayed

#### Create Invitations

- [ ] Can enter guest name in form
- [ ] "Create Invitation" button is clickable
- [ ] New invitation appears in table after creation
- [ ] Multiple invitations can be created
- [ ] Special characters in names are handled (ą, ć, ę, ł, etc.)

#### View Invitations

- [ ] All created invitations are listed
- [ ] Guest names display correctly
- [ ] Created date is shown
- [ ] Status shows "Not Opened" initially
- [ ] Table is responsive on mobile

#### Copy Links

- [ ] "Copy Link" button works
- [ ] Copied link is valid and complete
- [ ] Link includes correct domain/port
- [ ] Each invitation has unique slug
- [ ] Button shows "Copied!" feedback

### Public Invitation Tests

#### First Visit (Envelope Flow)

- [ ] Opening invitation link shows envelope
- [ ] Guest name is displayed correctly
- [ ] Envelope design looks good on desktop
- [ ] Envelope design looks good on mobile
- [ ] Clicking envelope triggers animation
- [ ] Animation plays smoothly
- [ ] Boarding pass appears after animation
- [ ] Status changes to "Opened" in admin panel

#### Return Visit (Direct Boarding Pass)

- [ ] Returning to same link skips envelope
- [ ] Boarding pass is shown immediately
- [ ] No envelope animation plays
- [ ] Status remains "Opened"

#### Boarding Pass Design

- [ ] All wedding details are correct
- [ ] Couple names display properly
- [ ] Wedding date is correct
- [ ] Ceremony time and location are accurate
- [ ] Reception location is accurate
- [ ] RSVP deadline is shown
- [ ] Phone numbers are clickable links
- [ ] QR code placeholder is visible
- [ ] Barcode is generated
- [ ] Gift icons are displayed
- [ ] Design is responsive on mobile
- [ ] Design is responsive on tablet
- [ ] Design is responsive on desktop
- [ ] Colors match theme (navy, burgundy, cream)
- [ ] Fonts are readable

### Data Persistence Tests

#### File-Based Database

- [ ] `data/` directory is created automatically
- [ ] `invitations_1.txt` file is created on first invitation
- [ ] New invitations are appended to file
- [ ] Data persists after server restart
- [ ] Can read invitations after restart
- [ ] Status updates are saved
- [ ] Multiple files are created if needed (test with 1000+ invitations if applicable)

#### API Endpoints

- [ ] `GET /api/invitations` returns all invitations
- [ ] `POST /api/invitations` creates new invitation
- [ ] `GET /api/invitations/[slug]` returns specific invitation
- [ ] `PATCH /api/invitations/[slug]` marks as read
- [ ] `POST /api/auth` validates admin password
- [ ] API handles errors gracefully
- [ ] Invalid slugs return 404

### Mobile Responsiveness

#### iPhone/iOS

- [ ] Home page looks good
- [ ] Admin panel is usable
- [ ] Envelope animation works
- [ ] Boarding pass is readable
- [ ] All buttons are tappable
- [ ] Text is not too small

#### Android

- [ ] Home page looks good
- [ ] Admin panel is usable
- [ ] Envelope animation works
- [ ] Boarding pass is readable
- [ ] All buttons are tappable
- [ ] Text is not too small

#### Tablets

- [ ] Layout adapts properly
- [ ] No awkward spacing
- [ ] Boarding pass utilizes space well

### Browser Compatibility

#### Desktop Browsers

- [ ] Chrome/Edge - All features work
- [ ] Firefox - All features work
- [ ] Safari - All features work

#### Mobile Browsers

- [ ] Chrome Mobile - All features work
- [ ] Safari Mobile - All features work
- [ ] Firefox Mobile - All features work

### Performance Tests

- [ ] Page load time is acceptable (<3s)
- [ ] Animations run smoothly (60 FPS)
- [ ] No console errors
- [ ] No console warnings (or explained)
- [ ] Images/fonts load properly

### Security Tests

- [ ] Admin panel requires password
- [ ] No sensitive data in browser console
- [ ] No sensitive data in page source
- [ ] `.env.local` is in `.gitignore`
- [ ] `data/` directory is in `.gitignore`
- [ ] API endpoints validate input

### Edge Cases

#### Unusual Names

- [ ] Very long names (50+ characters)
- [ ] Names with special characters (ą, ć, ę, ł, ń, ó, ś, ź, ż)
- [ ] Names with hyphens
- [ ] Names with apostrophes
- [ ] Single-word names
- [ ] Names with multiple spaces

#### Network Issues

- [ ] Graceful handling of API failures
- [ ] Loading states are shown
- [ ] Error messages are user-friendly

#### Invalid Data

- [ ] Accessing non-existent invitation slug
- [ ] Accessing invitation with malformed slug
- [ ] Empty form submission is prevented
- [ ] Invalid characters in admin password

## 🚀 Production Readiness

Before deploying to production:

### Configuration

- [ ] Updated `ADMIN_SECRET_KEY` to strong password
- [ ] Set `NEXT_PUBLIC_APP_URL` to production domain
- [ ] Reviewed and updated all wedding details
- [ ] Colors and fonts are finalized
- [ ] RSVP deadline is correct

### Build Test

- [ ] `npm run build` completes successfully
- [ ] No build errors
- [ ] No build warnings (or explained)
- [ ] Production build starts with `npm start`

### Data Backup

- [ ] Backup strategy is in place
- [ ] Can restore from backup
- [ ] Backup includes invitation data

### Documentation

- [ ] README.md is up to date
- [ ] Deployment instructions are clear
- [ ] Environment variables are documented

## 📝 Testing Notes

Use this section to track issues found during testing:

### Issues Found

- Issue:
  - Steps to reproduce:
  - Expected behavior:
  - Actual behavior:
  - Status: [ ] Fixed / [ ] Known Issue / [ ] Won't Fix

### Test Environment

- OS:
- Browser:
- Screen Size:
- Date Tested:

---

## ✨ Final Check

Before going live:

- [ ] All critical tests passed
- [ ] All blocking issues resolved
- [ ] Backup system is working
- [ ] Admin password is secure
- [ ] Wedding details are accurate
- [ ] Design approved by couple
- [ ] Tested with at least 3 test invitations
- [ ] Mobile experience is smooth
- [ ] Ready to share with guests!

**Congratulations! Your wedding invitation system is ready! 🎉**
