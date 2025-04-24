import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="mb-8 text-center">
        <div className="flex justify-center space-x-4">
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="h-16 w-16 hover:scale-110 transition-transform" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="h-16 w-16 hover:scale-110 transition-transform" alt="React logo" />
          </a>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-800 mt-4">Vite + React</h1>
      </header>

      <main className="bg-white shadow-md rounded-lg p-6 w-80 text-center">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Count is {count}
        </button>
        <p className="mt-4 text-gray-600">
          Edit <code className="bg-gray-200 px-1 rounded">src/App.tsx</code> and save to test HMR
        </p>
      </main>

      <footer className="mt-8 text-gray-500">
        <p>
          Click on the Vite and React logos to learn more
        </p>
      </footer>
    </div>
  )
}

export default App
