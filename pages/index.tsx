// pages/index.tsx
import React, { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest } from '../utils/msalConfig';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Typography } from '@mui/material';
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

/**
 * Represents the Home component.
 * 
 * @component
 * @example
 * ```tsx
 * <Home />
 * ```
 */
const Home: React.FC = () => {
  const { instance, inProgress, accounts } = useMsal();
  const [userName, setUserName] = useState<string | null>(null);

  // サインインしている場合はユーザー名を取得
  useEffect(() => {
    if (accounts.length > 0) {
      const account = accounts[0];
      instance.acquireTokenSilent({
        ...loginRequest,
        account: account
      }).then(response => {
        setUserName(response.account?.name || null);
      }).catch(error => {
        console.error("Failed to acquire token silently:", error);
      });
    }
  }, [accounts, instance]);


  // サインインしていない場合はリダイレクトでログイン
  useEffect(() => {
    if (inProgress === InteractionStatus.None) {
      instance.loginRedirect(loginRequest).catch(e => {
        console.error(e);
      });
    }
  }, [inProgress, instance]);

  // タスクの状態を管理
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : initialTasks;
    }
    return initialTasks;
  });

  // ローカルストレージに保存されたタスクを取得
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }
  }, []);

  // タスクが変更された場合はローカルストレージに保存
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // タスクを追加
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

  // タスクを削除
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
      <Header userName={userName} />
      {userName ? (
        <Container>
          <TaskForm onSubmit={addTask} />
          <TaskTable tasks={tasks} deleteTask={deleteTask} toggleTaskCompletion={toggleTaskCompletion} />
        </Container>
      ) : (
        <Container>
          <Typography variant="h6" align="center" sx={{ marginTop: 4 }}>
            サインインしてください。
          </Typography>
        </Container>
      )}
      <Footer />
    </ThemeProvider>
  );
};

export default Home;