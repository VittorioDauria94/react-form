import { useState } from "react";
import blogPosts from "./assets/data/blogPosts";
import Form from "./components/form";

function App() {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [posts, setPosts] = useState(blogPosts);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (newTitle.trim() === "") return;
    if (newContent.trim() === "") return;

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

  function handleDelete(curId) {
    setPosts((prev) => prev.filter((post) => post.id !== curId));
  }

  function handleModify(curId) {
    const postToEdit = posts.find((p) => p.id === curId);

    setEditId(curId);
    setEditTitle(postToEdit.titolo);
    setEditContent(postToEdit.contenuto);
  }

  function handleSave() {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === editId
          ? { ...post, titolo: editTitle, contenuto: editContent }
          : post
      )
    );

    setEditId(null);
    setEditTitle("");
    setEditContent("");
  }

  return (
    <>
      <div className="container mt-5">
        <Form submitFunction={handleSubmit} title={newTitle} setTitle={(e) => setNewTitle(e.target.value)} content={newContent} setContent={(e) => setNewContent(e.target.value)} submitText={"Aggiungi"} />
        <div className="accordion">
          {posts.map((curItem) => (
            <div key={curItem.id} className="accordion-item mb-2">
              <h2 className="accordion-header d-flex ">
                <button
                  className="accordion-button"
                  type="button"
                  onClick={() => handleToogle(curItem.id)}
                >
                  {curItem.titolo}
                </button>
                <i
                  className="bi bi-trash btn btn-danger align-self-center mx-1"
                  onClick={() => handleDelete(curItem.id)}
                ></i>
              </h2>

              {curItem.read && (
                <div className="accordion-collapse collapse show d-flex justify-content-between">
                  {editId === curItem.id ? (
                    <div className="w-100">
                      <input
                        type="text"
                        className="form-control mb-1"
                        placeholder="Modifica il titolo"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                      <textarea
                        type="text"
                        className="form-control mb-1"
                        placeholder="Modifica il contenuto"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                      />
                      <div className="text-center mb-2">
                        <button
                          className="btn btn-success mt-2"
                          onClick={handleSave}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="accordion-body">{curItem.contenuto}</div>
                  )}
                  {editId !== curItem.id && (
                    <i
                      className="bi bi-pencil btn btn-warning align-self-center mx-1"
                      onClick={() => handleModify(curItem.id)}
                    ></i>
                  )}
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
