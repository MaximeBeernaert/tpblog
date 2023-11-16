import React, { useEffect, useState }  from 'react'
import axios from 'axios';

export default function ListeMesArticles() {
    const [articles, setArticles] = useState([]);
    let url = "http://localhost:8000/api/articles/auteur/";
    let urlDelete = "http://localhost:8000/api/articles/";

    useEffect(() => {
        const fetchArticles= () => {
            axios.get(url + JSON.parse(localStorage.getItem('user')).idU)
              .then(res => {
                setArticles(res.data);
              })
              .catch(err => console.error(err));
          };
        fetchArticles();
      }, [url]);

      
  return (
    <div className='articles-list'>
        {articles
            ? 
                articles.map(
                    (article,i) => 
                    <div className='articles-list-article'>
                        {article.titreArt}
                        <input className='my-articles-modify-article' type='button' value='Modifier un article' onClick={() => {
                        window.location.href = "/modify/" + article.idArt;
                        } }/>
                        <input className='my-articles-delete-article' type='button' value='Supprimer un article' onClick={() => {
                            axios.delete(urlDelete + article.idArt)
                              .then(res => {
                                console.log(res);
                                window.location.href = "/my_articles";
                              })
                              .catch(err => console.error(err));
                        }}/>
                    </div>
                )
            :
            <div className='articles-list-article'>
                Vous n'avez pas encore écrit d'article
            </div>
        }
    </div>
  )
}
