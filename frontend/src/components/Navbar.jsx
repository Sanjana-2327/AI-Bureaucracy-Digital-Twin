import React from 'react'

export default function Navbar() {
  return (
    <header className="h-14 bg-ink-950 border-b border-ink-800 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-3">
        {/* Ashoka Chakra inspired icon */}
        <div className="w-8 h-8 rounded-full border-2 border-saffron-500 flex items-center justify-center relative">
          <div className="w-1 h-1 rounded-full bg-saffron-500"></div>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-2.5 bg-saffron-500 origin-bottom"
              style={{
                transform: `rotate(${i * 45}deg) translateX(-50%)`,
                left: '50%',
                bottom: '50%',
              }}
            />
          ))}
        </div>
        <div>
          <h1 className="font-display text-sm font-bold text-white tracking-wide leading-none">
            AI Bureaucracy Digital Twin
          </h1>
          <p className="text-xs text-ink-400 font-mono leading-none mt-0.5">
            India Governance Process Intelligence
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="badge bg-green-900/50 text-green-400 border border-green-800">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot"></span>
          System Active
        </span>
        <span className="text-xs text-ink-500 font-mono">v1.0.0</span>
      </div>
    </header>
  )
}
