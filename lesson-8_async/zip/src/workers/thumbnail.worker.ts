import { threadId, workerData, parentPort } from 'worker_threads';
import * as sharp from 'sharp';
import * as path from 'path';

interface WorkerInput {
  filePath: string;
  outputDir: string;
}

(function () {
  const { filePath, outputDir } = workerData as WorkerInput;
  console.log(`Worker ${threadId} processing:`, filePath);
  try {
    const fileName = path.basename(filePath);
    const thumbPath = path.join(outputDir, `thumb-${fileName}`);

    sharp(filePath)
      .resize({ width: 150 })
      .jpeg({ quality: 80 })
      .toFile(thumbPath)
      .then(() => {
        parentPort?.postMessage({ status: 'ok' });
      })
      .catch((err) => {
        parentPort?.postMessage({ status: 'error', error: err as Error });
      });
  } catch (e) {
    parentPort?.postMessage({ status: 'error', error: e as Error });
  }
})();
