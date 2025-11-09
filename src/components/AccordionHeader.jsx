export default function Accordionheader({toogle, deleteItem, title}) {
  return (
    <h2 className="accordion-header d-flex ">
      <button
        className="accordion-button"
        type="button"
        onClick={toogle}
      >
        {title}
      </button>
      <i
        className="bi bi-trash btn btn-danger align-self-center mx-1"
        onClick={deleteItem}
      ></i>
    </h2>
  );
}
