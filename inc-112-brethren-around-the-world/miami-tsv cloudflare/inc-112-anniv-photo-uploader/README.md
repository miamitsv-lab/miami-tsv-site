# INC 112th Anniversary Thanksgiving Photo Uploader

This is the complete Google Apps Script web-app package.

## Included files

- `Code.gs` — Google Apps Script backend that saves uploaded images to Google Drive.
- `Index.html` — final responsive uploader page.
- `112th_anniversary_logo_of_iglesia_ni_cristo.png` — high-resolution source graphic for backup or future editing.

The anniversary graphic is already embedded directly inside `Index.html`, so the deployed page does not depend on a separate image URL or uploaded image file.

## Final responsive layout

- Desktop: anniversary graphic on the left and uploader on the right.
- Tablet: responsive two-column layout with adjusted spacing and sizing.
- Mobile: anniversary graphic above the uploader.
- The drop zone spans the full uploader width with its plus icon centered.
- Horizontal overflow is prevented so there is no side-to-side page scrollbar.

## Google Apps Script setup

1. Create or open the Google Apps Script project for the uploader.
2. Replace the project’s `Code.gs` contents with the included `Code.gs`.
3. Add or open an HTML file named exactly `Index`.
4. Replace its contents with the included `Index.html`.
5. Open the Google Drive folder that will receive the photos.
6. Copy the folder ID from its URL. The ID is the long value after `/folders/`.
7. In `Code.gs`, replace:

   `PASTE_GOOGLE_DRIVE_FOLDER_ID_HERE`

   with the actual folder ID.
8. Save the Apps Script project.
9. Select **Deploy → New deployment**.
10. Choose **Web app**.
11. Set **Execute as** to **Me**.
12. Set access to the audience that should be permitted to use the uploader.
13. Deploy and approve the requested Google Drive permissions.

## Updating an existing deployment

After replacing `Index.html` or `Code.gs`:

1. Save the project.
2. Select **Deploy → Manage deployments**.
3. Edit the existing web-app deployment.
4. Select **New version**.
5. Deploy the new version.

The existing web-app URL normally remains the same when the current deployment is updated.

## Backend settings

These values can be changed near the top of `Code.gs`:

- `DRIVE_FOLDER_ID` — destination Google Drive folder.
- `CREATE_DAILY_SUBFOLDERS` — creates a dated folder for each upload day when `true`.
- `MAX_FILE_SIZE_MB` — maximum permitted size for each image.
- `EVENT_NAME` — event label stored in uploaded file descriptions.

## Notes

- The page accepts image files and uploads each selected image through `google.script.run`.
- The final `Index.html` still calls `getClientConfig()` and `uploadPhoto()` from `Code.gs`.
- A maximum of 12 images can be selected in one batch in the current page.
- Use a dedicated Drive folder and disable or restrict the deployment after the event when public uploads are no longer needed.
