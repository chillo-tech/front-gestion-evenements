import type { NextPage } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';
import { Component } from 'react';
import AccountLayout from '../layouts/AccountLayout';

const Index: NextPage = (props) => {
    const { data: session } = useSession();
    return (
      <section>
        <div className="banner grid grid-rows-1 grid-cols-4 rounded-lg bg-gradient-to-r from-red-400 to-orange-300 py-10 px-4">
          <h1 className='capitalize text-white text-3xl'> Bonjour {session?.user?.name?.split(' ')[0]}</h1>
        </div>
      </section>
    )
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: true,
      },
    }
  }

  return {
    props: { session }
  }
}
export default Index;
