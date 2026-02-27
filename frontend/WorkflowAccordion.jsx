import React, { useState } from 'react'

function StageCard({ stage, index, isOpen, onToggle }) {
  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${isOpen ? 'border-saffron-500/30' : 'border-ink-700'}`}>
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-4 p-4 text-left transition-all
          ${isOpen ? 'bg-saffron-500/5' : 'bg-ink-900 hover:bg-ink-800'}`}
      >
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold font-mono
          ${isOpen ? 'bg-saffron-500 text-white' : 'bg-ink-800 text-ink-400'}`}>
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-sm ${isOpen ? 'text-saffron-300' : 'text-ink-100'}`}>
            {stage.stage}
          </p>
          {!isOpen && (
            <p className="text-xs text-ink-500 mt-0.5 truncate">{stage.description}</p>
          )}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="badge bg-ink-800 text-ink-400 font-mono text-[11px]">
            ⏱ {stage.estimated_time}
          </span>
          <svg
            className={`w-4 h-4 text-ink-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="p-4 pt-0 bg-saffron-500/5 border-t border-saffron-500/10 space-y-4">
          <p className="text-sm text-ink-300 leading-relaxed pt-4">{stage.description}</p>

          <div className="grid grid-cols-2 gap-4">
            {stage.documents_required?.length > 0 && (
              <div>
                <p className="text-xs font-mono text-ink-500 uppercase tracking-wider mb-2">
                  Documents Required
                </p>
                <ul className="space-y-1">
                  {stage.documents_required.map((doc, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-ink-300">
                      <span className="text-saffron-500 mt-0.5 flex-shrink-0">◆</span>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <p className="text-xs font-mono text-ink-500 uppercase tracking-wider mb-2">
                Approval Authority
              </p>
              <p className="text-xs text-ink-300 bg-ink-900 rounded-lg p-2.5 border border-ink-700">
                {stage.approval_dependency || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function WorkflowAccordion({ workflow }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="space-y-2">
      {workflow.map((stage, index) => (
        <StageCard
          key={index}
          stage={stage}
          index={index}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
        />
      ))}
    </div>
  )
}
