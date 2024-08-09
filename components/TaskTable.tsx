import React from 'react';
import { Task } from '../types/Task';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface TaskTableProps {
  tasks: Task[];
  deleteTask: (id: string) => void; // 修正: id の型を string に変更
  toggleTaskCompletion: (id: string) => void; // 修正: id の型を string に変更
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, deleteTask, toggleTaskCompletion }) => {
  const sortedTasks = tasks.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

  const handleCheckboxChange = (taskId: string) => { // 修正: taskId の型を string に変更
    // Implement your logic here
    toggleTaskCompletion(taskId);

  };

  const handleDeleteClick = (taskId: string) => { // 修正: taskId の型を string に変更
    // Implement your logic here
    deleteTask(taskId);

  };

  return (
    <TableContainer component={Paper} sx={{ margin: 2, backgroundColor: '#e0f7fa' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#1565c0' }}> {/* 濃い青色に設定 */}
            <TableCell sx={{ color: '#ffffff' }}>タスク</TableCell> {/* 文字色を白に設定 */}
            <TableCell sx={{ color: '#ffffff' }}>締め切り</TableCell>
            <TableCell sx={{ color: '#ffffff' }}>完了</TableCell>
            <TableCell sx={{ color: '#ffffff' }}>ヒント</TableCell>
            <TableCell sx={{ color: '#ffffff' }}>削除</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedTasks.map((task) => (
            <TableRow
              key={task.id}
              sx={{
                backgroundColor: '#ffffff',
                height: '100px', // 行の高さを設定
                '&:hover': {
                  backgroundColor: '#f5f5f5', // ホバー時の背景色を設定
                },
              }}
            >              
             <TableCell sx={{ fontWeight: 'bold' }}>{task.name}</TableCell>
             <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>{task.deadline}</TableCell>
             <TableCell>
                <Checkbox
                  checked={task.completed}
                  onChange={() => handleCheckboxChange(task.id)}
                />
              </TableCell>
              <TableCell sx={{ fontSize: '0.875rem' }}>{task.hint}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleDeleteClick(task.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;