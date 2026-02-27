import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import SearchBar from './components/SearchBar'
import ResultDashboard from './components/ResultDashboard'
import LoadingState from './components/LoadingState'
import EmptyState from './components/EmptyState'
import { generateProcess } from './api/index'

export default function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentGoal, setCurrentGoal] = useState('')

  const handleSubmit = async (goal) => {
    setLoading(true)
    setError(null)
    setResult(null)
    setCurrentGoal(goal)

    try {
      const data = await generateProcess(goal)
      if (data.error) {
        setError(data.error)
      } else {
        setResult(data)
      }
    } catch (err) {
      if (err.code === 'ECONNREFUSED' || err.message?.includes('Network Error')) {
        setError('Cannot connect to the backend server. Make sure it is running on http://localhost:8000.')
      } else {
        setError(err.response?.data?.detail || 'An error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleExampleClick = (goal) => {
    handleSubmit(goal)
  }

  return (
    <div className="min-h-screen bg-ink-950">
      <Navbar />

      <div className="flex pt-14">
        {/* Sidebar */}
        <Sidebar onExampleClick={handleExampleClick} currentGoal={currentGoal} />

        {/* Main Content */}
        <main className="ml-64 flex-1 min-h-[calc(100vh-3.5rem)] flex flex-col">
          {/* Disclaimer Banner */}
          <div className="bg-amber-900/20 border-b border-amber-700/30 px-6 py-2.5 flex items-center gap-2">
            <span className="text-amber-400 text-sm">⚠️</span>
            <p className="text-xs text-amber-300/80 font-mono">
              <strong className="text-amber-300">Disclaimer:</strong> This system provides informational guidance only.
              Always verify with official government portals. <strong className="text-amber-300">Not legal advice.</strong>
            </p>
          </div>

          <div className="flex-1 p-6 max-w-5xl w-full mx-auto">
            {/* Search Section */}
            <div className="mb-8">
              <div className="mb-2">
                <h2 className="font-display font-bold text-white text-xl">
                  Governance Process Intelligence
                </h2>
                <p className="text-xs text-ink-500 mt-1">
                  Describe your goal and get a complete procedural roadmap for Indian government processes
                </p>
              </div>
              <div className="mt-4">
                <SearchBar onSubmit={handleSubmit} loading={loading} />
              </div>
            </div>

            {/* Content Area */}
            {loading && <LoadingState />}

            {!loading && error && (
              <div className="card border-red-800/50 bg-red-950/20">
                <div className="flex items-start gap-3">
                  <span className="text-red-400 text-xl">✕</span>
                  <div>
                    <p className="font-semibold text-red-300 text-sm">Error</p>
                    <p className="text-red-400/80 text-sm mt-1">{error}</p>
                    <button
                      onClick={() => currentGoal && handleSubmit(currentGoal)}
                      className="mt-3 px-4 py-1.5 bg-red-900/50 hover:bg-red-900 border border-red-800 
                        text-red-300 text-xs rounded-lg transition-all"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!loading && !error && result && (
              <ResultDashboard data={result} goal={currentGoal} />
            )}

            {!loading && !error && !result && <EmptyState />}
          </div>

          {/* Footer */}
          <footer className="border-t border-ink-800 px-6 py-3 flex items-center justify-between">
            <p className="text-xs text-ink-600 font-mono">
              AI Bureaucracy Digital Twin · India Governance Process Intelligence
            </p>
            <p className="text-xs text-ink-600 font-mono">
              Data not stored · Informational only
            </p>
          </footer>
        </main>
      </div>
    </div>
  )
}
