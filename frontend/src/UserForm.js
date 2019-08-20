import React, { useReducer } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { USERS_QUERY } from "./UserList";

const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

function UserForm() {
  const [user, setUser] = useReducer((s, a) => ({ ...s, ...a }), {
    name: "",
    email: ""
  });

  const [createUser] = useMutation(CREATE_USER, {
    update(
      cache,
      {
        data: { createUser }
      }
    ) {
      const { users } = cache.readQuery({ query: USERS_QUERY });
      cache.writeQuery({
        query: USERS_QUERY,
        data: { users: [...users, createUser] }
      });
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    createUser({
      variables: { ...user }
    });
    setUser({ name: "", email: "" });
  };

  const handleChange = ({ target: { name, value } }) => {
    setUser({ [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={user.name}
        type="text"
        onChange={handleChange}
      />
      <input
        name="email"
        value={user.email}
        type="email"
        onChange={handleChange}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default UserForm;
