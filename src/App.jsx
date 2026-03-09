import { useState } from 'react';
import useTodos from './hooks/useTodos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App = () => {
  const { todos, loading, error, addTodo, editTodo, toggleComplete, removeTodo } = useTodos();
  const [editingTodo, setEditingTodo] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type: type || 'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleFormSubmit = async (formData) => {
    let result;
    if (editingTodo) {
      result = await editTodo(editingTodo.id, { ...formData, completed: editingTodo.completed });
      if (result.success) {
        setEditingTodo(null);
        showNotification('แก้ไขงานสำเร็จ!');
      } else {
        showNotification(result.message, 'error');
      }
    } else {
      result = await addTodo(formData);
      if (result.success) {
        showNotification('เพิ่มงานสำเร็จ!');
      } else {
        showNotification(result.message, 'error');
      }
    }
  };

  const handleDelete = async (id) => {
    const result = await removeTodo(id);
    if (result.success) showNotification('ลบงานสำเร็จ!');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff1f2 0%, #fce7f3 50%, #fff7ed 100%)' }}>

      {/* Notification */}
      {notification && (
        <div style={{
          position: 'fixed', top: '16px', right: '16px', left: '16px',
          zIndex: 9999, padding: '12px 20px', borderRadius: '12px',
          textAlign: 'center', fontWeight: '500', fontSize: '14px',
          backgroundColor: notification.type === 'error' ? '#ef4444' : '#22c55e',
          color: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
        }}>
          {notification.message}
        </div>
      )}

      {/* Header */}
      <header style={{
        backgroundColor: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #fecdd3',
        position: 'sticky', top: 0, zIndex: 100,
        padding: '0'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '12px',
            backgroundColor: '#f43f5e', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '22px', flexShrink: 0,
            boxShadow: '0 2px 8px rgba(244,63,94,0.3)'
          }}>👕</div>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 }}>
              TodoList
            </h1>
            <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
              จัดการงาน
            </p>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#f43f5e' }}>
              {todos.filter(t => !t.completed).length}
            </div>
            <div style={{ fontSize: '11px', color: '#9ca3af' }}>งานค้างอยู่</div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '24px 16px' }}>
        <TodoForm
          onSubmit={handleFormSubmit}
          editingTodo={editingTodo}
          onCancelEdit={() => setEditingTodo(null)}
        />
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>⏳</div>
            <p style={{ fontSize: '14px' }}>กำลังโหลดข้อมูล...</p>
          </div>
        )}
        {error && (
          <div style={{
            backgroundColor: '#fef2f2', border: '1px solid #fecaca',
            borderRadius: '12px', padding: '16px', textAlign: 'center',
            color: '#dc2626', fontSize: '14px', marginBottom: '16px'
          }}>
            {error}
          </div>
        )}
        {!loading && !error && (
          <TodoList
            todos={todos}
            onToggle={toggleComplete}
            onEdit={setEditingTodo}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
};

export default App;