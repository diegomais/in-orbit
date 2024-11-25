import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

const Label = forwardRef<
  React.ElementRef<'label'>,
  React.ComponentPropsWithoutRef<'label'>
>(({ className, ...props }, ref) => {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: This is a custom label component
    <label
      {...props}
      className={cn(
        'font-medium text-sm tracking-tight leading-normal',
        className
      )}
      ref={ref}
    />
  )
})
Label.displayName = 'Label'

export default Label
