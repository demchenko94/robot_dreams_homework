import { Injectable, NotFoundException } from '@nestjs/common';
import { TeaRepository } from './tea.repository';
import { Tea } from './tea.model';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class TeaService {
  constructor(private readonly teaRepository: TeaRepository) {}

  async createTea(data: Omit<Tea, 'id'>): Promise<Tea> {
    return this.teaRepository.create(data);
  }

  async getAllTeas(query: QueryDto): Promise<Tea[]> {
    let teas = await this.teaRepository.findAll();
    const { page, limit, minRating } = query;

    if (minRating) {
      teas = teas.filter((tea) => {
        if (tea.rating) {
          return tea.rating >= minRating;
        }
      });
    }

    if (page && limit) {
      const start = (page - 1) * limit;
      teas = teas.slice(start, start + limit);
    }

    return teas;
  }

  async getTeaById(id: string): Promise<Tea> {
    const tea = await this.teaRepository.findById(id);
    if (!tea) {
      throw new NotFoundException(`Tea with id ${id} not found`);
    }
    return tea;
  }

  async updateTea(id: string, update: Partial<Omit<Tea, 'id'>>): Promise<Tea> {
    const updated = await this.teaRepository.update(id, update);
    if (!updated) {
      throw new NotFoundException(`Tea with id ${id} not found`);
    }
    return updated;
  }

  async deleteTea(id: string): Promise<void> {
    const deleted = await this.teaRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Tea with id ${id} not found`);
    }
  }
}
