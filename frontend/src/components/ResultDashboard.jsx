import React from 'react'
import WorkflowAccordion from './WorkflowAccordion'

function SectionHeader({ icon, title, tag }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2.5">
        <span className="text-lg">{icon}</span>
        <h3 className="font-display font-bold text-white text-base">{title}</h3>
      </div>
      {tag && (
        <span className="badge bg-ink-800 text-ink-400 text-[11px] font-mono border border-ink-700">
          {tag}
        </span>
      )}
    </div>
  )
}

export default function ResultDashboard({ data, goal }) {
  return (
    <div className="space-y-6 fade-in">
      {/* Goal Header */}
      <div className="card border-saffron-500/20 bg-gradient-to-br from-saffron-500/5 to-transparent">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-saffron-500/10 border border-saffron-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-xl">🎯</span>
          </div>
          <div>
            <p className="text-xs font-mono text-saffron-400/70 uppercase tracking-wider mb-1">
              Your Goal
            </p>
            <p className="text-ink-200 font-medium">{goal}</p>
          </div>
        </div>
      </div>

      {/* Process Overview */}
      <div className="card">
        <SectionHeader icon="🏛️" title="Process Overview" tag="AI Generated" />
        <p className="text-ink-300 text-sm leading-relaxed">{data.process_overview}</p>

        <div className="mt-4 flex items-center gap-4 pt-4 border-t border-ink-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-ink-500">Total Timeline:</span>
            <span className="badge bg-blue-900/50 text-blue-300 border border-blue-800/50 font-mono text-xs">
              ⏱ {data.timeline_estimation}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-ink-500">Stages:</span>
            <span className="badge bg-ink-800 text-ink-300 font-mono text-xs">
              {data.workflow?.length || 0} steps
            </span>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Documents Checklist */}
        <div className="card">
          <SectionHeader icon="📋" title="Documents Checklist" tag={`${data.required_documents_checklist?.length || 0} items`} />
          <ul className="space-y-2">
            {data.required_documents_checklist?.map((doc, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded border-2 border-ink-600 flex-shrink-0 mt-0.5 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-sm bg-ink-600"></div>
                </div>
                <span className="text-sm text-ink-300 leading-relaxed">{doc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Risk Warnings */}
        <div className="card border-red-900/50 bg-red-950/20">
          <SectionHeader icon="⚠️" title="Risk Warnings" tag={`${data.risk_warnings?.length || 0} risks`} />
          <ul className="space-y-2.5">
            {data.risk_warnings?.map((risk, i) => (
              <li key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-red-900/20 border border-red-900/30">
                <span className="text-red-400 text-xs mt-0.5 flex-shrink-0">⚠</span>
                <span className="text-sm text-red-200 leading-relaxed">{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Workflow */}
      <div className="card">
        <SectionHeader icon="🔄" title="Step-by-Step Workflow" />
        <WorkflowAccordion workflow={data.workflow || []} />
      </div>

      {/* Escalation + Official Reference */}
      <div className="grid grid-cols-2 gap-6">
        <div className="card border-yellow-900/30 bg-yellow-950/10">
          <SectionHeader icon="📣" title="Escalation Path" />
          <p className="text-sm text-yellow-200/80 leading-relaxed whitespace-pre-line">
            {data.escalation_path}
          </p>
        </div>

        <div className="card border-blue-900/30 bg-blue-950/10">
          <SectionHeader icon="📖" title="Official References" />
          <p className="text-sm text-blue-200/80 leading-relaxed whitespace-pre-line">
            {data.official_reference_note}
          </p>
        </div>
      </div>
    </div>
  )
}
