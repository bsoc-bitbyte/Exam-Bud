import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Branch() {
  const { branchId } = useParams();
  const [sems, setSems] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/branches/${branchId}/semesters`)
      .then(r=>r.json())
      .then(res => setSems(res.data));
  }, [branchId]);
  return (
    <div>
      <Navbar/>
      <h1>Semesters</h1>
      <ul>
        {sems.map(s =>
          <li key={s.id}>
            <Link to={`/branch/${branchId}/semester/${s.id}`}>
              Semester {s.number}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
