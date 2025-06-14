import { useEffect, useState } from 'react';
import UploadModal from './Upload';

export default function LabList({ subjectId }) {
  const [labs, setLabs] = useState([]);
  const [title, setTitle] = useState('');
  const [modalOpen, setmodalOpen] = useState(false);

  const load = ()=>fetch(`http://localhost:4000/subjects/${subjectId}/labs`)
    .then(r=>r.json())
    .then(res => setLabs(res.data));

  useEffect(load, [subjectId]);

  const add = async (uploadTitle, cloudinaryUrl) => {
    const payload = {
      title: uploadTitle,
      url: cloudinaryUrl
    };

    await fetch(`http://localhost:4000/subjects/${subjectId}/labs`, {
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
    await fetch(`http://localhost:4000/labs/${id}`, { method:'DELETE' });
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
      <h2>Lab Materials</h2>
      <form onSubmit={add}>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" required/>
        <button type="button" onClick={handleButtonClick} disabled={title.trim()===""}>Upload Lab</button>
        <UploadModal 
          open={modalOpen}
          onClose={() => setmodalOpen(false)}
          onComplete={handleUploadComplete}
          title={title}
        />
      </form>
      <ul>
        {labs.map(l=>(
          <li key={l.id}>
            <a href={l.url} target="_blank" rel="noopener noreferrer">{l.title}</a>
            <span> by {l.user.name}</span>
            <button onClick={()=>del(l.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}