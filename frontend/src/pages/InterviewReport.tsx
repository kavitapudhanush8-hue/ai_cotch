import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts'

const overallScore = 86

const radarData = [
  { subject: 'Technical', score: 92 },
  { subject: 'Communication', score: 78 },
  { subject: 'Confidence', score: 85 },
  { subject: 'Eye Contact', score: 80 },
  { subject: 'Grammar', score: 94 },
  { subject: 'Body Language', score: 72 },
]

const barData = [
  { name: 'Resume', score: 88, color: '#7c3aed' },
  { name: 'ATS', score: 91, color: '#8b5cf6' },
  { name: 'Confidence', score: 85, color: '#06b6d4' },
  { name: 'Technical', score: 92, color: '#10b981' },
  { name: 'Grammar', score: 94, color: '#22d3ee' },
  { name: 'Eye Contact', score: 80, color: '#f59e0b' },
  { name: 'Emotion', score: 84, color: '#ec4899' },
]

const questionResults = [
  { q: 'Tell me about yourself and your experience.', score: 90, feedback: 'Excellent structured response using the STAR method. Clear and concise.' },
  { q: 'Explain useMemo vs useCallback in React.', score: 95, feedback: 'Demonstrated deep technical understanding with practical examples.' },
  { q: 'Design a scalable notification system.', score: 78, feedback: 'Good high-level design. Could improve on discussing specific technologies and trade-offs.' },
  { q: 'Describe a challenging bug you resolved.', score: 88, feedback: 'Great storytelling. Clear problem-solution structure with measurable impact.' },
  { q: 'Key principles of RESTful API design.', score: 92, feedback: 'Comprehensive coverage of REST principles including HATEOAS and idempotency.' },
]

const strengths = [
  'Excellent technical depth when explaining React Virtual DOM and hooks.',
  'Maintained strong eye contact throughout the session (avg 80%).',
  'Structured answers well using the STAR method for behavioral questions.',
  'Grammar and vocabulary usage was above average (94/100).',
]

const improvements = [
  'Speaking pace was slightly fast (avg 142 wpm). Aim for 120-130 wpm.',
  'Used filler words ("um", "like") 12 times during the system design question.',
  'Body language showed slight tension - try relaxing shoulders.',
  'Could provide more specific metrics when discussing project impact.',
]

const learningResources = [
  { title: 'System Design Primer', type: 'GitHub', link: '#', icon: '📚' },
  { title: 'Mastering the Interview', type: 'Video Course', link: '#', icon: '🎥' },
  { title: 'STAR Method Deep Dive', type: 'Article', link: '#', icon: '📝' },
  { title: 'Body Language in Interviews', type: 'Workshop', link: '#', icon: '🧘' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function InterviewReport() {
  const navigate = useNavigate()

  const getScoreColor = (s: number) => s >= 85 ? 'text-green-400' : s >= 70 ? 'text-amber-400' : 'text-red-400'
  const getScoreBg = (s: number) => s >= 85 ? 'bg-green-500/10 border-green-500/20' : s >= 70 ? 'bg-amber-500/10 border-amber-500/20' : 'bg-red-500/10 border-red-500/20'

  return (
    <div className="flex min-h-screen w-full flex-col bg-background relative overflow-x-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[128px] pointer-events-none" />

      <header className="flex h-16 items-center justify-between border-b border-white/5 px-6 bg-card/50 backdrop-blur-md sticky top-0 z-20">
        <h1 className="text-lg font-bold gradient-text">AI Interview Coach</h1>
        <button onClick={() => navigate('/dashboard')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to Dashboard
        </button>
      </header>

      <main className="flex-1 p-8 max-w-5xl mx-auto w-full relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">

          {/* Hero Section */}
          <motion.div variants={itemVariants} className="text-center py-6">
            <h2 className="text-4xl font-bold">Interview <span className="gradient-text">Report</span></h2>
            <p className="text-muted-foreground mt-2">Your comprehensive AI-powered interview performance analysis</p>
          </motion.div>

          {/* Overall Score Card */}
          <motion.div variants={itemVariants} className="rounded-2xl glass p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="relative flex items-center justify-center w-40 h-40 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="42"
                  fill="transparent"
                  stroke="url(#reportGrad)"
                  strokeWidth="8"
                  strokeDasharray={264}
                  strokeDashoffset={264 - (264 * overallScore) / 100}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="reportGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-bold">{overallScore}</span>
                <span className="text-xs text-muted-foreground">/ 100</span>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold">Excellent Performance! 🎉</h3>
              <p className="text-muted-foreground mt-2 max-w-md">You scored in the top 15% of all candidates. Your technical knowledge is strong, with room to improve communication pacing and body language.</p>
              <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                <span className="inline-flex items-center rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1 text-xs font-medium text-green-400">Top 15%</span>
                <span className="inline-flex items-center rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-xs font-medium text-purple-400">8 Questions</span>
                <span className="inline-flex items-center rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 text-xs font-medium text-cyan-400">12:34 Duration</span>
              </div>
            </div>
          </motion.div>

          {/* Score Breakdown Cards */}
          <motion.div variants={itemVariants} className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
            {barData.map((item) => (
              <div key={item.name} className={`rounded-xl border p-4 text-center ${getScoreBg(item.score)}`}>
                <p className="text-xs text-muted-foreground mb-1">{item.name}</p>
                <p className={`text-2xl font-bold ${getScoreColor(item.score)}`}>{item.score}</p>
              </div>
            ))}
          </motion.div>

          {/* Charts Row */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Radar Chart */}
            <motion.div variants={itemVariants} className="rounded-xl glass p-6">
              <h3 className="font-semibold text-lg mb-4">📊 Skills Radar</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} />
                  <Radar name="Score" dataKey="score" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.3} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Bar Chart */}
            <motion.div variants={itemVariants} className="rounded-xl glass p-6">
              <h3 className="font-semibold text-lg mb-4">📈 Score Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  />
                  <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                    {barData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Strengths & Improvements */}
          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div variants={itemVariants} className="rounded-xl glass p-6">
              <h3 className="font-semibold text-lg mb-4 text-green-400">✅ Strengths</h3>
              <ul className="space-y-3">
                {strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="text-green-400 mt-0.5 flex-shrink-0">●</span>
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-xl glass p-6">
              <h3 className="font-semibold text-lg mb-4 text-amber-400">⚠️ Areas for Improvement</h3>
              <ul className="space-y-3">
                {improvements.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="text-amber-400 mt-0.5 flex-shrink-0">●</span>
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Question-by-Question Results */}
          <motion.div variants={itemVariants} className="rounded-xl glass p-6">
            <h3 className="font-semibold text-lg mb-4">🎯 Question-by-Question Analysis</h3>
            <div className="space-y-4">
              {questionResults.map((item, i) => (
                <div key={i} className="bg-white/[0.02] rounded-lg p-4 border border-white/5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.q}</p>
                      <p className="text-xs text-muted-foreground mt-1.5">{item.feedback}</p>
                    </div>
                    <span className={`text-lg font-bold flex-shrink-0 ${getScoreColor(item.score)}`}>
                      {item.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Learning Resources */}
          <motion.div variants={itemVariants} className="rounded-xl glass p-6">
            <h3 className="font-semibold text-lg mb-4">📚 Recommended Learning Path</h3>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {learningResources.map((r, i) => (
                <div key={i} className="bg-white/[0.02] rounded-lg p-4 border border-white/5 hover:bg-white/[0.04] hover:border-purple-500/20 transition-all cursor-pointer group">
                  <div className="text-2xl mb-2">{r.icon}</div>
                  <p className="text-sm font-medium group-hover:text-purple-300 transition-colors">{r.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{r.type}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4 pt-4 pb-8">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium hover:bg-white/10 transition-all"
            >
              📥 Download PDF Report
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/resume-upload')}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all"
            >
              🔄 Practice Again
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium hover:bg-white/10 transition-all"
            >
              📊 View Dashboard
            </motion.button>
          </motion.div>

        </motion.div>
      </main>
    </div>
  )
}
