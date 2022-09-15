import { z } from 'zod';
import { VehicleZodShema } from './IVehicle';

const CarZodSchema = VehicleZodShema.extend({
  doorsQty: z.number().nonnegative().gte(2).lte(7),
  seatsQty: z.number().nonnegative().gte(2).lte(7),
});

export type ICar = z.infer<typeof CarZodSchema>;

export { CarZodSchema };