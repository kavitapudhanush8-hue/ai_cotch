import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const radarData = [
  { subject: 'Technical', score: 88 },
  { subject: 'Communication', score: 76 },
  { subject: 'Confidence', score: 82 },
  { subject: 'Body Language', score: 70 },
  { subject: 'Grammar', score: 91 },
  { subject: 'Problem Solving', score: 85 },
]

const trendData = [
  { name: 'Interview 1', score: 62 },
  { name: 'Interview 2', score: 68 },
  { name: 'Interview 3', score: 71 },
  { name: 'Interview 4', score: 78 },
  { name: 'Interview 5', score: 85 },
  { name: 'Interview 6', score: 82 },
  { name: 'Interview 7', score: 89 },
]

const statCards = [
  { label: 'Interviews Done', value: '7', icon: '🎯', color: 'from-purple-500/20 to-purple-600/5' },
  { label: 'Resume Score', value: '82', icon: '📄', color: 'from-cyan-500/20 to-cyan-600/5' },
  { label: 'ATS Score', value: '78/100', icon: '🤖', color: 'from-green-500/20 to-green-600/5' },
  { label: 'Confidence', value: '85%', icon: '💪', color: 'from-amber-500/20 to-amber-600/5' },
]

const recentInterviews = [
  { id: 1, role: 'Senior React Developer', date: '2026-07-15', score: 89, status: 'completed' },
  { id: 2, role: 'Full Stack Engineer', date: '2026-07-12', score: 82, status: 'completed' },
  { id: 3, role: 'Backend Python Developer', date: '2026-07-10', score: 78, status: 'completed' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-card flex flex-col">
        <div className="p-6">
          <h1 className="text-lg font-bold gradient-text">AI Interview Coach</h1>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {[
            { label: 'Dashboard', icon: '📊', path: '/dashboard', active: true },
            { label: 'Upload Resume', icon: '📄', path: '/resume-upload' },
            { label: 'Start Interview', icon: '🎙️', path: '/interview-setup' },
            { label: 'Interview History', icon: '📋', path: '/dashboard' },
            { label: 'Analytics', icon: '📈', path: '/dashboard' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                item.active 
                  ? 'bg-gradient-to-r from-purple-600/20 to-transparent text-white' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
              {user?.full_name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.full_name || 'User'}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
          <button onClick={signOut} className="w-full text-xs text-muted-foreground hover:text-red-400 transition-colors text-left">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            {/* Header */}
            <motion.div variants={itemVariants} className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">Welcome back, <span className="gradient-text">{user?.full_name?.split(' ')[0] || 'User'}</span></h2>
                <p className="text-muted-foreground mt-1">Here's an overview of your interview preparation progress.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/resume-upload')}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all"
              >
                <span>+</span> New Interview
              </motion.button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {statCards.map((card) => (
                <div key={card.label} className={`rounded-xl bg-gradient-to-br ${card.color} border border-white/5 p-5`}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{card.label}</p>
                    <span className="text-2xl">{card.icon}</span>
                  </div>
                  <p className="text-3xl font-bold mt-2">{card.value}</p>
                </div>
              ))}
            </motion.div>

            {/* Charts Row */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Radar Chart */}
              <motion.div variants={itemVariants} className="rounded-xl glass p-6">
                <h3 className="font-semibold text-lg mb-4">Skills Overview</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} />
                    <Radar name="Score" dataKey="score" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.3} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Trend Chart */}
              <motion.div variants={itemVariants} className="rounded-xl glass p-6">
                <h3 className="font-semibold text-lg mb-4">Performance Trend</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
                    <YAxis domain={[50, 100]} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="score" stroke="#06b6d4" fillOpacity={1} fill="url(#colorScore)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            {/* Recent Interviews Table */}
            <motion.div variants={itemVariants} className="rounded-xl glass p-6">
              <h3 className="font-semibold text-lg mb-4">Recent Interviews</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Score</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentInterviews.map((interview) => (
                      <tr key={interview.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4 text-sm font-medium">{interview.role}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{interview.date}</td>
                        <td className="py-3 px-4">
                          <span className={`text-sm font-semibold ${interview.score >= 85 ? 'text-green-400' : interview.score >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {interview.score}%
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-400">
                            Completed
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => navigate(`/interview-report/${interview.id}`)}
                            className="text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors"
                          >
                            View Report →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
