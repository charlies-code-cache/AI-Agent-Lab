import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Help from './pages/Help.jsx'
import Support from './pages/Support.jsx'
import NotFound from './pages/NotFound.jsx'

// Lab 4 had three HTML files (index, help, support). Each is now a page component,
// rendered at its own path inside the shared Layout (skip link, header, footer).
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="help" element={<Help />} />
        <Route path="support" element={<Support />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
