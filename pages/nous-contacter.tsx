import React from 'react';
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

function NousContacter() {


   const schema = yup
    .object({
      firstName: yup.string().required("Le prénom est requis"),
      lastName: yup.string().required("Le nom est requis"),
      email: yup.string().required("L'email est requis"),
      téléphone: yup.string().required("Le numéro de téléphone est requis"),
      description: yup.string().required("Vous devez nous dire exactement ce que vous voulez"),
    })
    .required();
    const onSubmit = async(data: Profile) =>{
      const options = {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(data)
       };
       try {

        const fetchresult = await fetch("http://localhost:8080/utilisateur ", options);
       const resultdata = await fetchresult.json(); 
       alert(JSON.stringify(data));
         
       } catch (error) {
         console.log('====================================');
         console.log(error);
         console.log('====================================');
         alert(error);
       }
  }
     
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Profile>({
    resolver: yupResolver(schema),
  });

  return(
  
  <div className="container">
   <form onSubmit={handleSubmit(onSubmit)} >

  <div className="row ">
  <div className="col">
    <tr >
      <td>
          <div className="mb-3">
          <label htmlFor="exampleInputfirstName" className="form-label font-semibold text-xl w-full text-white md:text-blue-800">
          Prenom
          </label>
        <input
          type="text"
          className="form-control w-full border-2 border-gray-300 rounded-lg shadow-md font-extralight"
          id="exampleInputfirstName"
          placeholder="Entrer votre Prenom"
          {...register('firstName', {required: true, minLength: 3,  maxLength: 5})}
        />
        <p className='text-red-500'>{errors.firstName?.message}</p>
        </div>
      </td>

      <td>
        <div className="mb-3">
            <label htmlFor="exampleInputLastName" className="form-label font-semibold text-xl w-full text-white md:text-blue-800">
              Nom
            </label>
                <input
                  type="text"
                  className="form-control w-full border-2 border-gray-300 rounded-md shadow-md font-extralight"
                  id="exampleInputLastName"
                  placeholder="Entrer votre Nom"
                  {...register('lastName',  {required: true, minLength: 3,  maxLength: 20})}
                />
            <p className='text-red-500'>{errors.lastName?.message}</p>
        </div> 
      </td>
    </tr>
  </div>
  </div>

      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label font-semibold text-xl w w-full text-white md:text-blue-800">
          Email
        </label>
        <input
          type="email"
          className="form-control w-full border-2 border-gray-300 rounded-md shadow-md font-extralight"
          id="exampleInputEmail1"
          placeholder="Entrer votre Email"
          aria-describedby="emailHelp"
          {...register('email', {required: true})}
        />
        <p className='text-red-500'>{errors.email?.message}</p>
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputPhone" className="form-label font-semibold text-xl w-full text-white md:text-blue-800">
          Téléphone
        </label>
        <input
          type="number"
          className="form-control w-full border-2 border-gray-300 rounded-md shadow-md font-extralight"
          id="exampleInputPhone"
          placeholder="Entrer votre Numéro de téléphone"
          {...register('téléphone',  {required: true})}
        />
          <p className='text-red-500'>{errors.téléphone?.message}</p>
      </div>

        <div className="form-outline mb-4"  >    
          <label htmlFor="exampleInputDescription" className="form-label font-semibold text-xl w-full text-white md:text-blue-800">
            Description
          </label >
          <textarea className="form-control w-full border-2 border-gray-300 rounded-lg shadow-md font-extralight" id="exampleInputDescription" placeholder='Presenter nous vos attentes' rows="4" {...register('description',  {required: true})}/>
          <p className='text-red-500'>{errors.description?.message}</p>
        </div>

      <button type="submit" className="mt-2 w-full py-2 rounded-md shadow-md font-extralight md:bg-blue-800 md:text-white text-white bg-lime-600, margin: 50px">
        Nous faire Parvenir
      </button>
    </form>

  </div>
  
  );
}

export default NousContacter;
