import { useState } from 'react'
import { Header } from './components/Header'
import { ToDoList } from './components/ToDoList'

import styles from './App.module.css'
import './global.css'

function App() {
  return (
    <div className="App">
      <Header />
      <div className={styles.wrapper}>
        <ToDoList />
      </div>
    </div>
  )
}

export default App
