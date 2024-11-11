import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import createGoalHandler, { createGoalSchema } from '@/app/handlers/create-goal'

const createGoalRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/goals',
    {
      schema: {
        body: createGoalSchema,
      },
    },
    async ({ body }) => {
      return await createGoalHandler(body)
    }
  )
}

export default createGoalRoute
