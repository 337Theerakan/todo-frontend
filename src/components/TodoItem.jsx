import { useState } from 'react';

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const priorityMap = {
    low:    { label: 'ต่ำ',      bg: '#f0fdf4', color: '#16a34a', dot: '#22c55e' },
    medium: { label: 'ปานกลาง', bg: '#fefce8', color: '#ca8a04', dot: '#eab308' },
    high:   { label: 'สูง',      bg: '#fef2f2', color: '#dc2626', dot: '#ef4444' },
  };
  const p = priorityMap[todo.priority] || priorityMap.medium;

  const formatDate = (d) => new Date(d).toLocaleDateString('th-TH', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  const formatDueDate = (d) => new Date(d).toLocaleString('th-TH', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  // เช็คว่าเกินกำหนดหรือไม่
  const isOverdue = todo.due_date && !todo.completed && new Date(todo.due_date) < new Date();

  return (
    <div className="todo-enter" style={{
      backgroundColor: todo.completed ? '#f8fffe' : 'white',
      border: `1px solid ${isOverdue ? '#fca5a5' : todo.completed ? '#bbf7d0' : '#f3f4f6'}`,
      borderRadius: '14px', padding: '14px 16px',
      boxShadow: '0 1px 6px rgba(0,0,0,0.05)', transition: 'all 0.2s'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>

        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          title={todo.completed ? 'ยกเลิกสถานะ' : 'ทำเครื่องหมายเสร็จ'}
          style={{
            width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
            border: `2px solid ${todo.completed ? '#22c55e' : '#d1d5db'}`,
            backgroundColor: todo.completed ? '#22c55e' : 'white',
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', marginTop: '2px', transition: 'all 0.2s'
          }}
        >
          {todo.completed && <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>✓</span>}
        </button>

        {/* เนื้อหา */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: '14px', fontWeight: '600', margin: '0 0 4px 0',
            color: todo.completed ? '#9ca3af' : '#1f2937',
            textDecoration: todo.completed ? 'line-through' : 'none'
          }}>
            {todo.title}
          </p>

          {todo.description && (
            <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 6px 0' }}>
              {todo.description}
            </p>
          )}

          {/* กำหนดส่ง */}
          {todo.due_date && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              padding: '3px 8px', borderRadius: '8px', marginBottom: '6px',
              backgroundColor: isOverdue ? '#fef2f2' : '#f0f9ff',
              color: isOverdue ? '#dc2626' : '#0284c7', fontSize: '11px', fontWeight: '500'
            }}>
              {isOverdue ? '⚠️ เกินกำหนด: ' : '📅 ส่ง: '}
              {formatDueDate(todo.due_date)}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              padding: '2px 8px', borderRadius: '20px', fontSize: '11px',
              fontWeight: '500', backgroundColor: p.bg, color: p.color
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: p.dot }}></span>
              {p.label}
            </span>
            <span style={{ fontSize: '11px', color: '#d1d5db' }}>
              {formatDate(todo.created_at)}
            </span>
            {todo.completed && (
              <span style={{ fontSize: '11px', color: '#22c55e', fontWeight: '500' }}>✓ เสร็จแล้ว</span>
            )}
          </div>
        </div>

        {/* ปุ่ม Action */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 }}>
          {!confirmDelete ? (
            <>
              <button onClick={() => onEdit(todo)} title="แก้ไข"
                style={{
                  width: '32px', height: '32px', borderRadius: '8px', border: 'none',
                  backgroundColor: '#eff6ff', cursor: 'pointer', fontSize: '14px'
                }}>✏️</button>
              <button onClick={() => setConfirmDelete(true)} title="ลบ"
                style={{
                  width: '32px', height: '32px', borderRadius: '8px', border: 'none',
                  backgroundColor: '#fef2f2', cursor: 'pointer', fontSize: '14px'
                }}>🗑️</button>
            </>
          ) : (
            /* ปุ่มยืนยันลบ — ไม่มี popup! */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <p style={{ fontSize: '11px', color: '#ef4444', margin: '0 0 4px 0', textAlign: 'center' }}>
                ลบใช่ไหม?
              </p>
              <button
                onClick={() => { onDelete(todo.id); setConfirmDelete(false); }}
                style={{
                  padding: '4px 10px', borderRadius: '8px', border: 'none',
                  backgroundColor: '#ef4444', color: 'white', fontSize: '12px',
                  fontWeight: '600', cursor: 'pointer', fontFamily: 'Kanit, sans-serif'
                }}
              >
                ✓ ลบ
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                style={{
                  padding: '4px 10px', borderRadius: '8px',
                  border: '1px solid #e5e7eb', backgroundColor: 'white',
                  color: '#6b7280', fontSize: '12px', cursor: 'pointer',
                  fontFamily: 'Kanit, sans-serif'
                }}
              >
                ยกเลิก
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;