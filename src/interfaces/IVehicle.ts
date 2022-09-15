import { z } from 'zod';

const VehicleZodShema = z.object({
  model: z.string().min(3),
  year: z.number().nonnegative().gte(1900).lte(2022),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().nonnegative(),
});

export type IVehicle = z.infer<typeof VehicleZodShema>;

export { VehicleZodShema };