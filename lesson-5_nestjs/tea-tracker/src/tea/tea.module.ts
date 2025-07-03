import { Module } from '@nestjs/common';
import { TeaController } from './tea.controller';
import { TeaService } from './tea.service';
import { TeaRepository } from './tea.repository';

@Module({
  controllers: [TeaController],
  providers: [TeaService, TeaRepository],
})
export class TeaModule {}
