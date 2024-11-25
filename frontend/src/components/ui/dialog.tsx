export { Dialog, DialogClose, DialogTrigger } from '@radix-ui/react-dialog'
import {
  Content,
  Description,
  DialogPortal,
  Overlay,
  Title,
} from '@radix-ui/react-dialog'
import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

export const DialogOverlay = forwardRef<
  React.ElementRef<typeof Overlay>,
  React.ComponentPropsWithoutRef<typeof Overlay>
>(({ className, ...props }, forwardedRef) => {
  return (
    <Overlay
      {...props}
      className={cn(
        'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm',
        className
      )}
      ref={forwardedRef}
    />
  )
})
DialogOverlay.displayName = 'DialogOverlay'

export const DialogContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, forwardedRef) => {
  return (
    <DialogPortal>
      <DialogOverlay />

      <Content
        {...props}
        className={cn(
          'fixed z-50 right-0 top-0 bottom-0 w-[400px] h-screen border-l border-zinc-900 bg-zinc-950 p-8',
          className
        )}
        ref={forwardedRef}
      />
    </DialogPortal>
  )
})
DialogContent.displayName = 'DialogContent'

export const DialogTitle = forwardRef<
  React.ElementRef<typeof Title>,
  React.ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, forwardedRef) => {
  return (
    <Title
      {...props}
      className={cn('text-lg font-semibold', className)}
      ref={forwardedRef}
    />
  )
})
DialogTitle.displayName = 'DialogTitle'

export const DialogDescription = forwardRef<
  React.ElementRef<typeof Description>,
  React.ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, forwardedRef) => {
  return (
    <Description
      {...props}
      className={cn('text-zinc-400 text-sm leading-relaxed', className)}
      ref={forwardedRef}
    />
  )
})
DialogDescription.displayName = 'DialogDescription'
