import { z } from "zod";

// Define a schema for form validation using Zod
export const UserFormValidation = z.object({
  name: z.string().min(2).max(20),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().refine((phone) => /^\+?[0-9]{10,14}$/.test(phone), { message: "Invalid phone number" })
});
