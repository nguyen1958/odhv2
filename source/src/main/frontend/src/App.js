import React,{ useState } from 'react';
import { Routes, Route, HashRouter, useLocation } from 'react-router-dom'
import './App.scss';
import DetailImmeuble from './components/immeubles/DetailImmeuble';
import EditImmeuble from './components/immeubles/EditImmeuble';
import RechercheImmeubles from './components/immeubles/RechercheImmeubles';
import Test from './components/immeubles/Test'
import RechercheLocataires from './components/locataires/RechercheLocataires';
import EditLocataire from './components/locataires/EditLocataire';
import EditLot from './components/lots/EditLot';
import RechercheLots from './components/lots/RechercheLots';
import EditProcedure from './components/procedures/EditProcedure';
import RechercheProcedures from './components/procedures/RechercheProcedures';
import RechercheProprietaires from './components/proprietaires/RechercheProprietaires';
import EditProprietaire from './components/proprietaires/EditProprietaire';
import Accueil from './pages/Accueil';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import NotFound from './pages/NotFound';
import RechercheDeclarations from './components/declarations/RechercheDeclarations';
import HistoriqueLot from './components/lots/Historiques';
import MyViewer from './components/piecesJointes/MyViewer';
import PiecesJointes from './components/piecesJointes/PiecesJointes';
import RechercheRues from './components/rues/RechercheRues';
import EditRue from './components/rues/EditRue';
import RechercheListing from './components/listing/RechercheListing';
import RechercheExperts from './components/experts/RechercheExperts';
import EditExpert from './components/experts/EditExpert';
import RechercheSyndics from './components/syndics/RechercheSyndics';
import EditSyndic from './components/syndics/EditSyndic';
import RechercheSuiveurs from './components/suiveurs/RechercheSuiveurs';
import EditSuiveur from './components/suiveurs/EditSuiveur';
import RechercheEntreprises from './components/entreprises/RechercheEntreprises';
import EditEntreprise from './components/entreprises/EditEntreprise';
import RechercheOptions from './components/options/RechercheOptions';
import EditOption from './components/options/EditOption';
import RechercheUtilisateurs from './components/utilisateurs/RechercheUtilisateurs';
import EditUtilisateur from './components/utilisateurs/EditUtilisateur';
import RechercheRelogements from './components/relogements/RechercheRelogements';
import EditRelogement from './components/relogements/EditRelogement';


export const LoginContext = React.createContext();

function App() {
  const [login, setLogin] = useState(JSON.parse(sessionStorage.getItem("user")));
  const location=useLocation()
  console.log("login",login)
  return (
      <LoginContext.Provider value={login} >
        <Routes>
          <Route path="/" element={login ? <MainPage setLogin={setLogin} /> : <Login setLogin={setLogin} />}>
            <Route path="" element={<Accueil />} />
            {/* Immeuble */}
            <Route path="immeubles" element={<RechercheImmeubles/>} />
            <Route path="immeubles/edit" element={<EditImmeuble />} />
            <Route path="immeubles/detail" element={<DetailImmeuble/>}/>
            <Route path="immeubles/declarations" element={<RechercheDeclarations />}/>
            <Route path="Procedures" element={<RechercheProcedures />} />
            <Route path="procedures/edit" element={<EditProcedure />} />          
            <Route path="lots" element={<RechercheLots />} />
            <Route path="lots/historique" element={<HistoriqueLot />} />
            <Route path="lots/edit" element={<EditLot />} />
            <Route path="piecesjointes" element={<PiecesJointes />} />
            <Route path="syndics/edit" element={<EditSyndic />} />

            <Route path="proprietaires" element={<RechercheProprietaires />} />
            <Route path="proprietaires/edit" element={<EditProprietaire />} />
            <Route path="locataires" element={<RechercheLocataires />} />
            <Route path="locataires/edit" element={<EditLocataire />} />
            {/* Referentiel */}
            <Route path="experts" element={<RechercheExperts />} />
            <Route path="experts/edit" element={<EditExpert />} />
            <Route path="rues" element={<RechercheRues />} />
            <Route path="rues/edit" element={<EditRue />} />
            <Route path="syndics" element={<RechercheSyndics />} />
            <Route path="syndics/edit" element={<EditSyndic />} />
            <Route path="suiveurs" element={<RechercheSuiveurs />} />
            <Route path="suiveurs/edit" element={<EditSuiveur />} />
            <Route path="entreprises" element={<RechercheEntreprises />} />
            <Route path="entreprises/edit" element={<EditEntreprise />} />
            <Route path="relogements" element={<RechercheRelogements />} />
            <Route path="relogements/edit" element={<EditRelogement />} />
            <Route path="options" element={<RechercheOptions />} />
            <Route path="options/edit" element={<EditOption />} />
            {/* Listing */}
            <Route path="listing" element={<RechercheListing />} />
             {/* Administration */}
             <Route path="utilisateurs" element={<RechercheUtilisateurs />} />
             <Route path="utilisateurs/edit" element={<EditUtilisateur />} />


          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LoginContext.Provider>
  );
}

export default App;
