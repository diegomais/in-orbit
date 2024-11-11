import fastify from 'fastify'
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import env from '@/config/env'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.withTypeProvider<ZodTypeProvider>()

app.get('/', async (request, reply) => {
  reply.send({ message: 'Hello World!' })
})

app.listen({ host: env.HOST, port: env.PORT }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`App listening at ${address}`)
})
