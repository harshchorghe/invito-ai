import React from 'react'
import templates from '@/templates'
import PreviewEditor from '@/components/PreviewEditor'

export default function Page({ searchParams }: { searchParams?: { template?: string } }) {
  const id = searchParams?.template
  const template = id ? templates.find((t) => t.id === id) : undefined

  if (!id || !template) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">Template not found</h2>
        <p className="mt-2 text-sm text-slate-600">Go back to the templates gallery and choose a template.</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        <div className="rounded-lg overflow-hidden border">
          <img src={template.background} alt={template.name} className="w-full h-96 object-cover" />
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: template.font }}>{template.name}</h1>
          <p className="text-sm text-slate-500 mt-2">Category: {template.category}</p>
          <PreviewEditor template={template} />
        </div>
      </div>
    </div>
  )
}
