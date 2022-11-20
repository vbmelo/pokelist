import { useState } from 'react'

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './App.module.css'

// Components
import Home from './pages/Home/Home';

// App
export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={styles.app}> 
      <Home/>
    </div>
  )
}
