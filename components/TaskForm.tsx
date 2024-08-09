import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

interface TaskFormProps {
  onSubmit: (task: string, deadline: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [task, setTask] = useState('');
  const [deadline, setDeadline] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
    if (event.target.value) {
      setError('');
    }
  };

  const handleDeadlineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeadline(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!task) {
      setError('タスクは空にできません');
      return;
    }
    const today = new Date().toISOString().split('T')[0];
    onSubmit(task, deadline || today);
    setTask('');
    setDeadline(today); // 修正: 締め切り日を当日日付にリセット
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, margin: 2 }}>
      <TextField
        label="タスク"
        value={task}
        onChange={handleTaskChange}
        error={!!error}
        helperText={error}
        variant="outlined"
        fullWidth
        sx={{ backgroundColor: '#ffffff' }} // 背景色を白に設定
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="締め切り"
          type="date"
          value={deadline}
          onChange={handleDeadlineChange}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          sx={{ width: '150px', backgroundColor: '#ffffff' }} // 幅を固定し、背景色を白に設定
        />
        <Button type="submit" variant="contained" color="primary" sx={{ whiteSpace: 'nowrap' }}>
          タスクを追加
        </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;