import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../commons/api';
import Requetes from '../../commons/Requetes';
import ListeUtilisateurs from './ListeUtilisateurs';


const RechercheUtilisateurs = () => {
    const navigate = useNavigate()
    const [utilisateurs, setUtilisateurs] = useState(null);
    const getData = async () => {
        try {
            const result= await api.requestSql(Requetes.utilisateurs)
            setUtilisateurs(result.data)
        }
        catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getData()
        return () => {};
    }, []);

    return (
        <div>
            <div className="alert alert-secondary text-center" role="alert">
                <h5 className="header">
                    Utilisateurs
                    <button className="btn btn-success pull-right"
                        onClick={()=>{navigate("/utilisateurs/edit")}}>
                        <i className="fa fa-plus mr-2"></i>Ajouter un utilisateur
                    </button>
                </h5>
            </div>
            { utilisateurs && utilisateurs.length===0 && <div style={{border:'1px solid',padding:'2px 0'}}>Aucune donnée trouvée</div>}              
            { utilisateurs && utilisateurs.length >0 && <ListeUtilisateurs data={utilisateurs} getData={getData}/>}
        </div>
    );
}

export default RechercheUtilisateurs;
