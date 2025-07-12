import { Injectable } from '@nestjs/common';
import { unzipToTempDir } from '../utils/unzip';
import { SharedState } from '../interfaces/shared-state.interface';
import * as path from 'path';
import * as fs from 'node:fs/promises';
import { Worker } from 'worker_threads';
import { Mutex } from 'async-mutex';

@Injectable()
export class ZipService {
  async processZip(zipPath: string) {
    const startTime = performance.now();
    const imagePaths = await unzipToTempDir(zipPath);

    const outputDir = path.join('./output', Date.now().toString());
    await fs.mkdir(outputDir, { recursive: true });

    const state: SharedState = { processed: 0, skipped: 0 };
    const mutex = new Mutex();

    const workers = imagePaths.map((imgPath) => {
      return new Promise<void>((resolve) => {
        const worker = new Worker(
          path.resolve(__dirname, '../workers/thumbnail.worker.js'),
          {
            workerData: {
              filePath: imgPath,
              outputDir,
            },
          },
        );

        worker.once(
          'message',
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          async (value: { status: string }): Promise<void> => {
            const release = await mutex.acquire();
            try {
              if (value.status === 'ok') {
                state.processed++;
              }

              if (value.status === 'error') {
                state.skipped++;
              }
            } finally {
              release();
              resolve();
            }
          },
        );
      });
    });

    await Promise.all(workers);
    await fs.rm(path.dirname(imagePaths[0]), { recursive: true });
    await fs.unlink(zipPath);

    const durationMs = Math.round(performance.now() - startTime);

    const total = imagePaths.length;
    if (state.processed + state.skipped !== total) {
      throw new Error(
        `Mismatch in count! processed + skipped != total (${state.processed} + ${state.skipped} ≠ ${total})`,
      );
    }

    return {
      processed: state.processed,
      skipped: state.skipped,
      durationMs,
    };
  }
}
