import React, { useEffect, useState }  from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";

export default function ModificationArticle({data}) {
    const [titre, setTitre] = useState("");
    const [contenu, setContenu] = useState("");

    let {id} = useParams();
    let url = "http://localhost:8000/api/articles/";

    useEffect(() => {
        const fetchArticles= () => {
            
            axios.get(url + id)
              .then(res => {
                setTitre(res.data[0].titreArt);
                setContenu(res.data[0].contenuArt);
              })
              .catch(err => console.error(err));
          };
        fetchArticles();
      }, [url]);


  return (
    <div className='modify-article'> 
        <form className='modify-article-form' method="POST" onSubmit={ (e) => { 
            e.preventDefault();
            let params = document.getElementById("modify-article-form-titre-input").value + "/" + document.getElementById("modify-article-form-contenu-input").value;
            axios.put(url+id, 
                    {
                        "titreArt": document.getElementById("modify-article-form-titre-input").value,
                        "contenuArt": document.getElementById("modify-article-form-contenu-input").value,
                        "auteurArt": JSON.parse(localStorage.getItem('user')).idU
                    }
                )
                .then(res => {
                    window.location.href = "/my_articles";
                })  
                .catch(err => console.error(err))
            ;
            // window.location.href = "/my_articles";
        }}>
            <input type="text" id="modify-article-form-titre-input" placeholder={titre} value={titre} onChange={(e)=>  {setTitre(e.target.value)}}/>
            <input type="text" id="modify-article-form-contenu-input" placeholder={contenu} value={contenu} onChange={(e)=>  {setContenu(e.target.value)}}/>
            <input type="submit" value="Modifier l'article"/>
        </form>
        
    </div>
  )
}
