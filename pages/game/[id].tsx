import React from "react"
import { GetServerSideProps } from "next"
import Layout from "../../components/Layout"
import { GameProps } from "../../components/Game"
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const game = await prisma.game.findUnique({
    where: {
      id: String(params?.id),
    },
    select: {
        word: true,
        id: true,
        createdAt: true,
    },
  });
  //@ts-ignore
  game.createdAt = game.createdAt.toDateString();
  return {
    props: game,
  };
};

const Game: React.FC<GameProps> = (props) => {
  return (
    <Layout>
      <div>
      <h2>Word : {props.word}</h2>
      <p>Created : {props.createdAt}</p>
      <p>Id : {props.id}</p>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Game
