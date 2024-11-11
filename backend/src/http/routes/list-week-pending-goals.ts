import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import listWeekPendingGoalsHandler from '@/app/handlers/list-week-pending-goals'

const listWeekPendingGoalsRoute: FastifyPluginAsyncZod = async app => {
  app.get('/goals/pending', {}, async () => {
    return await listWeekPendingGoalsHandler()
  })
}

export default listWeekPendingGoalsRoute
