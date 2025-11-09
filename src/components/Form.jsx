export default function Form({
  submitFunction,
  title,
  setTitle,
  content,
  setContent,
  submitText,
  btnStyle,
}) {
  return (
    <form action="" className="g-3" onSubmit={submitFunction}>
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
      <div className="d-flex">
        <button type="submit" className={`btn btn-${btnStyle} mt-3`}>
          {submitText}
        </button>
      </div>
    </form>
  );
}
