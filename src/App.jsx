import { useState } from "react";
import blogPosts from "./assets/data/blogPosts";

function App() {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [posts, setPosts] = useState(blogPosts);

  function handleSubmit(e) {
    e.preventDefault();
    const lastIndex = posts.length + 1;

    const newPost = {
      id: lastIndex,
      titolo: newTitle,
      contenuto: newContent,
    };

    setPosts((prev) => [...prev, newPost]);
    setNewTitle("");
    setNewContent("");
  }

  function handleToogle(idToSelect) {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === idToSelect ? { ...post, read: !post.read } : post
      )
    );
  }

  return (
    <>
      <div className="container mt-5">
        <form action="" className="g-3 mb-5" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-1"
            placeholder="Aggiungi il titolo"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Aggiungi il contenuto"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />

          <button type="submit" className="btn btn-primary mt-3">
            Aggiungi
          </button>
        </form>
        <div className="accordion">
          {posts.map((curItem) => (
            <div key={curItem.id} className="accordion-item mb-2">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  onClick={() => handleToogle(curItem.id)}
                >
                  {curItem.titolo}
                </button>
              </h2>
              {curItem.read && (
                <div className="accordion-collapse collapse show">
                  <div className="accordion-body">{curItem.contenuto}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
