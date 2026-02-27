import React from 'react'

const STEPS = [
  "Identifying relevant government processes...",
  "Mapping regulatory requirements...",
  "Compiling document checklist...",
  "Analyzing rejection risks...",
  "Estimating timeline...",
  "Building escalation guide...",
]

export default function LoadingState() {
  const [step, setStep] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStep(s => (s + 1) % STEPS.length)
    }, 1800)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-8">
      {/* Spinning Chakra */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-saffron-500/20"></div>
        <div className="absolute inset-0 rounded-full border-2 border-t-saffron-500 animate-spin"></div>
        <div className="absolute inset-2 rounded-full border border-saffron-500/10"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-saffron-500 pulse-dot"></div>
        </div>
      </div>

      <div className="text-center space-y-2">
        <h3 className="font-display font-bold text-white text-lg">
          Analyzing Your Request
        </h3>
        <p className="text-sm text-saffron-400 font-mono min-w-80 text-center transition-all">
          {STEPS[step]}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
              i === step ? 'bg-saffron-500 w-4' : i < step ? 'bg-saffron-500/40' : 'bg-ink-700'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
