/**
 * GOOGLE DRIVE RANDOM PHOTO SLIDESHOW
 *
 * 1. Replace PHOTO_FOLDER_ID with your Google Drive folder ID.
 * 2. Add this file to a Google Apps Script project as Code.gs.
 * 3. Add the accompanying Index.html file.
 * 4. Deploy as a Web App.
 */

const PHOTO_FOLDER_ID = '1r88sUOQ9bRcdpLAfabKo7g_aKlj_Tu4h';

/**
 * When true, images inside subfolders are included.
 * Change to false to scan only the main folder.
 */
const INCLUDE_SUBFOLDERS = true;

/**
 * Serves the slideshow page.
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Random Photo Slideshow')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Returns image files found in the configured Google Drive folder.
 *
 * The browser receives only the file name, file ID, and image URL.
 */
function getPhotoFiles() {
  if (
    !PHOTO_FOLDER_ID ||
    PHOTO_FOLDER_ID === 'PASTE_GOOGLE_DRIVE_FOLDER_ID_HERE'
  ) {
    throw new Error(
      'Please replace PHOTO_FOLDER_ID in Code.gs with your Google Drive folder ID.'
    );
  }

  const rootFolder = DriveApp.getFolderById(PHOTO_FOLDER_ID);
  const photos = [];

  collectImagesFromFolder_(rootFolder, photos);

  if (photos.length === 0) {
    return [];
  }

  return photos;
}

/**
 * Recursively scans a folder for image files.
 */
function collectImagesFromFolder_(folder, photos) {
  const files = folder.getFiles();

  while (files.hasNext()) {
    const file = files.next();
    const mimeType = file.getMimeType() || '';

    if (mimeType.indexOf('image/') === 0) {
      photos.push({
        id: file.getId(),
        name: file.getName(),
        mimeType: mimeType,

        /*
         * This URL displays a resized Drive image in the browser.
         * For a publicly deployed slideshow, the image files or folder
         * should normally be shared as "Anyone with the link - Viewer."
         */
        url:
          'https://drive.google.com/thumbnail?id=' +
          encodeURIComponent(file.getId()) +
          '&sz=w2400'
      });
    }
  }

  if (!INCLUDE_SUBFOLDERS) {
    return;
  }

  const subfolders = folder.getFolders();

  while (subfolders.hasNext()) {
    collectImagesFromFolder_(subfolders.next(), photos);
  }
}
