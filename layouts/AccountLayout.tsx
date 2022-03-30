import { useSession } from "next-auth/react";
import Link from "next/link";

function AccountLayout({ children }) {

  const { data: session } = useSession();
  
  return (
    <section className="wrapper bg-gradient-to-r from-slate-200 to-slate-200 min-h-screen grid grid-rows-1 grid-cols-7">
        <aside className="flex flex-col justify-between bg-blue-900 shadow-slate-50">
          <div className='font-black text-slate-100 text-5xl py-5 text-center'>zeeven</div>
          <div>
            <ul>
              <li>
                <Link href="/evenements">
                  <a className="py-3 block pl-4 text-xl font-light text-slate-100">Evènements</a>
                </Link>
              </li>
              <li>
                <Link href="/nous-contacter">
                  <a className="py-3 block pl-4 text-xl font-light text-slate-100">Contact</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="py-3 block pl-4 text-xl font-light text-slate-100">A propos</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-center text-slate-200 bg-blue-600 py-3 px-2 font-bold">
            {session?.user?.name}
          </div>
        </aside>
        <main className="col-span-6 p-12 mx-12 rounded-t-lg">
         {children}
        </main>
    </section>
  )
}
export default AccountLayout;