import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import TabLayout from './components/TabLayout'
import Home from './pages/Home'
import List from './pages/List'
import Profile from './pages/Profile'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<TabLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
