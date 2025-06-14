import { useEffect, useState } from 'react';
import UploadModal from './Upload.jsx'

export default function UploadList({ subjectId }) {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [modalOpen, setmodalOpen] = useState(false);

  const load = ()=>fetch(`http://localhost:4000/subjects/${subjectId}/uploads`)
    .then(r=>r.json())
    .then(res => setItems(res.data));

  useEffect(load, [subjectId]);

  const add = async (uploadTitle, cloudinaryUrl) => {
    const payload = {
      title: uploadTitle,
      url: cloudinaryUrl
    };

    await fetch(`http://localhost:4000/subjects/${subjectId}/uploads`, {
      method: 'POST',
      headers: { 
        'x-user-id': 1, 
        'x-user-role': 'USER',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    setTitle(''); 
    load();
  };


  const del = async id => {
    await fetch(`http://localhost:4000/uploads/${id}`, { method:'DELETE' });
    load();
  };

  const handleUploadComplete = async ({ url, public_id }) => {
    await add(public_id, url);
    setTitle("")
    setmodalOpen(false)
  }

  const handleButtonClick = () => {
    if (title.trim() === "") {
      alert("Please enter a title before uploading.")
      return
    }
  setmodalOpen(true)
  }

  return (
    <div>
      <h2>Materials</h2>
      <form onSubmit={e => e.preventDefault()}> 
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <button type="button" onClick={handleButtonClick} disabled={title.trim() === ""}>
          Upload
        </button>
        <UploadModal 
        open={modalOpen}
        onClose={() => setmodalOpen(false)}
        onComplete={handleUploadComplete}
        title={title}
        />
      </form>
      <ul>
        {items.map(u => (
          <li key={u.id}>
            <a href={u.url} target="_blank" rel="noopener noreferrer">{u.title}</a>
            <span> by {u.user.name}</span>
            <button onClick={() => del(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}