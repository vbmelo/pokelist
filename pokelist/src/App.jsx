import { useState } from 'react'
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './App.module.css'

// Components
import Menubar from './components/Menubar'

// App
export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={styles.app}> 
      <Menubar/>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}
