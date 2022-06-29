import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type GameProps = {
  id: string;
  word: string;
  createdAt: string;
};

const Game: React.FC<{ game: GameProps }> = ({ game }) => {
  return (
    <div onClick={() => Router.push("/game/[id]", `/game/${game.id}`)}>
      <h2>Word : {game.word}</h2>
      <p>Created : {game.createdAt}</p>
      <p>Id : {game.id}</p>

      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Game;
