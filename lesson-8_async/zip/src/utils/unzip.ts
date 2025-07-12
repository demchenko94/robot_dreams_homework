import * as AdmZip from 'adm-zip';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as os from 'node:os';

export async function unzipToTempDir(zipPath: string): Promise<string[]> {
  const zip = new AdmZip(zipPath);
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'unzipped-'));

  const entries = zip.getEntries();
  const extractedFiles: string[] = [];

  const imageEntries = entries.filter((entry) => {
    const isMetaFile =
      entry.entryName.includes('__MACOSX') ||
      path.basename(entry.entryName).startsWith('._');
    const ext = path.extname(entry.entryName).toLowerCase();

    return (
      !entry.isDirectory &&
      !isMetaFile &&
      ['.jpg', '.jpeg', '.png'].includes(ext)
    );
  });

  for (const entry of imageEntries) {
    const fileName = path.basename(entry.entryName);
    const filePath = path.join(tempDir, fileName);
    await fs.writeFile(filePath, entry.getData());
    extractedFiles.push(filePath);
  }

  return extractedFiles;
}
