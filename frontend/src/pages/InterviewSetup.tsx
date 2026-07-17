import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const difficultyOptions = [
  { value: 'Beginner', label: 'Beginner / Junior', desc: 'Entry-level questions, fundamental concepts', icon: '🌱' },
  { value: 'Intermediate', label: 'Intermediate / Mid-level', desc: 'System design basics, real-world scenarios', icon: '⚡' },
  { value: 'Advanced', label: 'Advanced / Senior', desc: 'Architecture, scalability, leadership', icon: '🔥' },
]

const focusAreas = [
  'React', 'TypeScript', 'Python', 'System Design', 'Data Structures',
  'Algorithms', 'Node.js', 'SQL', 'AWS', 'Docker', 'Kubernetes', 'REST APIs',
  'GraphQL', 'Machine Learning', 'CI/CD', 'Microservices'
]

export default function InterviewSetup() {
  const [roleTitle, setRoleTitle] = useState('Software Engineer')
  const [difficulty, setDifficulty] = useState('Intermediate')
  const [selectedFocus, setSelectedFocus] = useState<string[]>(['React', 'Python', 'System Design'])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const toggleFocus = (item: string) => {
    setSelectedFocus((prev) =>
      prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item]
    )
  }

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate AI generating questions
    await new Promise(resolve => setTimeout(resolve, 1800))
    // Navigate to the interview room with a demo ID
    navigate('/interview-room/demo-001')
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-15%] right-[-5%] w-[600px] h-[600px] bg-purple-600/8 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-5%] w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[128px] pointer-events-none" />

      <header className="flex h-16 items-center justify-between border-b border-white/5 px-6 bg-card/50 backdrop-blur-md z-10">
        <h1 className="text-lg font-bold gradient-text">AI Interview Coach</h1>
        <button onClick={() => navigate('/resume-upload')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back
        </button>
      </header>

      <main className="flex-1 p-8 max-w-3xl mx-auto w-full space-y-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-3xl font-bold">Configure <span className="gradient-text">Interview</span></h2>
          <p className="text-muted-foreground mt-2">Customize the parameters of your AI mock interview session.</p>
        </motion.div>

        <form onSubmit={handleSetup} className="space-y-8">
          {/* Role Title */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl glass p-6 space-y-4">
            <label className="text-sm font-semibold text-foreground/80 uppercase tracking-wider" htmlFor="roleTitle">🎯 Target Role</label>
            <input
              className="flex h-12 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-base text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              id="roleTitle"
              required
              type="text"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              placeholder="e.g., Senior React Developer"
            />
          </motion.div>

          {/* Difficulty */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl glass p-6 space-y-4">
            <label className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">🎚️ Difficulty Level</label>
            <div className="grid gap-3 md:grid-cols-3">
              {difficultyOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setDifficulty(opt.value)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    difficulty === opt.value
                      ? 'border-purple-500/50 bg-purple-500/10 shadow-lg shadow-purple-500/10'
                      : 'border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="text-2xl mb-2">{opt.icon}</div>
                  <div className="font-semibold text-sm">{opt.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Technical Focus */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-xl glass p-6 space-y-4">
            <label className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">🧠 Technical Focus Areas</label>
            <p className="text-xs text-muted-foreground">Select topics you want to be tested on</p>
            <div className="flex flex-wrap gap-2">
              {focusAreas.map((area) => (
                <button
                  key={area}
                  type="button"
                  onClick={() => toggleFocus(area)}
                  className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                    selectedFocus.includes(area)
                      ? 'bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 text-purple-300 shadow-sm shadow-purple-500/10'
                      : 'bg-white/[0.03] border border-white/5 text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {selectedFocus.includes(area) && <span className="mr-1.5">✓</span>}
                  {area}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Interview Preview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-xl glass p-6">
            <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wider mb-4">📋 Interview Summary</h3>
            <div className="grid gap-3 md:grid-cols-3 text-sm">
              <div className="bg-white/[0.02] rounded-lg p-3">
                <span className="text-muted-foreground text-xs">Role</span>
                <p className="font-medium mt-1">{roleTitle || '—'}</p>
              </div>
              <div className="bg-white/[0.02] rounded-lg p-3">
                <span className="text-muted-foreground text-xs">Difficulty</span>
                <p className="font-medium mt-1">{difficulty}</p>
              </div>
              <div className="bg-white/[0.02] rounded-lg p-3">
                <span className="text-muted-foreground text-xs">Focus Areas</span>
                <p className="font-medium mt-1">{selectedFocus.length} selected</p>
              </div>
            </div>
          </motion.div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-all hover:shadow-purple-500/40 disabled:opacity-50"
            disabled={loading || selectedFocus.length === 0}
            type="submit"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Generating AI Interview...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                🎙️ Start Interview
              </span>
            )}
          </motion.button>
        </form>
      </main>
    </div>
  )
}
