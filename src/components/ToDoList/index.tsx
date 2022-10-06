import { v4 as uuidv4 } from 'uuid'
import { PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import ListIcon from '../../assets/List.png'
import { ToDoListItem } from "../ToDoListItem";

import styles from './ToDoList.module.css'

const tasks = [
  {
    id: uuidv4(),
    content: 'Lavar a louça',
    isDone: false
  },
  {
    id: uuidv4(),
    content: 'Lavar a louça',
    isDone: true
  }
]

interface ToDoListItemProps {
  id: string;
  content: string;
  isDone: boolean;
}

export function ToDoList({}: ToDoListItemProps) {
  const [taskList, setTaskList] = useState<ToDoListItemProps[]>([])
  const [newTaskText, setNewTaskText] = useState('')

  const tasksNumber = taskList.length
  const completedTasksNumber = taskList.filter(task => task.isDone).length

  function handleNewTaskTextChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setNewTaskText(event.target.value)
  }

  function handleNewTaskTextInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('O preenchimento deste campo é obrigatório!')
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    const id = uuidv4()
    const newTask = {
      id: id,
      content: newTaskText,
      isDone: false
    }

    setTaskList([...taskList, newTask])
    setNewTaskText('')
  }

  function toggleTask(taskToToggle: string) {
    const newTasks = taskList.map(task => {
      if (task.id === taskToToggle) {
        return {
          ...task,
          isDone: !task.isDone
        }
      } return task
    })

    setTaskList(newTasks)
  }

  function deleteTask(taskToDelete: string) {
    const TasksWithoutDeletedOne = taskList.filter(task => {
      return task.id !== taskToDelete
    })

    setTaskList(TasksWithoutDeletedOne)
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleCreateNewTask} className={styles.inputArea}>
        <input 
          placeholder="Adicione uma nova tarefa" 
          type="text" 
          value={newTaskText}
          onChange={handleNewTaskTextChange}
          onInvalid={handleNewTaskTextInvalid}
          required
        />
        <button type="submit">
          Criar <PlusCircle size={20} weight="bold" />
        </button>
      </form>

      <div className={styles.listArea}>
        <div className={styles.toDoListStateInfo}>
          <div className={styles.createdItens}>
            <p>Tarefas criadas</p>
            <p className={styles.number}>{tasksNumber}</p>
          </div>

          <div className={styles.toDoListProgress}>
            <p>Concluídas</p>
            <p className={styles.number}>{completedTasksNumber} de {tasksNumber}</p>
          </div>
        </div>

        {taskList.length === 0 ?
        (
          <div className={styles.emptyListInfo}>
            <img src={ListIcon} />
            <p>Você ainda não tem tarefas cadastradas</p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        ) : taskList.sort((a, b) => Number(a.isDone) - Number(b.isDone)).map(task => {
            return (
              <ToDoListItem 
                key={task.id} 
                id={task.id} 
                content={task.content} 
                isDone={task.isDone} 
                onDeleteTask={deleteTask} 
                onToggleTask={toggleTask} 
              />
            )
          })
        }
      </div>
    </div>
  )
}