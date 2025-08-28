import { z } from "zod";

export const addressParse = z.object({
  body: z.object({
    address: z.string().min(3, "Nama minimal 3 karakter").nonempty("Alamat wajib diisi"),
  }),
});

