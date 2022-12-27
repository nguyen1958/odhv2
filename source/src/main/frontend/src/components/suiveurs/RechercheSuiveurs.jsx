import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../commons/api';
import Requetes from '../../commons/Requetes';
import ListeSuiveurs from './ListeSuiveurs';


const RechercheSuiveurs = () => {
    const navigate = useNavigate()
    const [suiveurs, setSuiveurs] = useState(null);
    const getData = async () => {
        try {
            const result= await api.requestSql(Requetes.suiveurs)
            setSuiveurs(result.data)
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
                    Suiveurs
                    <button className="btn btn-success pull-right"
                        onClick={()=>{navigate("/suiveurs/edit")}}>
                        <i className="fa fa-plus mr-2"></i>Ajouter un suiveur
                    </button>
                </h5>
            </div>
            { suiveurs && suiveurs.length===0 && <div style={{border:'1px solid',padding:'2px 0'}}>Aucune donnée trouvée</div>}              
            { suiveurs && suiveurs.length >0 && <ListeSuiveurs data={suiveurs} getData={getData}/>}
        </div>
    );
}

export default RechercheSuiveurs;
