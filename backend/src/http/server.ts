import fastify from 'fastify'
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import env from '@/config/env'
import createGoalRoute from './routes/create-goal'
import listWeekPendingGoalsRoute from './routes/list-week-pending-goals'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.withTypeProvider<ZodTypeProvider>()

app.register(createGoalRoute)
app.register(listWeekPendingGoalsRoute)

app.listen({ host: env.HOST, port: env.PORT }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`App listening at ${address}`)
})
