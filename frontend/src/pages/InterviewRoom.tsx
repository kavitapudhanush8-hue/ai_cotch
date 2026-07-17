import { useEffect, useRef, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const demoQuestions = [
  "Tell me about yourself and your experience with web development.",
  "Explain the difference between useMemo and useCallback in React.",
  "How would you design a scalable real-time notification system?",
  "Describe a challenging bug you encountered and how you resolved it.",
  "What are the key principles of RESTful API design?",
  "How do you approach code reviews and maintaining code quality?",
  "Explain the concept of closure in JavaScript with an example.",
  "Tell me about a time you had to learn a new technology quickly.",
]

const emotionLabels = ['😊 Confident', '😐 Neutral', '🤔 Thinking', '😊 Engaged', '😌 Calm']
const postureLabels = ['Upright', 'Good', 'Leaning', 'Centered', 'Relaxed']

export default function InterviewRoom() {
  const { id } = useParams()
  const navigate = useNavigate()

  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [cameraReady, setCameraReady] = useState(false)

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [confidenceScore, setConfidenceScore] = useState(72)
  const [eyeContact, setEyeContact] = useState(85)
  const [speakingPace, setSpeakingPace] = useState(130)
  const [emotion, setEmotion] = useState('😐 Neutral')
  const [posture, setPosture] = useState('Upright')
  const [elapsed, setElapsed] = useState(0)
  const [isRecording, setIsRecording] = useState(true)
  const [answeredCount, setAnsweredCount] = useState(0)

  // Setup Camera and Mic
  useEffect(() => {
    const startMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        setStream(mediaStream)
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
        setCameraReady(true)
      } catch (err) {
        console.error("Error accessing media devices", err)
        setCameraReady(false)
      }
    }
    startMedia()

    return () => {
      // cleanup is handled on unmount
    }
  }, [])

  // Simulate real-time metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setConfidenceScore(prev => Math.min(100, Math.max(50, prev + (Math.random() - 0.4) * 5)))
      setEyeContact(prev => Math.min(100, Math.max(40, prev + (Math.random() - 0.45) * 8)))
      setSpeakingPace(Math.floor(110 + Math.random() * 60))
      setEmotion(emotionLabels[Math.floor(Math.random() * emotionLabels.length)])
      setPosture(postureLabels[Math.floor(Math.random() * postureLabels.length)])
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60).toString().padStart(2, '0')
    const sec = (s % 60).toString().padStart(2, '0')
    return `${min}:${sec}`
  }

  const nextQuestion = useCallback(() => {
    setAnsweredCount(prev => prev + 1)
    if (currentQuestionIdx < demoQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1)
    }
  }, [currentQuestionIdx])

  const endInterview = () => {
    setIsRecording(false)
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
    }
    navigate(`/interview-report/${id}`)
  }

  const progress = ((currentQuestionIdx + 1) / demoQuestions.length) * 100

  return (
    <div className="flex h-screen w-full flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b border-white/5 px-6 bg-card/50 backdrop-blur-md flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {isRecording && <div className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />}
            <span className="text-sm font-semibold text-red-400">LIVE</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <span className="text-sm text-muted-foreground font-mono">{formatTime(elapsed)}</span>
          <div className="h-4 w-px bg-white/10" />
          <span className="text-xs text-muted-foreground">Q {currentQuestionIdx + 1}/{demoQuestions.length}</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Progress bar */}
          <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={endInterview}
            className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-1.5 text-sm font-medium text-red-400 hover:bg-red-500/20 transition-all"
          >
            End Interview
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 grid grid-cols-3 gap-4 min-h-0">
        {/* Left: Video + Question */}
        <div className="col-span-2 flex flex-col gap-4 min-h-0">
          {/* Video Feed */}
          <div className="relative rounded-xl overflow-hidden border border-white/5 bg-black flex-1 min-h-0 flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="h-full w-full object-cover transform scale-x-[-1]"
            />
            {!cameraReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-card">
                <div className="text-center space-y-3">
                  <div className="text-4xl">📷</div>
                  <p className="text-sm text-muted-foreground">Camera initializing...</p>
                </div>
              </div>
            )}
            {/* Recording indicator */}
            <div className="absolute top-3 right-3 flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">Rec</span>
            </div>
            {/* Live metrics overlay */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <div className="bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-semibold text-green-400">
                👁️ Eye: {Math.round(eyeContact)}%
              </div>
              <div className="bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-semibold text-cyan-400">
                🧘 {posture}
              </div>
            </div>
          </div>

          {/* Current Question */}
          <div className="rounded-xl glass p-5 flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Question {currentQuestionIdx + 1}</h3>
              <span className="text-xs text-muted-foreground">{demoQuestions.length - currentQuestionIdx - 1} remaining</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentQuestionIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-lg font-medium leading-relaxed"
              >
                {demoQuestions[currentQuestionIdx]}
              </motion.p>
            </AnimatePresence>
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-muted-foreground">💡 Take your time. Speak clearly and structure your answer.</p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={nextQuestion}
                disabled={currentQuestionIdx >= demoQuestions.length - 1}
                className="inline-flex items-center gap-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 px-4 py-2 text-xs font-semibold text-purple-300 hover:bg-purple-500/20 transition-all disabled:opacity-30"
              >
                Next Question →
              </motion.button>
            </div>
          </div>
        </div>

        {/* Right: Live Metrics Panel */}
        <div className="col-span-1 flex flex-col gap-4 min-h-0 overflow-y-auto">
          {/* Confidence Score */}
          <div className="rounded-xl glass p-5 flex flex-col items-center">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Live Confidence</h3>
            <div className="relative flex items-center justify-center w-32 h-32">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="42"
                  fill="transparent"
                  stroke="url(#confGrad)"
                  strokeWidth="8"
                  strokeDasharray={264}
                  strokeDashoffset={264 - (264 * Math.round(confidenceScore)) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="confGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold">{Math.round(confidenceScore)}%</span>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-3 text-center">Eye Contact • Posture • Voice</p>
          </div>

          {/* Real-time Metrics */}
          <div className="rounded-xl glass p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Real-time Metrics</h3>
            <div className="space-y-4">
              {/* Eye Contact */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-muted-foreground">👁️ Eye Contact</span>
                  <span className={`text-xs font-bold ${eyeContact > 70 ? 'text-green-400' : 'text-amber-400'}`}>
                    {Math.round(eyeContact)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${eyeContact > 70 ? 'bg-green-500' : 'bg-amber-500'}`}
                    animate={{ width: `${Math.round(eyeContact)}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>

              {/* Speaking Pace */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-muted-foreground">🗣️ Speaking Pace</span>
                  <span className={`text-xs font-bold ${speakingPace > 150 ? 'text-amber-400' : 'text-green-400'}`}>
                    {speakingPace} wpm
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${speakingPace > 150 ? 'bg-amber-500' : 'bg-green-500'}`}
                    animate={{ width: `${Math.min(100, (speakingPace / 200) * 100)}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/5 pt-3 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Emotion</span>
                  <span className="text-xs font-medium">{emotion}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Posture</span>
                  <span className={`text-xs font-medium ${posture === 'Upright' || posture === 'Good' ? 'text-green-400' : 'text-amber-400'}`}>
                    {posture}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Answered</span>
                  <span className="text-xs font-medium text-purple-400">{answeredCount}/{demoQuestions.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="rounded-xl glass p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">💡 Quick Tips</h3>
            <ul className="space-y-2 text-[11px] text-foreground/60">
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-0.5">●</span> Maintain eye contact with the camera</li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-0.5">●</span> Speak at a steady, measured pace</li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-0.5">●</span> Use the STAR method for behavioral Q&A</li>
              <li className="flex items-start gap-2"><span className="text-cyan-400 mt-0.5">●</span> Avoid filler words like "um" and "like"</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
