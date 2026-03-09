import { useState } from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onEdit, onDelete }) => {
  const [filter, setFilter] = useState('all');

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'done') return t.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    done: todos.filter(t => t.completed).length,
  };

  const filters = [
    { value: 'all',    label: `ทั้งหมด (${stats.total})` },
    { value: 'active', label: `รอทำ (${stats.active})` },
    { value: 'done',   label: `เสร็จ (${stats.done})` },
  ];

  return (
    <div>
      {/* สถิติ */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '16px' }}>
        {[
          { label: 'ทั้งหมด',   value: stats.total,  bg: '#fff1f2', color: '#f43f5e' },
          { label: 'รอดำเนินการ', value: stats.active, bg: '#fff7ed', color: '#f97316' },
          { label: 'เสร็จแล้ว', value: stats.done,   bg: '#f0fdf4', color: '#22c55e' },
        ].map(({ label, value, bg, color }) => (
          <div key={label} style={{
            backgroundColor: bg, borderRadius: '12px',
            padding: '12px', textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color }}>{value}</div>
            <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {filters.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            style={{
              flex: 1, padding: '8px 4px', borderRadius: '10px',
              fontSize: '12px', fontWeight: '500', cursor: 'pointer',
              fontFamily: 'Kanit, sans-serif', border: 'none', transition: 'all 0.2s',
              backgroundColor: filter === value ? '#f43f5e' : 'white',
              color: filter === value ? 'white' : '#6b7280',
              boxShadow: filter === value ? '0 2px 8px rgba(244,63,94,0.3)' : 'none'
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* รายการ */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#9ca3af' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>
            {filter === 'done' ? '🎉' : '📋'}
          </div>
          <p style={{ fontSize: '14px' }}>
            {filter === 'done' ? 'ยังไม่มีงานที่เสร็จ' : filter === 'active' ? 'ไม่มีงานค้าง' : 'ยังไม่มีงาน กดเพิ่มได้เลย!'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map(todo => (
            <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;