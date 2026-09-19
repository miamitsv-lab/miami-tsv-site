/**
 * INC Anniversary Thanksgiving Photo Uploader
 * Google Apps Script backend
 */

const SETTINGS = Object.freeze({
  // Paste the Google Drive folder ID where photos should be saved.
  DRIVE_FOLDER_ID: 'PASTE_GOOGLE_DRIVE_FOLDER_ID_HERE',

  // Optional: files are placed inside a YYYY-MM-DD subfolder.
  CREATE_DAILY_SUBFOLDERS: true,

  // File limits. Keep these conservative for reliable Apps Script uploads.
  MAX_FILE_SIZE_MB: 12,
  ALLOWED_MIME_PREFIX: 'image/',

  // Optional event label used in file descriptions and filenames.
  EVENT_NAME: '112th Anniversary Thanksgiving'
});

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Anniversary Thanksgiving Photo Upload')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/** Returns safe client-side configuration after deployment. */
function getClientConfig() {
  return {
    webAppUrl: ScriptApp.getService().getUrl() || '',
    maxFileSizeMB: SETTINGS.MAX_FILE_SIZE_MB,
    eventName: SETTINGS.EVENT_NAME,
    isConfigured: isFolderConfigured_()
  };
}

/**
 * Uploads one image at a time. The browser calls this repeatedly for multiple files.
 * @param {Object} fileData {name, mimeType, base64}
 * @param {Object} metadata {uploaderName, congregation, caption}
 */
function uploadPhoto(fileData, metadata) {
  validateSettings_();
  validateFileData_(fileData);

  const bytes = Utilities.base64Decode(fileData.base64);
  const maxBytes = SETTINGS.MAX_FILE_SIZE_MB * 1024 * 1024;
  if (bytes.length > maxBytes) {
    throw new Error(`File exceeds the ${SETTINGS.MAX_FILE_SIZE_MB} MB limit.`);
  }

  const rootFolder = DriveApp.getFolderById(SETTINGS.DRIVE_FOLDER_ID);
  const destinationFolder = SETTINGS.CREATE_DAILY_SUBFOLDERS
    ? getOrCreateDailyFolder_(rootFolder)
    : rootFolder;

  const safeUploader = sanitizeText_(metadata && metadata.uploaderName, 'Guest');
  const safeOriginalName = sanitizeFilename_(fileData.name || 'photo.jpg');
  const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd-HHmmss');
  const finalName = `${stamp}_${safeUploader}_${safeOriginalName}`;

  const blob = Utilities.newBlob(bytes, fileData.mimeType, finalName);
  const file = destinationFolder.createFile(blob);

  const description = [
    `Event: ${SETTINGS.EVENT_NAME}`,
    `Uploaded by: ${safeUploader}`,
    `Local/GWS: ${sanitizeText_(metadata && metadata.congregation, 'Not provided')}`,
    `Caption: ${sanitizeText_(metadata && metadata.caption, 'None')}`,
    `Uploaded: ${new Date().toISOString()}`
  ].join('\n');
  file.setDescription(description);

  return {
    success: true,
    name: file.getName(),
    fileId: file.getId(),
    fileUrl: file.getUrl()
  };
}

function validateSettings_() {
  if (!isFolderConfigured_()) {
    throw new Error('The Google Drive folder ID has not been configured in Code.gs.');
  }
}

function isFolderConfigured_() {
  return Boolean(
    SETTINGS.DRIVE_FOLDER_ID &&
    SETTINGS.DRIVE_FOLDER_ID !== 'PASTE_GOOGLE_DRIVE_FOLDER_ID_HERE'
  );
}

function validateFileData_(fileData) {
  if (!fileData || !fileData.base64 || !fileData.mimeType) {
    throw new Error('The upload data is incomplete.');
  }
  if (!String(fileData.mimeType).toLowerCase().startsWith(SETTINGS.ALLOWED_MIME_PREFIX)) {
    throw new Error('Only image files are allowed.');
  }
}

function getOrCreateDailyFolder_(rootFolder) {
  const folderName = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  const matches = rootFolder.getFoldersByName(folderName);
  return matches.hasNext() ? matches.next() : rootFolder.createFolder(folderName);
}

function sanitizeText_(value, fallback) {
  const cleaned = String(value || '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 150);
  return cleaned || fallback;
}

function sanitizeFilename_(value) {
  return String(value || 'photo.jpg')
    .replace(/[\\/:*?"<>|#%{}~&]/g, '-')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 140);
}
