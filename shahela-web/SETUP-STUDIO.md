# Studio infrastructure setup

The Studio app lives at `https://tometu.ami.bd/studio`. Original public pages are not changed.

## Why Google Drive now uses OAuth

Do **not** use a Google service account for your personal My Drive storage. Google returns:

`403 storageQuotaExceeded — Service Accounts do not have storage quota`

Studio therefore uses a Google OAuth refresh token. The Drive and Sheets operations run as **your Google account**, so files use your account's normal Drive quota.

## 1. Google Cloud project

In Google Cloud Console:

1. Create/select a project.
2. Enable **Google Drive API**.
3. Enable **Google Sheets API**.
4. Configure the OAuth consent screen.
5. Create an OAuth Client ID for a **Web application**.
6. Keep the generated:
   - Client ID
   - Client Secret

Use a Google account that owns or has Editor access to the Drive folder and Sheet.

## 2. Get a refresh token

Use Google's OAuth 2.0 flow with these scopes:

```
https://www.googleapis.com/auth/drive
https://www.googleapis.com/auth/spreadsheets
```

For the initial authorization, request offline access so Google returns a refresh token.

If you use Google's OAuth Playground, authorize the two scopes above with the Google account whose Drive you want to use, exchange the authorization code for tokens, and copy the **refresh token**. Keep it private.

Do not put the refresh token in client-side code or GitHub.

## 3. Google Drive folder

Create a folder in the Google account's Drive and copy its folder ID.

Give the OAuth account access to that folder. Because the app authenticates as that account, no service-account sharing is needed.

## 4. Google Sheet

Create a Sheet in the same Google account and copy its spreadsheet ID.

Create these tabs with the exact first-row headers:

- Projects: slug,title,clientName,clientEmail,price,status,version,driveFolderId,whatsapp,createdAt,updatedAt
- Files: id,projectSlug,driveFileId,name,mimeType,size,downloadUrl,status,createdAt
- Reviews: id,projectSlug,type,message,createdAt,clientEmail
- Payments: id,projectSlug,clientName,clientEmail,method,trxId,amount,status,createdAt,verifiedAt
- Revisions: id,projectSlug,message,createdAt,clientEmail
- Deliveries: id,projectSlug,clientEmail,fileCount,sentAt,status
- PaymentMethods: name,accountName,accountNumber,instructions,enabled
- ActivityLog: id,projectSlug,type,message,createdAt

## 5. Vercel environment variables

Replace the old service-account variables with:

```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
GOOGLE_SHEET_ID=
GOOGLE_DRIVE_FOLDER_ID=

RESEND_API_KEY=
RESEND_FROM_EMAIL=Studio <studio@syedfahimmuddasir.bro.bd>

STUDIO_ADMIN_EMAIL=
STUDIO_ADMIN_PASSWORD=
STUDIO_ADMIN_SECRET=

NEXT_PUBLIC_STUDIO_BASE_URL=https://tometu.ami.bd
```

### Remove these old variables

```
GOOGLE_CLIENT_EMAIL
GOOGLE_PRIVATE_KEY
```

They are no longer used.

## 6. Upload architecture

The browser does **not** upload directly to Google Drive.

```
Browser
  ↓ 3 MB chunks
Vercel /api/studio/upload-chunk
  ↓ server-to-server
Google Drive resumable upload
```

This avoids Google Drive browser CORS problems and avoids sending a huge file through one Vercel request.

The server-to-server chunk request is allowed to use `Content-Length`; the browser never sets that restricted header.

## 7. Resend

The configured sender domain must be verified in Resend before production sending.

## 8. Test order

Do not start with a multi-GB PSD.

Test in this order:

1. JPG
2. PDF
3. MP4
4. 100–500 MB file
5. Large PSD/PSB

After each upload confirm:

- file exists in Drive
- Files row exists in Sheets
- client review can open the file
- approval works
- payment submission works
- Studio can verify payment
- delivery email is sent

## WhatsApp

Revision requests open WhatsApp with a prefilled message. A normal WhatsApp web link cannot silently press Send; automatic sending requires WhatsApp Business Cloud API.
