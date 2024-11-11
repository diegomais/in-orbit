import z from 'zod'

const envSchema = z.object({
  DATABASE_LOGGING: z.coerce.boolean().default(false),
  DATABASE_URL: z.string().url(),
  HOST: z.string().ip().default('0.0.0.0'),
  PORT: z.coerce.number().int().nonnegative().max(65535).default(4000),
})

export default envSchema.parse(process.env)
