import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';


export default function Semester() {
  const { branchId, semesterId } = useParams();
  const [subs, setSubs] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/semesters/${semesterId}/subjects`)
      .then(r=>r.json())
      .then(res => setSubs(res.data));
  }, [semesterId]);
  return (
    <div>
      <Navbar/>
      <h1>Subjects</h1>
      <ul>
        {subs.map(sub =>
          <li key={sub.id}>
            <Link to={`/branch/${branchId}/semester/${semesterId}/subject/${sub.id}`}>
              {sub.name}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
