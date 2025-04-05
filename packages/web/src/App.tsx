import { Routes, Route } from 'react-router-dom'
import ContactList from './components/ContactList'
import ContactForm from './components/ContactForm'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="/contactos/nuevo" element={<ContactForm />} />
          <Route path="/contactos/:id/editar" element={<ContactForm />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
