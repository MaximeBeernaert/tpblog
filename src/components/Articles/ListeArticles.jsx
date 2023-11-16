import React, { useEffect, useState }  from 'react'
import axios from 'axios';

export default function ListeArticles() {
    const [articles, setArticles] = useState([]);
    let url = "http://localhost:8000/api/articles";

    useEffect(() => {
        const fetchArticles= () => {
            axios.get(url)
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
                        <input className='articles-list-article-button' type='button' value="Lire l'article" onClick={() => {
                            window.location.href = "/read/" + article.idArt;
                        }}/>
                    </div>
                )
            :
            <div className='articles-list-article'>
                Aucun article n'a été écrit
            </div>
        }
    </div>
  )
}
