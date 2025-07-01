import {z} from 'zod';
import {registry} from '../openapi/registry.js';

export const BrewDTO = z.object({
    beans: z.string().min(3).max(40).describe('Beans type'),
    method: z.enum(['v60', 'aeropress', 'chemex', 'espresso']).describe('Type of brewing method'),
    rating: z.number().min(1).max(5).optional().describe('Rating of the brew'),
    notes: z.string().max(200).optional().describe('Additional notes about the brew'),
    brewedAt: z.string().datetime().optional().describe('Date and time when the brew was made')
})

registry.register('Brew', BrewDTO);
