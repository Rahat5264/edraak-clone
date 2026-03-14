"use client"

import * as React from 'react'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import { Button } from './button'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
}

function CardDescription({ className, text, wordLimit = 23, children, ...props }: React.ComponentProps<'div'> & { text?: string; wordLimit?: number; children?: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false)

  if (children) {
    return (
      <div
        data-slot="card-description"
        className={cn('text-muted-foreground text-sm', className)}
        {...props}
      >
        {children}
      </div>
    )
  }

  const full = text || ''
  const words = full.trim().split(/\s+/).filter(Boolean)
  const shouldTruncate = words.length > wordLimit
  const preview = shouldTruncate ? words.slice(0, wordLimit).join(' ') + '...' : full

  return (
    <div data-slot="card-description" className={cn('text-muted-foreground text-sm', className)} {...props}>
      <p className="mb-3">{expanded || !shouldTruncate ? full : preview}</p>
      {shouldTruncate && (
        <Button size="sm" variant="outline" onClick={() => setExpanded((s) => !s)}>
          {expanded ? 'Show less' : 'Read more'}
        </Button>
      )}
    </div>
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
