import React from 'react'
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className='header'>
        <div className='header-link'>
            <Link className="header-link-menu" to="/">Revenir au menu / logo</Link>
            <Link className="header-link-users" to="/users">Liste utilisateurs</Link>
            { localStorage.getItem('user') ? 
                <>
                    <Link className="header-link-myArticles" to="/my_articles">Mes articles</Link> 
                    <Link className='header-link-myAccount' to="/my_account">Mon compte</Link>
                    <Link className="header-link-logout" to="/logout">Se déconnecter</Link> 
                </>
                :
                <>
                    <Link className="header-link-login" to="/signin">Créer un compte</Link>
                    <Link className="header-link-signin" to="/login">Se connecter</Link>
                </>
                 }
        </div>
    </div>
  )
}
