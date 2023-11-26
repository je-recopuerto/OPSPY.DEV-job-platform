import {z} from 'zod';

export const onboardingSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.date().max(new Date(), 'Date of birth must be in the past')
});