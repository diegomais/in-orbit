import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import Button from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Input from '@/components/ui/input'
import Label from '@/components/ui/label'
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from '@/components/ui/radio-group'

const createGoalSchema = z.object({
  title: z.string().min(1, 'Enter the goal you want to achieve'),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
})

type CreateGoalFormValues = z.infer<typeof createGoalSchema>

const CreateGoal = () => {
  const { register, control, handleSubmit, formState, reset } =
    useForm<CreateGoalFormValues>({
      resolver: zodResolver(createGoalSchema),
    })

  const handleCreateGoal = async (values: CreateGoalFormValues) => {
    console.log(values)
    reset()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Create a goal
        </Button>
      </DialogTrigger>

      <DialogContent>
        <div className="flex flex-col gap-6 h-full">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <DialogTitle>Create goal</DialogTitle>
              <DialogClose>
                <X className="size-5 text-zinc-600" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>

            <DialogDescription>
              Add activities that are good for you and that you want to continue
              doing every week.
            </DialogDescription>
          </div>

          <form
            className="flex-1 flex flex-col justify-between"
            onSubmit={handleSubmit(handleCreateGoal)}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">What is the activity?</Label>
                <Input
                  id="title"
                  autoFocus
                  placeholder="Exercise, meditate, etc..."
                  {...register('title')}
                />

                {formState.errors.title ? (
                  <p className="text-red-400 text-sm">
                    {formState.errors.title.message}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="title">How many times a week?</Label>
                <Controller
                  control={control}
                  name="desiredWeeklyFrequency"
                  defaultValue={3}
                  render={({ field }) => {
                    return (
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={String(field.value)}
                      >
                        <RadioGroupItem value="1">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">
                            Once a week
                          </span>
                          <span className="text-lg leading-none">🥱</span>
                        </RadioGroupItem>

                        <RadioGroupItem value="2">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">
                            Twice a week
                          </span>
                          <span className="text-lg leading-none">🙂</span>
                        </RadioGroupItem>

                        <RadioGroupItem value="3">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">
                            Three times a week
                          </span>
                          <span className="text-lg leading-none">😎</span>
                        </RadioGroupItem>

                        <RadioGroupItem value="4">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">
                            Four times a week
                          </span>
                          <span className="text-lg leading-none">😜</span>
                        </RadioGroupItem>

                        <RadioGroupItem value="5">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">
                            Five times a week
                          </span>
                          <span className="text-lg leading-none">🤨</span>
                        </RadioGroupItem>

                        <RadioGroupItem value="6">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">
                            Six times a week
                          </span>
                          <span className="text-lg leading-none">🤯</span>
                        </RadioGroupItem>

                        <RadioGroupItem value="7">
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">
                            Every day
                          </span>
                          <span className="text-lg leading-none">🔥</span>
                        </RadioGroupItem>
                      </RadioGroup>
                    )
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DialogClose asChild>
                <Button type="button" className="flex-1" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button className="flex-1">Create goal</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateGoal
