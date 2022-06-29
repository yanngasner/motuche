import React from "react"
import { GetServerSideProps } from "next"
import Layout from "../components/Layout"
import Game, { GameProps } from "../components/Game"
import prisma from "../lib/prisma";
import Router from "next/router";

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.game.findMany({
    select: {
      word: true,
      id: true,
      createdAt: true,
    },
    orderBy: {
        createdAt: 'desc',
    },
  });
  //@ts-ignore
  feed.map(item => item.createdAt = item.createdAt.toDateString())
  return { props: {feed}};
};

type Props = {
  feed: GameProps[]
}

const GameList: React.FC<Props> = (props) => {

  const onCreateGameRequested = async () => {
      //TODO : create post request
      const response = await fetch('/api/newGame');
      const data = await response.json();
      Router.push("/game/[id]", `/game/${data.game.id}`)
  }

  return (
    <Layout>
      <div className="page">
        <h1>Games</h1>
        <main>
          <button onClick={onCreateGameRequested}>Create game</button>
          {props.feed.map((game) => (
            <div key={game.id} className="game">
              <Game game={game} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .game {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .game:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .game + .game {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default GameList
