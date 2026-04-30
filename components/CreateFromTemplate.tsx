"use client"
import React, { useMemo, useState } from 'react'
import templates, { Template } from '../templates'

type Props = { template?: Template }

export default function CreateFromTemplate({ template }: Props) {
  const [data] = useState<{ templateId?: string; values?: Record<string, string> } | null>(() => {
    if (typeof window === 'undefined') return null
    try {
      const raw = sessionStorage.getItem('invito:selectedTemplate')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  const selectedTemplate = useMemo(() => {
    if (template) return template
    if (!data?.templateId) return undefined
    return templates.find((t) => t.id === data.templateId)
  }, [template, data])

  const fields = selectedTemplate?.fields ?? []

  const [values, setValues] = useState<Record<string, string>>(() => {
    const initialValues: Record<string, string> = {}
    fields.forEach((f) => {
      initialValues[f.name] = data?.values?.[f.name] ?? ''
    })
    return initialValues
  })

  if (!selectedTemplate) {
    return <div className="p-6">No template selected.</div>
  }
  const selectedTemplateId = selectedTemplate.id

  function onChange(name: string, v: string) {
    setValues((s) => {
      const next = { ...s, [name]: v }
      try {
        const payload = { templateId: selectedTemplateId, values: next }
        sessionStorage.setItem('invito:selectedTemplate', JSON.stringify(payload))
      } catch {
        // ignore
      }
      return next
    })
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Create Invitation</h2>
      <div className="space-y-4 max-w-md">
        {fields.map((f) => (
          <div key={f.name}>
            <label className="block text-sm text-slate-700 mb-1">{f.label}</label>
            <input
              value={values[f.name] ?? ''}
              onChange={(e) => onChange(f.name, e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        ))}

        <div>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded">Save & Continue</button>
        </div>
      </div>
    </div>
  )
}
