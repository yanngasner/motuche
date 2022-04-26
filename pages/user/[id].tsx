import React from "react"
import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"
import { UserProps } from "../../components/User"
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: String(params?.id),
    },
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
  return {
    props: user,
  };
};

const User: React.FC<UserProps> = (props) => {
  console.log(props?.children)
  return (
    <Layout>
      <div>
      <h2>Name : {props?.name}</h2>
      <p>Email : {props?.email}</p>
      <p>Id : {props?.id}</p>
      <p>Words : {props?.words.map(w => w.word).join(',')}</p>
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

export default User