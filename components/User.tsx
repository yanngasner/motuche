import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type UserProps = {
  id: string;
  name: string;
  email: string;
  words: WordProps[];
};

export type WordProps = {
  id: string;
  word: string;
};

const User: React.FC<{ user: UserProps }> = ({ user }) => {
  return (
    <div onClick={() => Router.push("/user/[id]", `/user/${user.id}`)}>
      <h2>Name : {user.name}</h2>
      <p>Email : {user.email}</p>
      <p>Id : {user.id}</p>
      <p>Words : {user.words.map(w => w.word).join(',')}</p>

      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default User;
