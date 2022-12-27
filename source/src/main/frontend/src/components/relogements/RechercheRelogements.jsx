import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../commons/api';
import Requetes from '../../commons/Requetes';
import ListeRelogements from './ListeRelogements';


const RechercheRelogements = () => {
    const navigate = useNavigate()
    const [relogements, setRelogements] = useState(null);
    const getData = async () => {
        try {
            const result= await api.requestSql(Requetes.relogements)
            setRelogements(result.data)
            console.log("data",result.data)
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
                    Relogements
                    <button className="btn btn-success pull-right"
                        onClick={()=>{navigate("/relogements/edit")}}>
                        <i className="fa fa-plus mr-2"></i>Ajouter un relogement
                    </button>
                </h5>
            </div>
            { relogements && relogements.length===0 && <div style={{border:'1px solid',padding:'2px 0'}}>Aucune donnée trouvée</div>}              
            { relogements && relogements.length >0 && <ListeRelogements data={relogements} getData={getData}/>}
        </div>
    );
}

export default RechercheRelogements;
