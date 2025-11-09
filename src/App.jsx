import { useState } from "react";
import blogPosts from "./assets/data/blogPosts";
import Form from "./components/form";
import Accordionheader from "./components/AccordionHeader";

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

  function handleSave(e) {
    e.preventDefault();
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
        <div className="mb-5">
          <Form
            submitFunction={handleSubmit}
            title={newTitle}
            setTitle={(e) => setNewTitle(e.target.value)}
            content={newContent}
            setContent={(e) => setNewContent(e.target.value)}
            submitText={"Aggiungi"}
            btnStyle={"primary"}
          />
        </div>
        <div className="accordion">
          {posts.map((curItem) => (
            <div key={curItem.id} className="accordion-item mb-2">
              <Accordionheader
                title={curItem.titolo}
                toogle={() => handleToogle(curItem.id)}
                deleteItem={() => handleDelete(curItem.id)}
              />
              {curItem.read && (
                <div className="accordion-collapse collapse show d-flex justify-content-between">
                  {editId === curItem.id ? (
                    <div className="w-100">
                      <Form
                        submitFunction={handleSave}
                        title={editTitle}
                        setTitle={(e) => setEditTitle(e.target.value)}
                        content={editContent}
                        setContent={(e) => setEditContent(e.target.value)}
                        submitText="Salva"
                        btnStyle={"success mx-auto mb-2"}
                      />
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
