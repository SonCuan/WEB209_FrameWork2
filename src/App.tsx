import { useState } from 'react';
import './App.css';



function App() {
  const [items, setItems] = useState<any>([]);
  const [input, setInput] = useState<string>('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editInput, setEditInput] = useState<string>('');

  const handleAdd = () => {
    if (input.trim() !== '') {
      setItems([...items, { text: input, completed: false }]);
      setInput('');
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleEdit = (index) => { 
    setEditIndex(index);
    setEditInput(items[index].text);
  };

  const handleSave = () => {
    if (editIndex === null) return;
    const newItems = [...items];
    newItems[editIndex] = { ...newItems[editIndex], text: editInput };
    setItems(newItems);
    setEditIndex(null);
    setEditInput('');
    alert('Sửa thành công');
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditInput('');
  };

  const handleDelete = (index) => {
    const confirm = window.confirm('Bạn có chắc muốn xóa công việc này không?');
    if (confirm) {
      const updatedItems = items.filter((list, i) => i !== index);
      setItems(updatedItems);
      alert('Xóa thành công');
    }
  };

  const checkboxChange = (index) => {
    setItems(
      items.map((item, x) =>
        x === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="app">
      <input
        type="text"
        value={input}
        onChange={handleInput}
        placeholder="Add to work"
      />
      <button onClick={handleAdd}>Add</button>
      <h1>List work</h1>

      <ul style={{ listStyle: 'none' }}>
        {items.map((item, index) => (
          <li key={index} style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => checkboxChange(index)}
            />
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Canel</button>
              </>
            ) : (
              <>
                <span onClick={() => handleEdit(index)}>{item.text}</span>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
