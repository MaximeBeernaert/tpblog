import { Routes, Route } from 'react-router-dom';


import './App.css';
import Header from './components/Body/Header';
import Footer from './components/Body/Footer';
import ListeArticles from './components/Articles/ListeArticles';
import ConnexionUtilisateur from './components/Connexion/ConnexionUtilisateur';
import CreationUtilisateur from './components/Utilisateur/CreationUtilisateur';
import CreationArticle from './components/Articles/CreationArticle';
import ModificationArticle from './components/Articles/ModificationArticle';
import SuppressionArticle from './components/Articles/SuppressionArticle';

function App() {
  return (
    <div className="App">
      <Header/>

      <Routes>
          <Route path="/" element={<ListeArticles/>} />
          <Route path="/articles" element={<ListeArticles/>} />
          <Route path="/signin" element={<ConnexionUtilisateur/>}/>
          <Route path="/login" element={<CreationUtilisateur/>}/>
          <Route path="/create" element={<CreationArticle/>}/>
          <Route path="/modify" element={<ModificationArticle/>}/>
          <Route path="/delete" element={<SuppressionArticle/>}/>
      </Routes>
      
      {/* mettre la liste des articles ici ? */}

      <Footer/>
    </div>
  );
}

export default App;
