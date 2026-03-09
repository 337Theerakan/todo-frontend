import { useState, useEffect, useCallback } from 'react';
import * as todoApi from '../services/todoApi';

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await todoApi.fetchAllTodos();
      setTodos(result.data);
    } catch (err) {
      setError('โหลดข้อมูลไม่สำเร็จ กรุณาตรวจสอบว่า Backend กำลังทำงานอยู่');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const addTodo = async (todoData) => {
    try {
      const result = await todoApi.createTodo(todoData);
      setTodos(prev => [result.data, ...prev]);
      return { success: true };
    } catch {
      return { success: false, message: 'เพิ่ม Todo ไม่สำเร็จ' };
    }
  };

  const editTodo = async (id, todoData) => {
    try {
      const result = await todoApi.updateTodo(id, todoData);
      setTodos(prev => prev.map(todo => todo.id === id ? result.data : todo));
      return { success: true };
    } catch {
      return { success: false, message: 'แก้ไข Todo ไม่สำเร็จ' };
    }
  };

  const toggleComplete = async (id) => {
    try {
      const result = await todoApi.toggleTodo(id);
      setTodos(prev => prev.map(todo => todo.id === id ? result.data : todo));
    } catch (err) {
      console.error('Toggle ไม่สำเร็จ:', err);
    }
  };

  const removeTodo = async (id) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      return { success: true };
    } catch {
      return { success: false, message: 'ลบ Todo ไม่สำเร็จ' };
    }
  };

  return { todos, loading, error, addTodo, editTodo, toggleComplete, removeTodo };
};

export default useTodos;