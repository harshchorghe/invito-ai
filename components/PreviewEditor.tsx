"use client"
import React, { useState } from 'react'
import { Template } from '../templates'
import { useRouter } from 'next/navigation'

type Props = { template: Template }

export default function PreviewEditor({ template }: Props) {
  const router = useRouter()
  const initial: Record<string, string> = {}
  template.fields.forEach((f) => (initial[f.name] = ''))

  const [values, setValues] = useState<Record<string, string>>(initial)

  function onChange(name: string, v: string) {
    setValues((s) => ({ ...s, [name]: v }))
  }

  function useTemplate() {
    try {
      const payload = { templateId: template.id, values }
      sessionStorage.setItem('invito:selectedTemplate', JSON.stringify(payload))
    } catch {
      // ignore
    }
    router.push(`/create?template=${template.id}`)
  }

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium mb-2">Customize (preview)</h3>
      <div className="space-y-3">
        {template.fields.map((f) => (
          <div key={f.name} className="flex flex-col">
            <label className="text-xs text-slate-600 mb-1">{f.label}</label>
            <input
              value={values[f.name]}
              onChange={(e) => onChange(f.name, e.target.value)}
              className="border rounded px-2 py-1 text-sm"
              type={f.type === 'textarea' ? 'text' : f.type}
            />
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button onClick={useTemplate} className="px-4 py-2 bg-slate-900 text-white rounded">Use this template</button>
      </div>
    </div>
  )
}
