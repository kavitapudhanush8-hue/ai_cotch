import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ResumeUpload from './pages/ResumeUpload'
import InterviewSetup from './pages/InterviewSetup'
import InterviewRoom from './pages/InterviewRoom'
import InterviewReport from './pages/InterviewReport'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }
  return <>{children}</>
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/resume-upload"
            element={
              <PrivateRoute>
                <ResumeUpload />
              </PrivateRoute>
            }
          />
          <Route
            path="/interview-setup"
            element={
              <PrivateRoute>
                <InterviewSetup />
              </PrivateRoute>
            }
          />
          <Route
            path="/interview-room/:id"
            element={
              <PrivateRoute>
                <InterviewRoom />
              </PrivateRoute>
            }
          />
          <Route
            path="/interview-report/:id"
            element={
              <PrivateRoute>
                <InterviewReport />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
