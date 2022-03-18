import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { getProviders, signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import React from 'react';
import Image from 'next/image'

function signin(props) {
  const schema = yup
    .object({
      firstName: yup.string().required("Le prénom est requis"),
      lastName: yup.string().required("Le nom est requis"),
      email: yup.string().required("L'email est requis"),
      password: yup.string().required("Le mot de pass est requis"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Profile>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: Profile) => console.log(data);

  const { providers, csrfToken } = props;
  const getIcon = (id: string) => {
    switch (id) {
      case 'facebook':
        return faFacebook;
      default:
        return faGoogle;
    }
  };
  const getIconColor = (id: string) => {
    switch (id) {
      case 'facebook':
        return '#1877f2';
      default:
        return '#eb4034';
    }
  };
  return (
    <section className="wrapper grid grid-cols-5 bg-blue-900 min-h-screen">
      <aside className="hidden md:grid md:content-between text-white text-center">
        <div className='font-black text-6xl py-5 text-center'>zeeven</div>
        <Image
          src="/images/signin.svg"
          alt="Picture of the author"
          width={100}
          height={500}
        />
        <p></p>
      </aside>
      <main className="text-white grid bg-blue-900 grid-cols-1 content-center col-span-5 md:col-span-4 md:bg-slate-200 md:text-black">
        <article className="w-9/12 mx-auto md:w-2/4">
          <div className='font-black text-6xl text-center mb-5 md:hidden'>zeeven</div>
          <h1 className="font-900 font-bold text-4xl text-center text-white md:text-blue-900">
            Connectez vous
          </h1>
          <h1 className="font-900 font-bold text-4xl text-center text-white md:text-blue-900">
            à votre compte
          </h1>
          <h6 className="font-900 font-extralight  text-center py-2 text-white md:text-blue-900">
            Avec
          </h6>
          <div className="font-extralight">
            <div className="socail-neworks flex justify-center">
              {Object.values(providers)
                .filter((provider) => ['facebook', 'google'].includes(provider.id))
                .map((provider) => (
                  <button onClick={() => signIn(provider.id)} key={provider.name} className="mx-4">
                    <FontAwesomeIcon
                      icon={getIcon(provider.id)}
                      color={getIconColor(provider.id)}
                      size="3x"
                    />
                  </button>
                ))}
            </div>
            <div className="my-5">
              <h2 className="line-through-text bg-slate-200 md:bg-blue-900">
                <span className="bg-blue-900 text-white md:text-blue-900 md:bg-slate-200">Ou</span>
              </h2>
            </div>
            <div className="socail-neworks flex justify-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="exampleInputfirstName" className="form-label font-semibold text-xl w-full text-white md:text-blue-900">
                    Prénom
                  </label>
                  <input
                    type="text"
                    className="form-control w-full border-2 border-gray-300 rounded-lg shadow-md font-extralight"
                    id="exampleInputfirstName"
                    {...register('firstName')}
                  />
                  <p>{errors.firstName?.message}</p>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputLastName" className="form-label font-semibold text-xl w-full text-white md:text-blue-900">
                    Nom
                  </label>
                  <input
                    type="text"
                    className="form-control w-full border-2 border-gray-300 rounded-md shadow-md font-extralight"
                    id="exampleInputLastName"
                    {...register('lastName')}
                  />
                  <p className='text-red-500'>{errors.lastName?.message}</p>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label font-semibold text-xl w w-full text-white md:text-blue-900">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control w-full border-2 border-gray-300 rounded-md shadow-md font-extralight"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    {...register('email')}
                  />
                  <p className='text-red-500'>{errors.userName?.message}</p>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label font-semibold text-xl text-white md:text-blue-900 w-fumm">
                    Mot de passe
                  </label>
                  <input type="password" 
                          className="form-control w-full border-2 border-gray-300 rounded-md shadow-md font-extralight" id="exampleInputPassword1"
                               {...register('password')} />
                  <p className='text-red-500'>{errors.password?.message}</p>
                </div>
               
                <button type="submit" className="mt-2 w-full py-2 rounded-md shadow-md font-extralight md:bg-blue-900 md:text-white text-white bg-lime-600">
                  Valider
                </button>
              </form>
            </div>
          </div>
        </article>
      </main>
    </section>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default signin;
