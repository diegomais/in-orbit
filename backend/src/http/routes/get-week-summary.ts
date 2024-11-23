import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import getWeekSummaryHandler from '@/app/handlers/get-week-summary'

const getWeekSummaryRoute: FastifyPluginAsyncZod = async app => {
  app.get('/summary', {}, async () => {
    return await getWeekSummaryHandler()
  })
}

export default getWeekSummaryRoute
