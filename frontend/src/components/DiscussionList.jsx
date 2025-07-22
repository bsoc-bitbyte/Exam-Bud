import { useCallback, useEffect, useState } from 'react';

export default function DiscussionList({ subjectId ,searchQuery=''}) {
  const [list, setList] = useState([]);
  const [txt, setTxt] = useState('');

const load = useCallback(async()=> {
    try {
      fetch(`http://localhost:4000/subjects/${subjectId}/discussions`)
        .then((r) => r.json())
        .then((res) => setList(res.data));
    } catch (err) {
      console.error('Error loading discussions:', err);
    }
  }, [subjectId]); 

  useEffect(() => {
    load();
    return () => {
      try {
        // future cleanup (if needed)
      } catch (err) {
        console.error('Cleanup error in DiscussionList:', err);
      }
    };
  }, [load]);

  const post = async (e) => {
    e.preventDefault();
    
    try {
      await fetch(`http://localhost:4000/subjects/${subjectId}/discussions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 1,
        },
        body: JSON.stringify({ content: txt }),
      });
      setTxt('');

      await load();
      
    } catch (err) {
      console.error('Error posting discussion:', err);
    }
  };

  return (
    <div className="min-w-[60vw] p-6 space-y-6 bg-white/10 rounded-xl shadow-lg text-white">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-center">💬 Discussion Forum</h2>

      {/* Form */}
      <form id='discussion' onSubmit={post} className="flex flex-col gap-4 bg-white/50 p-4 rounded-xl">
        <textarea
          value={txt}
          onChange={(e) => setTxt(e.target.value)}
          required
          placeholder="Share your thoughts..."
          className="w-full min-h-[100px] p-3 rounded-lg text-black resize-y border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="self-start px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          ➕ Post
        </button>
      </form>

      {/* Discussion List */}
      <ul className="space-y-4">
  {list.filter((d) =>
    !searchQuery || // if searchQuery is empty, show all
    d.content.toString().toLowerCase().includes(searchQuery.toString().toLowerCase()) ||
    d.user?.name?.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())
  ).length === 0 ? (
    <p className="text-gray-300 text-center italic">No discussions yet. Be the first to post!</p>
  ) : (
    list
      .filter((d) =>
        !searchQuery ||
        d.content.toString().toLowerCase().includes(searchQuery.toString().toLowerCase()) ||
        d.user?.name?.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())
      )
      .map((d) => (
        <li key={d.id} className="bg-white/70 text-black p-4 rounded-lg shadow-sm">
          <p className="text-base">{d.content}</p>
          <small className="text-sm text-gray-600 block mt-2">
            — <span className="font-medium">{d.user.name}</span>,{' '}
            {new Date(d.createdAt).toLocaleString()}
          </small>
        </li>
      ))
  )}
</ul>

    </div>
  );
}
