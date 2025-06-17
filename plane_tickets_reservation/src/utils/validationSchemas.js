import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const flightSearchSchema = z.object({
  origin: z.string().min(1, "Origin city is required"),
  destination: z.string().min(1, "Destination city is required"),
  departureDate: z.string().min(1, "Departure date is required"),
});

export const bookingSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters long"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().optional(),
  confirmAgreement: z.boolean().refine((val) => val === true, {
    message: "You must agree to the booking terms and conditions",
  }),
});
