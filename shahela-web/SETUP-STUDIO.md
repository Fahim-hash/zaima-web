# Studio infrastructure setup

The Studio app lives at `https://tometu.ami.bd/studio`. Original public pages are not changed.

## Google Sheets tabs

Create these tabs with the exact first-row headers:

- Projects: slug,title,clientName,clientEmail,price,status,version,driveFolderId,whatsapp,createdAt,updatedAt
- Files: id,projectSlug,driveFileId,name,mimeType,size,downloadUrl,status,createdAt
- Reviews: id,projectSlug,type,message,createdAt,clientEmail
- Payments: id,projectSlug,clientName,clientEmail,method,trxId,amount,status,createdAt,verifiedAt
- Revisions: id,projectSlug,message,createdAt,clientEmail
- Deliveries: id,projectSlug,clientEmail,fileCount,sentAt,status
- PaymentMethods: name,accountName,accountNumber,instructions,enabled
- ActivityLog: id,projectSlug,type,message,createdAt

## Vercel environment variables

```
GOOGLE_CLIENT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_SHEET_ID=
GOOGLE_DRIVE_FOLDER_ID=
RESEND_API_KEY=
RESEND_FROM_EMAIL=Studio <studio@syedfahimmuddasir.bro.bd>
STUDIO_ADMIN_EMAIL=
STUDIO_ADMIN_PASSWORD=
NEXT_PUBLIC_STUDIO_BASE_URL=https://tometu.ami.bd
STUDIO_ADMIN_SECRET=
```

Google service-account access must be granted to the target Drive folder and Google Sheet.

## Resend

The configured sender domain must be verified in Resend before production sending. The app uses the Resend API directly for transactional messages and idempotency keys for retry safety.

## File delivery

Images, PDFs, audio and browser-compatible video are previewed in the client review. Other formats are delivered as downloads. Large files are uploaded directly to Drive with resumable upload sessions; they are not sent through the Vercel request body.

## WhatsApp

Revision requests open WhatsApp with a prefilled message. Standard WhatsApp links cannot silently press Send; automatic sending requires WhatsApp Business Cloud API.
