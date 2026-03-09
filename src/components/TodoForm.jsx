import { useState, useEffect } from 'react';

const TodoForm = ({ onSubmit, editingTodo, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    title: '', description: '', priority: 'medium', due_date: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingTodo) {
      setFormData({
        title: editingTodo.title,
        description: editingTodo.description || '',
        priority: editingTodo.priority,
        due_date: editingTodo.due_date ? editingTodo.due_date.slice(0, 16) : ''
      });
    } else {
      setFormData({ title: '', description: '', priority: 'medium', due_date: '' });
    }
  }, [editingTodo]);

  const handleSubmit = async () => {
    if (!formData.title.trim()) return;
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
    if (!editingTodo) setFormData({ title: '', description: '', priority: 'medium', due_date: '' });
  };

  const priorities = [
    { value: 'low',    label: '🟢 ต่ำ',      bg: '#f0fdf4', color: '#16a34a', border: '#86efac' },
    { value: 'medium', label: '🟡 ปานกลาง', bg: '#fefce8', color: '#ca8a04', border: '#fde047' },
    { value: 'high',   label: '🔴 สูง',       bg: '#fef2f2', color: '#dc2626', border: '#fca5a5' },
  ];

  const inputStyle = {
    width: '100%', padding: '10px 14px', border: '1px solid #e5e7eb',
    borderRadius: '10px', fontSize: '14px', fontFamily: 'Kanit, sans-serif',
    outline: 'none', boxSizing: 'border-box', color: '#1f2937'
  };

  const labelStyle = {
    display: 'block', fontSize: '13px', fontWeight: '500',
    color: '#6b7280', marginBottom: '6px'
  };

  return (
    <div style={{
      backgroundColor: 'white', borderRadius: '16px', padding: '20px',
      marginBottom: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      border: '1px solid #fecdd3'
    }}>
      <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#f43f5e', marginBottom: '16px' }}>
        {editingTodo ? '✏️ แก้ไขงาน' : '➕ เพิ่มงานใหม่'}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

        {/* ชื่องาน */}
        <div>
          <label style={labelStyle}> ชื่องาน <span style={{ color: '#ef4444' }}>*</span>
          <span style={{float: 'right', color: formData.title.length > 230 ? '#ef4444' : '#9ca3af', fontSize: '12px' }}>
            {formData.title.length}/258
            </span>
            </label>

            <input
             type="text"
             value={formData.title}
              onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
               placeholder="เช่น: ตัดเย็บเสื้อ 50 ตัว"
                style={inputStyle}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                maxLength={258}
                />
        </div>

        {/* รายละเอียด */}
        <div>
          <label style={labelStyle}>รายละเอียด (ไม่บังคับ)<span style={{
            float: 'right',
             color: formData.description.length > 230 ? '#ef4444' : '#9ca3af',
             fontSize: '12px' }}>
                {formData.description.length}/258
                </span>
              </label>
              <textarea
              value={formData.description}
               onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                placeholder="เช่น: ไซส์ S, M, L สีขาว-ดำ"
                rows={2}
                 style={{ ...inputStyle, resize: 'none' }}
                 maxLength={258}
                 />
        </div>

        {/* วันที่ต้องส่ง */}
        <div>
          <label style={labelStyle}>📅 กำหนดส่ง (ไม่บังคับ)</label>
          <input
            type="datetime-local"
            value={formData.due_date}
            onChange={e => setFormData(p => ({ ...p, due_date: e.target.value }))}
            style={inputStyle}
          />
        </div>

        {/* Priority */}
        <div>
          <label style={labelStyle}>ระดับความสำคัญ</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {priorities.map(({ value, label, bg, color, border }) => (
              <button
                key={value}
                onClick={() => setFormData(p => ({ ...p, priority: value }))}
                style={{
                  flex: 1, padding: '8px 4px', borderRadius: '10px', fontSize: '12px',
                  fontWeight: '500', cursor: 'pointer', fontFamily: 'Kanit, sans-serif',
                  border: `2px solid ${formData.priority === value ? border : '#e5e7eb'}`,
                  backgroundColor: formData.priority === value ? bg : '#f9fafb',
                  color: formData.priority === value ? color : '#9ca3af',
                  transition: 'all 0.2s'
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ปุ่ม */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.title.trim()}
            style={{
              flex: 1, padding: '11px', borderRadius: '10px', border: 'none',
              backgroundColor: isSubmitting || !formData.title.trim() ? '#d1d5db' : '#f43f5e',
              color: 'white', fontSize: '14px', fontWeight: '600',
              cursor: isSubmitting || !formData.title.trim() ? 'not-allowed' : 'pointer',
              fontFamily: 'Kanit, sans-serif', transition: 'background-color 0.2s'
            }}
          >
            {isSubmitting ? '⏳ กำลังบันทึก...' : editingTodo ? '💾 บันทึกการแก้ไข' : '➕ เพิ่มงาน'}
          </button>
          {editingTodo && (
            <button
              onClick={onCancelEdit}
              style={{
                padding: '11px 16px', borderRadius: '10px',
                border: '1px solid #e5e7eb', backgroundColor: 'white',
                color: '#6b7280', fontSize: '14px', cursor: 'pointer',
                fontFamily: 'Kanit, sans-serif'
              }}
            >
              ยกเลิก
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoForm;