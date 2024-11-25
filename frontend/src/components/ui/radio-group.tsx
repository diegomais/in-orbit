import {
  RadioGroup as Group,
  RadioGroupItem as GroupItem,
} from '@radix-ui/react-radio-group'
import { CheckCircle2, Circle } from 'lucide-react'
import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

export const RadioGroup = forwardRef<
  React.ElementRef<typeof Group>,
  React.ComponentPropsWithoutRef<typeof Group>
>(({ className, ...props }, forwardedRef) => {
  return (
    <Group
      {...props}
      className={cn('flex flex-col gap-2', className)}
      ref={forwardedRef}
    />
  )
})

export const RadioGroupItem = forwardRef<
  React.ElementRef<typeof GroupItem>,
  React.ComponentPropsWithoutRef<typeof GroupItem>
>(({ className, ...props }, forwardedRef) => {
  return (
    <GroupItem
      {...props}
      className={cn(
        'group bg-black border border-zinc-900 rounded-lg px-4 py-2.5 flex items-center justify-between outline-none hover:border-zinc-800 focus-visible:border-pink-500 focus-visible:ring-4 ring-pink-500/10 data-[state=checked]:bg-pink-500/5 data-[state=checked]:border-pink-500',
        className
      )}
      ref={forwardedRef}
    />
  )
})

export const RadioGroupIndicator = forwardRef<
  React.ElementRef<'span'>,
  React.ComponentPropsWithoutRef<'span'>
>(({ className, ...props }, forwardedRef) => {
  return (
    <span {...props} className={className} ref={forwardedRef}>
      <Circle className="size-4 text-zinc-600 group-data-[state=checked]:hidden" />
      <CheckCircle2 className="size-4 text-pink-500 hidden group-data-[state=checked]:inline" />
    </span>
  )
})
