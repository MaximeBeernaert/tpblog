import React from 'react'
import axios from 'axios';

export default function CreationArticle() {
    let url = "http://localhost:8000/api/articles";
  return (
    <div className='create-article'>Ecrire un article
        <form className='create-article-form' method='POSE' onSubmit={(e) => (
            e.preventDefault(),
            axios.post(url, 
                {
                  "titreArt": document.getElementById("create-article-form-title-input").value,
                  "contenuArt": document.getElementById("create-article-form-contenu-input").value,
                  "auteurArt" : JSON.parse(localStorage.getItem('user')).idU,
                  "dateCreationArt": new Date().toISOString().slice(0, 19).replace('T', ' ')
                }
              ).then(res => {
                window.location.href = "/my_articles";
              })
              .catch(err => console.error(err))
        )}>
            <div className='create-article-form-title'>
                <label htmlFor='title'>Titre</label>
                <input type='text' id='create-article-form-title-input' name='title' placeholder="Titre de l'article" />
            </div>
            <div className='create-article-form-content'>
                <label htmlFor='content'>Contenu</label>
                <input id='create-article-form-contenu-input' type='text' name='content' placeholder="Contenu de l'article" />
            </div>
            <div className='create-article-form-submit'>
                <button type='submit'>Envoyer</button>
            </div>
        </form>
    </div>
  )
}
