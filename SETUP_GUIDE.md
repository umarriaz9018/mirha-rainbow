# Setup Guide

## Step 1 - Install Dependencies
               npm install
               
## Step 2 - Google Sheets (Product Database)
1. Go to console.cloud.google.com
2. Create a new project
3. Enable Google Sheets API
4. Create a Service Account -> Keys -> Add Key -> JSON
5. Copy client_email and private_key into .env.local
6. Create a Google Sheet at sheets.google.com
7. Name the first tab: Products
8. Add these headers in Row 1:
   id | name | category | price | priceDisplay | shortDescription |
   description | images | orderType | isAvailable | isFeatured |
   tags | materials | dimensions | deliveryTime | instagramPostUrl
9. Copy the Sheet ID from the URL into GOOGLE_SHEETS_SPREADSHEET_ID
10. Share the sheet with your service account email as Editor

## Step 3 - Gmail App Password
1. Gmail -> Settings -> Security -> 2-Step Verification -> Enable
2. Gmail -> Settings -> Security -> App Passwords -> Generate
3. Copy the 16-character password into EMAIL_APP_PASSWORD in .env.local

## Step 4 - Run Locally
               npm run dev
               Open http://localhost:3000

## Step 5 - Deploy to Vercel (Free)
1. Create account at github.com
2. Create account at vercel.com (sign in with GitHub)
3. Push code to GitHub:
   git init && git add . && git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/mirha-rainbow.git
   git push -u origin main
4. vercel.com -> New Project -> Import repo -> Add env vars -> Deploy

## Step 6 - Connect Your Domain
1. Buy domain at namecheap.com
2. Vercel: Project -> Settings -> Domains -> Add domain
3. Copy DNS records from Vercel into Namecheap Advanced DNS
4. Wait 5-30 minutes

## Adding Products
1. Open your Google Sheet
2. Add a new row with product details
3. For images: Upload to Google Drive -> Share -> Anyone with link -> Copy URL
4. Set isAvailable to true to show, false to hide
5. Set isFeatured to true to show on homepage
6. Website updates within 10 minutes automatically

## Category Options
Ceramics | Aviation Art | Trinkets | Sketching |
Painting | Pottery | Plants | Calligraphy

## Order Type Options
ready-made | made-to-order | both
