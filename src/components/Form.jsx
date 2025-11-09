export default function Form({submitFunction, title, setTitle, content, setContent, submitText}) {
  return (
    <form action="" className="g-3 mb-5" onSubmit={submitFunction}>
      <input
        type="text"
        className="form-control mb-1"
        placeholder="Aggiungi il titolo"
        value={title}
        onChange={setTitle}
      />
      <textarea
        type="text"
        className="form-control"
        placeholder="Aggiungi il contenuto"
        value={content}
        onChange={setContent}
      />

      <button type="submit" className="btn btn-primary mt-3">
        {submitText}
      </button>
    </form>
  );
}
