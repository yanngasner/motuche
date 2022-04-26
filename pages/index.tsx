import React from "react"
import { GetServerSideProps } from "next"
import Layout from "../components/Layout"
import User, { UserProps } from "../components/User"
import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.user.findMany({
    select: {
      email: true,
      name: true,
      id: true,
      words: {
        select: {
          id: true,
          word: true
        }
      },
    },
  });
  return { props: {feed}};
};

type Props = {
  feed: UserProps[]
}

const UserList: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.feed.map((user) => (
            <div key={user.id} className="user">
              <User user={user} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .user {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .user:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .user + .user {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default UserList
