import React from "react";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import "./App.scss";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { init, actions } from "./features/usersSlice";
import { Form } from "./components/Form/Form";
import { UserRow } from "./components/UserRow/UserRow";

function App() {
  const { filteredUsers, error, loader } = useAppSelector(
    (state) => state.users
  );
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  // Initial data fetch when the component mounts
  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  const applyQuery = useCallback(
    debounce(({ ...arg }) => {
      dispatch(actions.filtered({ ...arg }));
    }, 1000),
    [dispatch]
  );

  const handleFiltered = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setQuery((currentQuery) => ({ ...currentQuery, [name]: value }));

      applyQuery({ name, value });
    },
    [applyQuery]
  );

  return (
    <div className="list">
      <div className="container">
        <h1 className="list__title">User List</h1>

        {/* Display error message if there's an error */}
        {error && <h3 className="list__title">Oops.. Something wrong</h3>}

        {/* Display loader if the data is still loading */}
        {loader && (
          <div className="list__loader-wrapper">
            <img className="list__loader" src="./images/loading.gif" alt="" />
          </div>
        )}

        {/* Display the user list table if there's no error and loading is complete */}
        {!loader && !error && (
          <div className="list__table">
            <div className="list__header">
              <Form
                label="Name"
                name="name"
                value={query.name}
                onChange={handleFiltered}
                placeholder="Enter name..."
              />
              <Form
                label="Username"
                name="username"
                value={query.username}
                onChange={handleFiltered}
                placeholder="Enter username..."
              />
              <Form
                label="Email"
                name="email"
                value={query.email}
                onChange={handleFiltered}
                placeholder="Enter email..."
              />
              <Form
                label="Phone"
                name="phone"
                value={query.phone}
                onChange={handleFiltered}
                placeholder="Enter phone..."
              />
            </div>

            <div className="list__body">
              {filteredUsers.map((user) => (
                <UserRow user={user} key={user.id} />
              ))}
            </div>
          </div>
        )}
        {filteredUsers.length <= 0 && !error && !loader && (
          <h3 className="list__title">No users. Try another search query</h3>
        )}
      </div>
    </div>
  );
}

export default App;
