import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ZipService } from './zip.service';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('zip')
export class ZipController {
  constructor(private readonly zipService: ZipService) {}

  @UseGuards(ThrottlerGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './tmp',
        filename: (req, file, cb) =>
          cb(null, `${Date.now()}-${file.originalname}`),
      }),
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype === 'application/zip' ||
          file.originalname.endsWith('.zip')
        ) {
          cb(null, true);
        } else {
          cb(new Error('Only zip files are allowed'), false);
        }
      },
    }),
  )
  handleZip(@UploadedFile() file: Express.Multer.File) {
    return this.zipService.processZip(file.path);
  }
}
