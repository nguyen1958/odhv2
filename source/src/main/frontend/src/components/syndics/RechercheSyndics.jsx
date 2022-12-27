import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../commons/api';
import Requetes from '../../commons/Requetes';
import ListeSyndics from './ListeSyndics';


const RechercheSyndics = () => {
    const navigate = useNavigate()
    const [syndics, setSyndics] = useState(null);
    const getData = async () => {
        try {
            const result= await api.requestSql(Requetes.syndics)
            setSyndics(result.data)
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
                    Syndics
                    <button className="btn btn-success pull-right"
                        onClick={()=>{navigate("/syndics/edit")}}>
                        <i className="fa fa-plus mr-2"></i>Ajouter un syndic
                    </button>
                </h5>
            </div>
            { syndics && syndics.length===0 && <div style={{border:'1px solid',padding:'2px 0'}}>Aucune donnée trouvée</div>}              
            { syndics && syndics.length >0 && <ListeSyndics data={syndics} getData={getData}/>}
        </div>
    );
}

export default RechercheSyndics;
