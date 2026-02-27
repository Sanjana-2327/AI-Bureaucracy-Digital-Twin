import React from 'react'

const EXAMPLE_GOALS = [
  "Start a small food business in Karnataka",
  "Register an NGO in Maharashtra",
  "Apply for a construction permit in Delhi",
  "Get a trade license in Tamil Nadu",
  "Import goods through Chennai port",
  "Open a pharmacy in Gujarat",
  "Start a private school in UP",
  "Register a startup under Startup India",
]

const MODULES = [
  { icon: "⚡", label: "Process Generator", active: true },
  { icon: "📋", label: "Document Library", active: true },
  { icon: "🗺️", label: "State Navigator", active: true },
  { icon: "📊", label: "Compliance Tracker", active: true },
]

export default function Sidebar({ onExampleClick, currentGoal, activeModule, onModuleChange }) {
  return (
    <aside className="fixed left-0 top-14 bottom-0 w-64 bg-ink-950 border-r border-ink-800 overflow-y-auto flex flex-col">
      {/* Navigation */}
      <div className="p-4 border-b border-ink-800">
        <p className="text-xs font-mono text-ink-500 uppercase tracking-wider mb-3">Modules</p>
        <nav className="space-y-1">
          {MODULES.map((mod) => {
            const isCurrent = activeModule === mod.label;
            return (
              <button
                key={mod.label}
                onClick={() => mod.active && onModuleChange && onModuleChange(mod.label)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all
                  ${!mod.active
                    ? 'text-ink-400 opacity-40 cursor-not-allowed'
                    : isCurrent
                      ? 'bg-saffron-500/10 text-saffron-400 border border-saffron-500/20'
                      : 'text-ink-400 hover:text-ink-200 hover:bg-ink-800 border border-transparent'
                  }`}
                disabled={!mod.active}
              >
                <span>{mod.icon}</span>
                <span className="font-medium">{mod.label}</span>
                {isCurrent && mod.active && (
                  <span className="ml-auto badge bg-saffron-500/10 text-saffron-500 text-[10px] px-1.5 py-0.5">
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Example Queries */}
      <div className="p-4 flex-1">
        <p className="text-xs font-mono text-ink-500 uppercase tracking-wider mb-3">Quick Examples</p>
        <div className="space-y-1.5">
          {EXAMPLE_GOALS.map((goal) => (
            <button
              key={goal}
              onClick={() => onExampleClick(goal)}
              className={`w-full text-left text-xs px-3 py-2 rounded-lg border transition-all
                ${currentGoal === goal
                  ? 'bg-saffron-500/10 border-saffron-500/30 text-saffron-300'
                  : 'border-ink-800 text-ink-400 hover:border-ink-600 hover:text-ink-200 hover:bg-ink-900'
                }`}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-ink-800">
        <div className="bg-ink-900 rounded-lg p-3 border border-ink-700">
          <p className="text-xs text-ink-400 leading-relaxed">
            <span className="text-saffron-400 font-medium">Powered by Groq</span>
            <br />
            LLaMA 3 70B · Fast inference
          </p>
        </div>
      </div>
    </aside>
  )
}
