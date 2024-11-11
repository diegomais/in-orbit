import db, { client } from '.'
import { goalCompletions, goals } from './schema'

async function seed() {
  await db.delete(goals)

  const [wakeUpEarly, workout] = await db
    .insert(goals)
    .values([
      { title: 'Wake up early', desiredWeeklyFrequency: 5 },
      { title: 'Workout', desiredWeeklyFrequency: 3 },
      { title: 'Meditate', desiredWeeklyFrequency: 1 },
    ])
    .returning()

  const startOfWeek = new Date()
  startOfWeek.setHours(0, 0, 0, 0)
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(endOfWeek.getDate() + 7)

  await db.insert(goalCompletions).values([
    { goalId: wakeUpEarly.id, createdAt: startOfWeek },
    { goalId: workout.id, createdAt: endOfWeek },
  ])
}

seed().finally(() => {
  client.end()
})
