import { useEffect, useState, useCallback } from "react";
import UploadModal from "./Upload";
import share_icon from "../assets/share_icon.png";
import download_icon from "../assets/download_icon.png";
import notes_icon from "../assets/notes_icon.png";
import star_unfilled from "../assets/star 0.png";

export default function LabList({ subjectId, searchQuery = "" }) {
  const [labs, setLabs] = useState([]);
  const [title, setTitle] = useState("");
  const [modalOpen, setmodalOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      fetch(`http://localhost:4000/subjects/${subjectId}/labs`)
        .then((r) => r.json())
        .then((res) => setLabs(res.data));
    } catch (err) {
      console.error("Error loading ", err);
    }
  }, [subjectId]);

  useEffect(() => {
    load();
    return () => {
      try {
        // future cleanup (if needed)
      } catch (err) {
        console.error("Cleanup error lablist", err);
      }
    };
  }, [load]);

  const add = async (uploadTitle, cloudinaryUrl) => {
    const payload = {
      title: uploadTitle,
      url: cloudinaryUrl,
    };

    await fetch(`http://localhost:4000/subjects/${subjectId}/labs`, {
      method: "POST",
      headers: {
        "x-user-id": 1,
        "x-user-role": "USER",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setTitle("");
    load();
  };

  const del = async (id) => {
    try {
      await fetch(`http://localhost:4000/labs/${id}`, { method: "DELETE" });
      load();
    } catch (err) {
      console.error("Error in delete:", err);
    }
  };

  const handleUploadComplete = async ({ url }) => {
    await add(title, url);
    setTitle("");
    setmodalOpen(false);
  };

  const handleButtonClick = () => {
    if (title.trim() === "") {
      alert("Please enter a title before uploading.");
      return;
    }
    setmodalOpen(true);
  };

  return (
    <div className="min-w-[80vw] mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center text-white">
        Lab Materials
      </h2>

      <form className="flex flex-col md:flex-row items-center justify-center gap-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="button"
          onClick={handleButtonClick}
          className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Upload Lab
        </button>
        <UploadModal
          open={modalOpen}
          onClose={() => setmodalOpen(false)}
          onComplete={handleUploadComplete}
          title={title}
        />
      </form>

      <ul className="space-y-4">
        {(searchQuery
          ? labs.filter(
              (l) =>
                l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                l.user.name.toLowerCase().includes(searchQuery.toLowerCase()),
            )
          : labs
        ).map((l) => (
          <li
            key={l.id}
            className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl shadow-md"
          >
            <div>
              <img src={notes_icon} alt="icon" />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <a
                href={`http://localhost:4000${l.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-blue-700 hover:underline"
              >
                {l.title}
              </a>
              <span className="text-sm text-gray-500">by {l.user.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <img src={share_icon} alt="share" />
              <a
                href={`http://localhost:4000${l.url}`}
                download
                className="text-sm text-blue-600 hover:underline hover:text-blue-800"
              >
                <img src={download_icon} alt="download" />
              </a>
              <img src={star_unfilled} alt="favourites" />
              <button
                onClick={() => del(l.id)}
                className="text-sm text-red-500 hover:underline hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
