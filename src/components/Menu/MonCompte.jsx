import React, { useState } from 'react'
import axios from 'axios';

export default function MonCompte() {
    const user = JSON.parse(localStorage.getItem('user'));
    let [nomU, setNom] = useState(user.nomU);
    let [prenomU, setPrenom] = useState(user.prenomU);
    let [emailU, setEmail] = useState(user.emailU);

    let url = "http://localhost:8000/api/utilisateurs";

  return (
    <div>
        <div>
            MonCompte 
        </div>
        <form method="POST" onSubmit={(e) => {
            e.preventDefault()
            axios.put("http://localhost:8000/api/utilisateurs/" + user.idU, {
                "nomU": document.getElementById("creation-utilisateur-form-nomU").value,
                "prenomU": document.getElementById("creation-utilisateur-form-prenomU").value,
                "emailU": document.getElementById("connexion-utilisateur-form-email-input").value,
                "mdpU": user.mdpU
            })
            
            axios.get(url + "/id/" + user.idU)
                .then(res => {
                    localStorage.setItem('user', JSON.stringify(res.data[0]))
                })  
                .catch(err => console.error(err))
            ;

            window.location.href = "/my_articles";
        }}>

            <div className='creation-utilisateur-form-nom'>
                <label htmlFor='nom'>Nom</label>
                <input id="creation-utilisateur-form-nomU" className='creation-utilisateur-form-nom-input' type='text' value={nomU}  onChange={(e)=>  {setNom(e.target.value)}}/>
            </div>

            <div className='creation-utilisateur-form-prenom'>
                <label htmlFor='prenom'>Prenom</label>
                <input id="creation-utilisateur-form-prenomU" className='creation-utilisateur-form-prenom-input' type='text' value={prenomU}  onChange={(e)=>  {setPrenom(e.target.value)}} />
            </div>

            <div className='connexion-utilisateur-form-email'>
                <label htmlFor='email'>Adresse mail</label>
                <input type='text' name='email' id='connexion-utilisateur-form-email-input' value={emailU}  onChange={(e)=>  {setEmail(e.target.value)}}/>
            </div>

            <input type="submit" value="Modifier" />
        </form>
    </div>
  )
}
