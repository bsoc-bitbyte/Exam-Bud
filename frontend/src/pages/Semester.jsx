import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import texture from '../assets/texture.png'
import backArrow from '../assets/back_arrow.svg';
import Navbar from '../components/Navbar';

export default function Semester() {
  const { branchId, semesterId } = useParams();
  const [subs, setSubs] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/semesters/${semesterId}/subjects`)
      .then(r => r.json())
      .then(res => setSubs(res.data));
  }, [semesterId]);

  useEffect(() => {
    fetch('http://localhost:4000/branches')
      .then(res => res.json())
      .then(res => setBranches(res.data));
  }, []);

  const branch = branches.find(b => b.id === parseInt(branchId));

  return (
    <>
      <Navbar />
      <div
        className="body-font bg-blue-700 min-h-[80vh] w-screen  rounded-lg m-0 p-0"
        style={{ background: 'rgba(20, 45, 111, 1)',
          backgroundImage: `url(${texture})`,
         }}
      >
        <div className="container px-5 pt-1 pb-2 mx-auto">
          <Link to={`/branch/${branchId}`}>
            {/* back button working */}
            <div className="relative mt-16 ml-2">
              <div
                className="flex items-center justify-center w-16 h-16 rounded-3xl transition-shadow shadow-md"
                style={{
                  background: 'rgba(20, 45, 111, 1)',
                  border: '2px solid rgba(163, 189, 255, 1)',
                }}
              >
                <img src={backArrow} alt="Back" className="h-8 w-6" />
              </div>
            </div>
          </Link>

          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
              Select Your Course
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed font-medium text-gray-100 text-2xl">
              Semester {semesterId % 8 === 0 ? 8 : semesterId % 8} | {branch?.name || 'Branch'}
            </p>
          </div>

          <div className="flex flex-wrap -m-4">
            {/* sub cards */}
            {subs.map((sub) => (
              <div key={sub.id} className="w-full p-4 md:w-1/2 xl:w-1/3">
                <Link to={`/branch/${branchId}/semester/${semesterId}/subject/${sub.id}`}>
                  <div className="rounded-lg bg-white border border-gray-200 p-6">
                    <h2 className="title-font mb-2 text-lg font-medium text-gray-900">
                      {sub.name}
                    </h2>
                    <p className="text-base leading-relaxed">View materials →</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
