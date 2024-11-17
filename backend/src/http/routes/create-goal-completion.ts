import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import createGoalCompletionHandler, {
  createGoalCompletionSchema,
} from '@/app/handlers/create-goal-completion'

const createGoalCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/completions',
    {
      schema: {
        body: createGoalCompletionSchema,
      },
    },
    async ({ body }) => {
      return await createGoalCompletionHandler(body)
    }
  )
}

export default createGoalCompletionRoute
