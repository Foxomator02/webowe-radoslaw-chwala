import { useRef } from "react";

export const AuthorList = ({
  authors = [],
  onDelete,
  onEdit,
  showInputs,
  onEditSubmit,
}) => {
  const nameRef = useRef(null);
  const surnameRef = useRef(null);

  const handleSaveClick = (event, authorId) => {
    event.preventDefault();
    onEditSubmit({
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      id: authorId,
    });
  };

  return (
    <div className="EditAction">
      <h2>Author List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surame</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr>
              <td>
                {showInputs?.id === author.id ? (
                  <input defaultValue={author.name} name="name" ref={nameRef} />
                ) : (
                  author.name
                )}
              </td>
              <td>
                {showInputs?.id === author.id ? (
                  <input
                    defaultValue={author.surname}
                    name="surname"
                    ref={surnameRef}
                  />
                ) : (
                  author.surname
                )}
              </td>
              <td>
                <div>
                  {showInputs?.id === author.id ? (
                    <>
                      <button
                        className="save"
                        onClick={(event) => handleSaveClick(event, author.id)}
                      >
                        Save
                      </button>
                      <button className="cancel" onClick={() => onEdit(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="edit" onClick={() => onEdit(author)}>Edit</button>
                      <button className="delete" onClick={() => onDelete(author.id)}>
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};