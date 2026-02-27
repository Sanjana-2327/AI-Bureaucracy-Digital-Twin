import React from 'react'

const FEATURES = [
  { icon: "🗺️", title: "Process Roadmap", desc: "Step-by-step procedural guidance" },
  { icon: "📋", title: "Document Checklist", desc: "All required paperwork at a glance" },
  { icon: "⚠️", title: "Rejection Risks", desc: "Common pitfalls to avoid" },
  { icon: "📣", title: "Escalation Guide", desc: "What to do when things go wrong" },
]

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-10">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-xl">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-saffron-500/10 border border-saffron-500/20 flex items-center justify-center">
              <span className="text-4xl">🇮🇳</span>
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-saffron-500 flex items-center justify-center">
              <span className="text-xs">✨</span>
            </div>
          </div>
        </div>

        <h2 className="font-display font-bold text-2xl text-white">
          Navigate Indian Government Processes
        </h2>
        <p className="text-ink-400 text-sm leading-relaxed">
          Describe your goal in plain language. The AI will generate a complete procedural
          roadmap with documents, timelines, risks, and official references.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
        {FEATURES.map((f) => (
          <div key={f.title} className="card flex items-start gap-3 p-4">
            <span className="text-2xl flex-shrink-0">{f.icon}</span>
            <div>
              <p className="font-semibold text-sm text-ink-100">{f.title}</p>
              <p className="text-xs text-ink-500 mt-0.5">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-ink-600 font-mono text-center max-w-sm leading-relaxed">
        Try: "I want to start a small food business in Karnataka" or "Register an NGO in Maharashtra"
      </p>
    </div>
  )
}
