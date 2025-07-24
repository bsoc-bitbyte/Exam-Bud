import { useEffect, useState, useCallback } from "react";
import UploadModal from "./Upload.jsx";
import share_icon from "../assets/share_icon.png";
import download_icon from "../assets/download_icon.png";
import notes_icon from "../assets/notes_icon.png";
import star_unfilled from "../assets/star 0.png";

export default function UploadList({ subjectId, searchQuery = "" }) {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [modalOpen, setmodalOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/subjects/${subjectId}/uploads`,
      );
      const res = await response.json();
      setItems(res.data);
    } catch (err) {
      console.error("Error in load:", err);
    }
  }, [subjectId]);

  useEffect(() => {
    load();
  }, [load]);

  const add = async (uploadTitle, cloudinaryUrl) => {
    const payload = {
      title: uploadTitle,
      url: cloudinaryUrl,
    };

    await fetch(`http://localhost:4000/subjects/${subjectId}/uploads`, {
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
      await fetch(`http://localhost:4000/uploads/${id}`, { method: "DELETE" });
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
    <div className="min-w-[80vw] mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center text-white">Notes</h2>

      <form className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="w-full md:w-1/3 px-4 py-2 rounded-xl border border-gray-300"
        />
        <button
          type="button"
          onClick={handleButtonClick}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Upload
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
          ? items.filter((u) =>
              u.title.toLowerCase().includes(searchQuery.toLowerCase()),
            )
          : items
        ).map((u) => (
          <li
            key={u.id}
            className="flex flex-col md:flex-row md:items-center justify-between bg-white shadow-md rounded-2xl px-4 py-3"
          >
            <div>
              <img src={notes_icon} alt="icon" />
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
              <a
                href={`http://localhost:4000${u.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-blue-800 hover:underline"
              >
                {u.title}
              </a>
              <span className="text-sm text-gray-500">by {u.user.name}</span>
            </div>
            <div className="flex items-center gap-4 mt-2 md:mt-0">
              <img src={share_icon} alt="share" />
              <a
                href={`http://localhost:4000${u.url}`}
                download
                className="text-blue-500 hover:text-blue-700"
              >
                <img src={download_icon} alt="download" />
              </a>
              <img src={star_unfilled} alt="favourites" />
              <button
                onClick={() => del(u.id)}
                className="text-red-500 hover:text-red-700"
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
