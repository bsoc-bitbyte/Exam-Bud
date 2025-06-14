import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function AdminDashboard() {
  const [allUploads, setAllUploads] = useState([]);

  useEffect(() => {
    // grab all uploads across subjects
    fetch('http://localhost:4000/branches')
      .then(r=>r.json()).then(async branches=>{
        let combined = [];
        for (const b of branches) {
          const sems = await fetch(`http://localhost:4000/branches/${b.id}/semesters`).then(r=>r.json());
          for (const s of sems) {
            const subs = await fetch(`http://localhost:4000/semesters/${s.id}/subjects`).then(r=>r.json());
            for (const sub of subs) {
              const ups = await fetch(`http://localhost:4000/subjects/${sub.id}/uploads`).then(r=>r.json());
              combined.push(...ups.map(u=>({ ...u, subject: sub.name })));
            }
          }
        }
        setAllUploads(combined);
      });
  }, []);

  const del = async id => {
    await fetch(`http://localhost:4000/uploads/${id}`, {
      method:'DELETE', headers:{ 'x-user-role':'ADMIN' }
    });
    setAllUploads(us => us.filter(u => u.id !== id));
  };

  return (
    <div>
      <Navbar/>
      <h1>Admin Dashboard</h1>
      <h2>All Uploads</h2>
      <ul>
        {allUploads.map(u=>(
          <li key={u.id}>
            <strong>{u.title}</strong> ({u.subject}) by {u.user.name}
            <button onClick={()=>del(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
