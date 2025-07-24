
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import UploadList from '../components/UploadList';
import DiscussionList from '../components/DiscussionList';
import LabList from '../components/LabList';
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import texture from '../assets/texture.png'
import backArrow from '../assets/back_arrow.svg';

export default function Subject() {
  const { branchId, semesterId, subjectId } = useParams();
  const [subs, setSubs] = useState([]);







  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(`http://localhost:4000/semesters/${semesterId}/subjects`);
        const data = await response.json();
        setSubs(data?.data || []);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, [semesterId]);

  const subject = subs.find(s => s.id === parseInt(subjectId));
  const [activeTab, setActiveTab] = useState('notes');
  const [search, setSearch] = useState('');
  return (
    <div>
      <Navbar />
      <div
        className="body-font bg-center bg-blue-700 min-h-[80vh] w-screen w-full rounded-lg"
        style={{
          background: 'rgba(20, 45, 111, 1)',
          backgroundImage: `url(${texture})`,
        }}
      >
        <div className="container px-5 py-1 mx-auto">
          <Link to={`/branch/${branchId}/semester/${semesterId}`}>
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


          <div className="flex flex-col items-center text-center w-full px-6 py-1  rounded-lg shadow-sm">
            <h1 className="sm:text-3xl text-2xl font-bold title-font mb-4 text-white-900">
              {subject ? subject.name : 'Loading...'}
            </h1>
            
            <p className="lg:w-1/2 w-full text-white-600 mb-10 text-base">
            
              All materials in one place, neatly organized and easily accessible.
            </p>


            <div className="min-w-[80vw] flex flex-wrap items-center justify-between gap-4  p-4 rounded-xl">
              {/* Tabs */}
              <div className="flex gap-2">
                <div
                  onClick={() => setActiveTab('notes')}
                  className={`cursor-pointer px-5 py-1 rounded-full text-sm border transition ${activeTab === 'notes'
                    ? 'bg-[#C6D5FF] text-[#0A1E5E] font-semibold'
                    : 'bg-[#FFFFFF] text-[#142D6F] border-white'
                    }`}
                >
                  Notes
                </div>

                <div
                  onClick={() => setActiveTab('labs')}
                  className={`cursor-pointer px-5 py-1 rounded-full text-sm border transition ${activeTab === 'labs'
                    ? 'bg-[#C6D5FF] text-[#0A1E5E] font-semibold'
                    : 'bg-[#FFFFFF] text-[#142D6F] border-white'
                    }`}
                >
                  Lab material
                </div>
                <div
                  onClick={() => setActiveTab('discussion')}
                  className={`cursor-pointer px-5 py-1 rounded-full text-sm border transition ${activeTab === 'discussion'
                    ? 'bg-[#C6D5FF] text-[#0A1E5E] font-semibold'
                    : 'bg-[#FFFFFF] text-[#142D6F] border-white'
                    }`}
                >
                  Discussions
                </div>
              </div>

              {/* Right side - Search + Upload */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                {/* Search Bar */}
                <div className="relative w-full md:w-132">
                  
                  <Search search={search} setSearch={setSearch} placeholder={`Search ${activeTab} . . . .`}/>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white absolute left-3 top-1/2 transform -translate-y-1/2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                    />
                  </svg>
                </div>

                {/* Upload Button */}
                <div
                  onClick={() => document.getElementById(activeTab)?.requestSubmit()}
                  className="cursor-pointer flex items-center gap-1 px-5 py-1 border border-white text-white rounded-full text-sm hover:bg-[#C6D5FF] hover:text-[#0A1E5E] transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0-9l-3 3m3-3l3 3M12 4v8"
                    />
                  </svg>
                  Upload
                </div>
              </div>
            </div>
            

            <div className="flex flex-col items-center">
              <div className="w-full space-y-6">
                {activeTab === 'notes' && (
                  <div className="">
                    <UploadList subjectId={subjectId} searchQuery={search} />
                  </div>
                )}

                {activeTab === 'labs' && (
                  <div className="">
                    <LabList subjectId={subjectId}  searchQuery={search} />
                  </div>
                )}
                {activeTab === 'discussion' && (
                  <div className="">
                    <DiscussionList subjectId={subjectId} searchQuery={search} />
                  </div>
                )}

              </div>
               {/* Upload Button */}
                <div
                  onClick={() => document.getElementById(activeTab)?.requestSubmit()}
                  className=" w-[100px] cursor-pointer flex items-center gap-1 px-5 py-1 border border-white text-white rounded-full text-sm hover:bg-[#C6D5FF] hover:text-[#0A1E5E] transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0-9l-3 3m3-3l3 3M12 4v8"
                    />
                  </svg>
                  Upload
                </div>
            </div>



          </div>
        </div>
      </div>
    </div>
  );
}