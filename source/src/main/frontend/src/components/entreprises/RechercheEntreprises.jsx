import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../commons/api';
import Requetes from '../../commons/Requetes';
import ListeEntreprises from './ListeEntreprises';


const RechercheEntreprises = () => {
    const navigate = useNavigate()
    const [entreprises, setEntreprises] = useState(null);
    const getData = async () => {
        try {
            const result= await api.requestSql(Requetes.entreprises)
            setEntreprises(result.data)
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
                    Entreprises
                    <button className="btn btn-success pull-right"
                        onClick={()=>{navigate("/entreprises/edit")}}>
                        <i className="fa fa-plus mr-2"></i>Ajouter une entreprise
                    </button>
                </h5>
            </div>
            { entreprises && entreprises.length===0 && <div style={{border:'1px solid',padding:'2px 0'}}>Aucune donnée trouvée</div>}              
            { entreprises && entreprises.length >0 && <ListeEntreprises data={entreprises} getData={getData}/>}
        </div>
    );
}

export default RechercheEntreprises;
