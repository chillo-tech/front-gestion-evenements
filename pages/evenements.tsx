import React, { useState } from 'react';
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


function Evenements() {

   

   const schema = yup
    .object({
      nom: yup.string().required("Le Nom de votre évènement est requis"),
      dateDebut: yup.string().required("Le jour de debut de l'évènement est requis"),
      dateFin: yup.string().required("Le jour de fin de l'évènement est requis"),
      heureDebut: yup.string().required("L'Heure de debut de votre évènement  est requis"),
      heureFin: yup.string().required("L'Heure de fin de votre évènement  est requis"),
      adresse: yup.object({
        ville: yup.string().required("La ville où aura lieu votre cérémonie est requis"),
        quartier: yup.string().required("Le quartier où aura lieu votre cérémonie est requis"),
      }),
      description: yup.string().required("Vous devez nous dire exactement ce que vous voulez"),
    })
    .required();
    const onSubmit = async(data: Profile) =>{
      const options = {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(data)
       };
       console.log(data);
      const fetchresult = await fetch( "http://localhost:8080/evenement", options);
      const resultdata = await fetchresult.json(); 
      alert(JSON.stringify(data));
      
      
  }
     
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Profile>({
    resolver: yupResolver(schema),
  });


  return(

    <div className="container" >
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="mb-3">
          <label htmlFor="exampleInputnom" className="form-label font-semibold text-xl w-full text-white md:text-blue-800">
          nom
          </label>
          <input
          type="text"
          className="form-control w-full border-2 border-gray-300 rounded-md shadow-md font-extralight"
          id="exampleInputnom"
          placeholder="Nom de l'Evenement"
          {...register('nom',  {required: true})}
          />
          <p className='text-red-500'>{errors.nom?.message}</p>
        </div>
      
        <div className="row ">
          <div className="col">
           <tr >
             <td>
               <div className="mb-3">
                  <label htmlFor="exampleInputDate" className="form-label font-semibold text-xl w w-full text-white md:text-blue-800">
                    dateDebut
                  </label>
                  <input
                      type="date"
                      className="form-control w-full border-2 border-gray-300 rounded-md shadow-md font-extralight"
                      id="exampleInputDate"
                      placeholder="Entrer le jour de la cérémonie"
                      aria-describedby="dateHelp"
                      {...register('dateDebut', {required: true})}
                  />
                  <p className='text-red-500'>{errors.dateDebut?.message}</p>
                </div>
             </td>
    
             <td>
                <div className="mb-3">
                  <label htmlFor="exampleInputdateFin" className="form-label font-semibold text-xl w w-full text-white md:text-blue-800">
                    dateFin
                  </label>
                  <input
                    type="date"
                    className="form-control w-full border-2 border-gray-300 rounded-md shadow-md font-extralight"
                    id="exampleInputdateFin"
                    placeholder="Entrer le jour de la cérémonie"
                    aria-describedby="dateHelp"
                    {...register('dateFin', {required: true})}
                 />
                  <p className='text-red-500'>{errors.dateFin?.message}</p>
                </div>
             </td>
           </tr>
         </div>
       </div>

        <div className="row ">
          <div className="col">
             <tr >
               <td>
                  <div className="mb-3">
                      <label htmlFor="exampleInputTime" className="form-label font-semibold text-xl w w-full text-white md:text-blue-800">
                        heureDebut
                      </label>
                      <input
                        type="time"
                        className="form-control w-full border-2 border-gray-300 rounded-md shadow-md font-extralight"
                        id="exampleInputTime"
                        placeholder="Entrer l'heure de début de votre cérémonie"
                        aria-describedby="timeHelp"
                        {...register('heureDebut', {required: true})}
                      />
                        <p className='text-red-500'>{errors.heureDebut?.message}</p>
                  </div>
               </td>
    
                <td>
                 <div className="mb-3">
                    <label htmlFor="exampleInputheureFin" className="form-label font-semibold text-xl w w-full text-white md:text-blue-800">
                      heureFin
                    </label>
                    <input
                      type="time"
                      className="form-control w-full border-2 border-gray-300 rounded-md shadow-md font-extralight"
                      id="exampleInputheureFin"
                      placeholder="Entrer l'heure de début de votre cérémonie"
                      aria-describedby="timeHelp"
                      {...register('heureFin', {required: true})}
                    />
                     <p className='text-red-500'>{errors.heureFin?.message}</p>
                  </div>
               </td>
             </tr>
           </div>
         </div>

      <div className="mb-3">
        <label htmlFor="exampleInputadressev" className="form-label font-semibold text-xl w-full text-white md:text-blue-800">
          ville
        </label>
        {
          <input
          type="text"
          className="form-control w-full border-2 border-gray-300 rounded-md shadow-md font-extralight"
          id="exampleInputadressev"
          placeholder="Entrer la ville où aura lieu votre cérémonie"
          {...register('adresse.ville',  {required: true, minLength: 3,  maxLength: 20})}
        />
        }
        <p className='text-red-500'>{errors?.adresse?.ville?.message}</p>
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputadresseq" className="form-label font-semibold text-xl w-full text-white md:text-blue-800">
          quartier
        </label>
        {
          <input
          type="text"
          className="form-control w-full border-2 border-gray-300 rounded-md shadow-md font-extralight"
          id="exampleInputadresseq"
          placeholder="Entrer le quartier où aura lieu votre cérémonie"
          {...register('adresse.quartier',  {required: true, minLength: 3,  maxLength: 20})}
        />
        }
        <p className='text-red-500'>{errors?.adresse?.quartier?.message}</p>
      </div>



      <div className="form-outline mb-4"  >    
        <label htmlFor="exampleInputDescription" className="form-label font-semibold text-xl w-full text-white md:text-blue-800">
          description
        </label >
        <textarea className="form-control w-full border-2 border-gray-300 rounded-lg shadow-md font-extralight" 
        id="exampleInputDescription" 
        placeholder='Presenter nous vos attentes' rows="4" {...register('description',  {required: true})}/>
        <p className='text-red-500'>{errors.description?.message}</p>
      </div>

      <button type="submit" className="mt-2 w-full py-2 rounded-md shadow-md font-extralight md:bg-blue-800 md:text-white text-white bg-lime-600, margin: 50px">
        valider
      </button>
      <button type="button" className="mt-2 w-full py-2 rounded-md shadow-md font-extralight md:bg-blue-800 md:text-white text-white bg-lime-600, margin: 50px"
        onClick={() =>clickMe}> 
        Continuer
      </button>
    </form>
  </div>

  );
}

export default Evenements;