import { useRef } from "react";
import "./AddAuthor.css";

export const AddAuthor = ({ onAdd }) => {
  const nameRef = useRef(null);
  const surnameRef = useRef(null);

  const handleSubmit = (event) => {
    onAdd(event);
    nameRef.current.value = "";
    surnameRef.current.value = "";
  };

  return (
      <fieldset className="AddForm">
        <h2>Add Author</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="name">Name</label>
            <input
              ref={nameRef}
              id="name"
              name="name"
              placeholder="Name"
              className="input"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="surname">Surname</label>
            <input
              ref={surnameRef}
              id="surname"
              name="surname"
              placeholder="Surname"
              className="input"
            />
          </div>

          <button className="AddButton">Add</button>
        </form>
      </fieldset>
  );
};