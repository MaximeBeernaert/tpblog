import React from 'react'
import ListeMesArticles from '../Articles/ListeMesArticles'

export default function MesArticles() {
  return (
    <div className='my-articles'>Mes Articles
        <input className='my-articles-add-article' type='button' value='Ajouter un article' onClick={() => window.location.href = "/create"}/>
        <ListeMesArticles/>
    </div>
  )
}
