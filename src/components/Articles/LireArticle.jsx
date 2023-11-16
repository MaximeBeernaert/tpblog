import React, { useEffect, useState }  from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";

export default function LireArticle() {
    let {id} = useParams();
    let url = "http://localhost:8000/api/articles/";
    const [article, setArticle] = useState([]);
    
    useEffect(() => {
        const fetchArticles= () => {
            axios.get(url + id)
              .then(res => {
                setArticle(res.data[0]);
              })
              .catch(err => console.error(err));
          };
        fetchArticles();
      }, [url]);
  return (
    <div className='read-article'>
        <div className='read-article-titre'>
            {article.titreArt}
        </div>
        <div className='read-article-contenu'>
            {article.contenuArt}
        </div>
    </div>
  )
}
