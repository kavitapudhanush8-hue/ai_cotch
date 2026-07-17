import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const mockAnalysis = {
  ats_score: 82,
  skills: ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS', 'Git', 'REST APIs', 'GraphQL'],
  missing_skills: ['Kubernetes', 'Terraform', 'CI/CD Pipelines', 'System Design', 'Redis'],
  education: 'B.Tech Computer Science - XYZ University (2020-2024)',
  experience: '2 years as Full Stack Developer',
  suggestions: [
    'Add quantifiable achievements (e.g., "Reduced API response time by 40%").',
    'Include a dedicated "Projects" section with GitHub links.',
    'Add certifications like AWS Solutions Architect or similar.',
    'Use action verbs like "Architected", "Optimized", "Implemented" instead of "Worked on".',
    'Mention specific technologies used in each project/role.'
  ]
}

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<typeof mockAnalysis | null>(null)
  const navigate = useNavigate()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    setResult(mockAnalysis)
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="flex h-16 items-center justify-between border-b border-white/5 px-6 bg-card">
        <h1 className="text-lg font-bold gradient-text">AI Interview Coach</h1>
        <button onClick={() => navigate('/dashboard')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to Dashboard
        </button>
      </header>
      <main className="flex-1 p-8 max-w-4xl mx-auto w-full space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-3xl font-bold">Upload <span className="gradient-text">Resume</span></h2>
          <p className="text-muted-foreground mt-2">Upload your PDF resume for AI-powered ATS analysis and personalized interview preparation.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl glass p-8">
          <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-purple-500/30 transition-colors">
            <div className="text-4xl mb-4">📄</div>
            <p className="text-sm text-muted-foreground mb-4">Drag & drop your PDF resume here, or click to browse</p>
            <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" id="file-upload" />
            <label htmlFor="file-upload" className="cursor-pointer inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium hover:bg-white/10 transition-all">
              Choose File
            </label>
            {file && <p className="text-sm text-purple-400 mt-3 font-medium">✓ {file.name}</p>}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUpload}
            disabled={!file || loading}
            className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Analyzing with AI...
              </span>
            ) : 'Analyze Resume'}
          </motion.button>
        </motion.div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            <h3 className="text-2xl font-bold">Analysis <span className="gradient-text">Results</span></h3>
            
            {/* ATS Score */}
            <div className="rounded-xl glass p-6 flex items-center gap-6">
              <div className="relative flex items-center justify-center w-28 h-28 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="transparent" stroke="url(#scoreGrad)" strokeWidth="8" strokeDasharray={264} strokeDashoffset={264 - (264 * result.ats_score) / 100} strokeLinecap="round" />
                  <defs><linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7c3aed" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs>
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-bold">{result.ats_score}</span>
                  <span className="text-[10px] text-muted-foreground">/ 100</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg">ATS Compatibility Score</h4>
                <p className="text-sm text-muted-foreground mt-1">Your resume scores well for automated tracking systems. A few optimizations can push it above 90.</p>
              </div>
            </div>

            {/* Education & Experience */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl glass p-5">
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">🎓 Education</h4>
                <p className="text-sm font-medium">{result.education}</p>
              </div>
              <div className="rounded-xl glass p-5">
                <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">💼 Experience</h4>
                <p className="text-sm font-medium">{result.experience}</p>
              </div>
            </div>

            {/* Skills */}
            <div className="rounded-xl glass p-6">
              <h4 className="font-semibold mb-3">✅ Identified Skills</h4>
              <div className="flex flex-wrap gap-2">
                {result.skills.map((skill, i) => (
                  <span key={i} className="inline-flex items-center rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-xs font-medium text-purple-300">{skill}</span>
                ))}
              </div>
            </div>
            
            {/* Missing Skills */}
            <div className="rounded-xl glass p-6">
              <h4 className="font-semibold mb-3 text-amber-400">⚠️ Missing Skills (Recommended)</h4>
              <div className="flex flex-wrap gap-2">
                {result.missing_skills.map((skill, i) => (
                  <span key={i} className="inline-flex items-center rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-medium text-amber-300">{skill}</span>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div className="rounded-xl glass p-6">
              <h4 className="font-semibold mb-3">💡 AI Improvement Suggestions</h4>
              <ul className="space-y-3">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="text-cyan-400 mt-0.5 text-xs">●</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end pt-4">
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/interview-setup')}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all"
              >
                Proceed to Interview Setup →
              </motion.button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
