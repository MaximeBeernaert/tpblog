import { Routes, Route } from 'react-router-dom';

import './App.css';

import Header from './components/Body/Header';
import Footer from './components/Body/Footer';
import ListeArticles from './components/Articles/ListeArticles';
import ConnexionUtilisateur from './components/Connexion/ConnexionUtilisateur';
import CreationUtilisateur from './components/Connexion/CreationUtilisateur';
import CreationArticle from './components/Articles/CreationArticle';
import ModificationArticle from './components/Articles/ModificationArticle';
import ListeUtilisateurs from './components/Connexion/ListeUtilisateurs';
import DeconnexionUtilisateur from './components/Connexion/DeconnexionUtilisateur';
import MesArticles from './components/Menu/MesArticles';
import LireArticle from './components/Articles/LireArticle';
import MonCompte from './components/Menu/MonCompte';


function App() {
  return (
    <div className="App">
      {/* HEADER QUI SERA MIS SUR TOUTES LES PAGES */}
      <Header/>

      {/* ROUTES */}
      <Routes>
          {/* LA PAGE PRINCIPALE AURA ACCèS à TOUS LES ARTICLES, POUR LES NON-CONNECTES */}
          <Route path="/" element={<ListeArticles/>} />

          {/* AU CAS Où, J'AJOUTE LA LISTEARTICLES EN ROUTE */}
          <Route path="/articles" element={<ListeArticles/>} />
            
          {/* LES AUTRES ROUTES */}
          <Route path="/login" element={<ConnexionUtilisateur/>}/>
          <Route path="/signin" element={<CreationUtilisateur/>}/>
          <Route path="/users" element={<ListeUtilisateurs/>}/>
          <Route path="/create" element={<CreationArticle/>}/>
          <Route path="/modify/:id" element={<ModificationArticle/>}/>
          <Route path="/logout" element={<DeconnexionUtilisateur/>}/>
          <Route path="/my_articles" element={<MesArticles/>}/>
          <Route path="/read/:id" element={<LireArticle/>}/>
          <Route path="/my_account" element={<MonCompte/>}/>
      </Routes>
      

      {/* FOOTER QUI SERA MIS SUR TOUTES LES PAGES */}
      <Footer/>
    </div>
  );
}

export default App;
