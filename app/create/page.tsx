import React from 'react'
import templates from '@/templates'
import CreateFromTemplate from '@/components/CreateFromTemplate'

export default function Page({ searchParams }: { searchParams?: { template?: string } }) {
  const id = searchParams?.template
  const template = id ? templates.find((t) => t.id === id) : undefined

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <CreateFromTemplate template={template} />
      </div>
    </div>
  )
}
