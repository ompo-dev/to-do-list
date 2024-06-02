import './App.css';
import TaskForm from "./components/TaskForm";
import Task from "./components/Task"
import {useEffect, useState} from "react";

function App() {
  const [tasks,setTasks] = useState([]);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(tasks || []);
  }, []);

  function addTask(name) {
    if (!name) {
      alert("O nome da tarefa não pode ser vazio!");
      return;
    }

  setTasks(prev => {
    return [...prev, { name: name, done: false }];
  });
  }


  function removeTask(indexToRemove) {
    setTasks(prev => {
      return prev.filter((index) => index !== indexToRemove);
    });
  }

  function updateTaskDone(taskIndex, newDone) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  const numberComplete = tasks.filter(t => t.done).length;
  const numberTotal = tasks.length;

  function getMessage() {
    const percentage = numberComplete/numberTotal * 100;
    if (tasks.length === 0) {
      return 'Crie uma Task';
    }
    if (percentage === 0) {
      return 'Foco nas Tarefas!!';
    }
    if (percentage === 50) {
      return 'Isso!! Ja foi metade';
    }
    if (percentage >= 80 && percentage <= 90) {
      return 'Falta muito pouco, cotinua!!';
    }
    if (percentage === 100) {
      return 'Boa! G.O.A.T de mais!!!';
    }
    return 'Boa!! Continua assim';
  }

  return (
    <main>
      <h1>To do list - Maicon</h1>
      <h2>{numberComplete}/{numberTotal}</h2>
      <h3>{getMessage()}</h3>
      <TaskForm onAdd={addTask} />
      {tasks.map((task,index) => (
        <Task {...task}
              onTrash={() => removeTask(index)}
              onToggle={done => updateTaskDone(index, done)} />
      ))}
    </main>
  );
}

export default App;
