import React, { useState } from 'react'

export default function SearchBar({ onSubmit, loading }) {
  const [goal, setGoal] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (goal.trim() && !loading) {
      onSubmit(goal.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-500">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Describe your goal, e.g. &quot;I want to start a small food business in Karnataka&quot;"
          className="w-full bg-ink-900 border border-ink-700 rounded-xl pl-11 pr-36 py-4 text-sm text-ink-100
            placeholder-ink-500 focus:outline-none focus:border-saffron-500/60 focus:ring-1 focus:ring-saffron-500/20
            transition-all font-sans"
          disabled={loading}
          maxLength={500}
        />
        <button
          type="submit"
          disabled={!goal.trim() || loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-saffron-500 hover:bg-saffron-400
            disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg
            transition-all flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Analyzing...
            </>
          ) : (
            <>
              Generate
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  )
}
