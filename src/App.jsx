import { useEffect, useState } from "react";
import { AuthorList } from "./components/AuthorList";
import { AddAuthor } from "./components/AddAuthor";

const API_URL = "http://127.0.0.1:8000";

function App() {
  const [authors, setAuthors] = useState([]);
  const [showInputs, setShowInputs] = useState(null);

  const onDeleteAuthorClickHandler = (authorId) => {
    fetch(`${API_URL}/authors/${authorId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        setAuthors((prevAuthors) =>
          prevAuthors.filter((author) => author.id !== authorId)
        );
      }
    });
  };

  const onAddAuthorSumbitHandler = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const surname = event.target.surname.value;

    fetch(`${API_URL}/authors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setAuthors((prevAuthors) => [data, ...prevAuthors]);
        }
      });
  };

  useEffect(() => {
    fetch(`${API_URL}/authors`)
      .then((res) => res.json())
      .then((data) => setAuthors(data));
  }, []);

  const onEditAuthorSubmitHandler = ({ name, surname, id }) => {
    fetch(`${API_URL}/authors/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAuthors((prevAuthors) =>
          prevAuthors.map((author) =>
            author.id === id
              ? { ...author, name: data.name, surname: data.surname }
              : author
          )
        );
        setShowInputs(null);
      });
  };

  useEffect(() => {
    fetch(`${API_URL}/authors`)
      .then((res) => res.json())
      .then((data) => setAuthors(data));
  }, []);


  return (
    <>
    <div className="title">
      <h1>Authors™</h1>
    </div>

    <div className="lists">
      <AddAuthor onAdd={onAddAuthorSumbitHandler} />
            <AuthorList
              authors={authors}
              onDelete={onDeleteAuthorClickHandler}
              onEdit={setShowInputs}
              showInputs={showInputs}
              onEditSubmit={onEditAuthorSubmitHandler}
            />
    </div>
    <footer> By Radosław Chwała</footer>
 
          
    </>
  );
}

export default App;