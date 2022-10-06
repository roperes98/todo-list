import { Trash } from 'phosphor-react'
import styles from './ToDoListItem.module.css'

interface ToDoListItemProps {
  id: string;
  content: string;
  isDone: boolean;
  onDeleteTask: (id: string) => void;
  onToggleTask: (id: string) => void;
}

export function ToDoListItem({ id, content, isDone, onToggleTask, onDeleteTask }: ToDoListItemProps) {
  function handleToggleTask() {
    onToggleTask(id)
  }

  function handleDeleteTask() {
    onDeleteTask(id)
  }

  return (
    <div className={styles.container}>
      <input type="checkbox" checked={isDone} onChange={handleToggleTask} />
      <p>{content}</p>
      <button onClick={handleDeleteTask}>
        <Trash size={24} />
      </button>
    </div>
  )
}