import { forwardRef } from 'react'
import { type VariantProps, tv } from 'tailwind-variants'

import { cn } from '@/lib/utils'

const button = tv({
  base: 'flex items-center justify-center gap-2 rounded-lg text-sm font-medium leading-none tracking-tight outline-none ring-offset-2 ring-offset-black focus-visible:ring-2',

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },

  variants: {
    variant: {
      primary:
        'bg-violet-500 text-violet-50 hover:bg-violet-600 ring-violet-500',
      secondary: 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 ring-zinc-900',
      outline:
        'rounded-full border border-dashed border-zinc-800 text-sm text-zinc-300 hover:border-zinc-700 disabled:opacity-50 disabled:pointer-events-none focus-visible:border-pink-500 ring-pink-500/10 focus-visible:ring-4',
    },

    size: {
      md: 'px-4 py-2.5',
      sm: 'px-3 py-1.5',
    },
  },
})

const Button = forwardRef<
  React.ElementRef<'button'>,
  React.ComponentPropsWithoutRef<'button'> & VariantProps<typeof button>
>(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className={cn(button({ size, variant }), className)}
    />
  )
})
Button.displayName = 'Button'

export default Button
