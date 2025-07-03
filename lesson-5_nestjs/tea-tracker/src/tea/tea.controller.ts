import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { TeaService } from './tea.service';
import { ZParam } from '../common/decorators/zparams.decorator';
import { IdParamSchema } from '../common/schemas/id-param.schema';
import { z } from 'zod';
import { ZBody } from '../common/decorators/zbody.decorator';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateTeaDtoShema, UpdateTeaDtoShema } from './schemas/tea.schema';
import { CreateTeaDto } from './dto/create-tea.dto';
import { UpdateTeaDto } from './dto/update-tea.dto';
import { Public } from '../common/decorators/public.decorator';
import { QueryDto } from './dto/query.dto';
import { ZQuery } from '../common/decorators/zqueries.decorator';
import { QueriesSchema } from '../common/schemas/queries.schema';

@ApiTags('Teas')
@Controller('tea')
export class TeaController {
  constructor(private readonly teaService: TeaService) {}

  @Get()
  @Public()
  @ApiQuery({ type: QueryDto })
  async findAll(@ZQuery(QueriesSchema) query: z.infer<typeof QueriesSchema>) {
    const teas = await this.teaService.getAllTeas(query);

    return {
      data: [...teas],
      total: teas.length,
      page: query.page || 1,
      limit: query.limit || 10,
    };
  }

  @Get(':id')
  findOne(@ZParam(IdParamSchema) params: z.infer<typeof IdParamSchema>) {
    const { id } = params;
    return this.teaService.getTeaById(id);
  }

  @UseGuards(ThrottlerGuard)
  @Post()
  @ApiBody({ type: CreateTeaDto })
  create(@ZBody(CreateTeaDtoShema) body: z.infer<typeof CreateTeaDtoShema>) {
    return this.teaService.createTea(body);
  }

  @Put(':id')
  @ApiBody({ type: UpdateTeaDto })
  update(
    @ZParam(IdParamSchema) params: z.infer<typeof IdParamSchema>,
    @ZBody(UpdateTeaDtoShema) body: z.infer<typeof UpdateTeaDtoShema>,
  ) {
    return this.teaService.updateTea(params.id, body);
  }

  @Delete(':id')
  delete(@ZParam(IdParamSchema) params: z.infer<typeof IdParamSchema>) {
    return this.teaService.deleteTea(params.id);
  }
}
