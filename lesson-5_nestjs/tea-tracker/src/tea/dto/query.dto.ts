import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryDto {
  @ApiPropertyOptional({
    minLength: 1,
    maxLength: 10,
    description: 'Min rating of the tea',
    example: 3,
  })
  minRating?: number;

  @ApiPropertyOptional({
    minLength: 1,
    maxLength: 1000,
    description: 'Number of page',
    example: 1,
  })
  page?: number;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 10,
    description: 'Number of items per page',
    example: 5,
  })
  limit?: number;
}
