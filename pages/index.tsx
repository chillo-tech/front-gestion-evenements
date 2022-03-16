import type { NextPage } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';

const Home: NextPage = () => {
    const { data: session } = useSession();
    return (
      <section className="wrapper bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen">
        {
          <button onClick={() => signOut()}>Sign out</button>
        }
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
export default Home
