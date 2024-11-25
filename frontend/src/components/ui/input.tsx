import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

const Input = forwardRef<
  React.ElementRef<'input'>,
  React.ComponentPropsWithoutRef<'input'>
>(({ className, ...props }, ref) => {
  return (
    <input
      {...props}
      className={cn(
        'px-4 h-12 bg-black border border-zinc-900 rounded-lg placeholder-zinc-400 outline-none text-sm hover:border-zinc-800 focus-visible:border-pink-500 focus-visible:ring-4 ring-pink-500/10',
        className
      )}
      ref={ref}
    />
  )
})
Input.displayName = 'Input'

export default Input
