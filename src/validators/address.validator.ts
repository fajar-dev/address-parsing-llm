import { z } from 'zod'

export const addressParse = z.object({
  body: z.object({
    address: z.string().min(3, "Name must be at least 3 characters").nonempty("Address is required"),
  }),
})

