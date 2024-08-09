// pages/index.tsx
import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import TaskTable from '../components/TaskTable';
import TaskForm from '../components/TaskForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Task } from '../types/Task';
import { v4 as uuidv4 } from 'uuid'; // UUIDを生成するためのライブラリをインポート

// テーマを作成
const theme = createTheme({
  palette: {
    background: {
      default: '#e0f7fa', // 薄いブルー
    },
  },
});

const initialTasks: Task[] = [];

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : initialTasks;
    }
    return initialTasks;
  });


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = async (name: string, deadline: string) => {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskDescription: name }),
    });
    const data = await response.json();
    const hint = data.hint;

    const newTask: Task = {
      id: uuidv4(), // UUIDを使用して一意のIDを生成
      name,
      deadline,
      completed: false,
      hint
    };
    const updatedTasks = [...tasks, newTask];
    updatedTasks.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    setTasks(updatedTasks); // 修正: ソートされたタスクリストをセット
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (id: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container>
        <TaskForm onSubmit={addTask} />
        <TaskTable tasks={tasks} deleteTask={deleteTask} toggleTaskCompletion={toggleTaskCompletion} />
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default Home;