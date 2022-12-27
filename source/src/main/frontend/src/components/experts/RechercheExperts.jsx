import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../commons/api';
import Requetes from '../../commons/Requetes';
import ListeExperts from './ListeExperts';


const RechercheExperts = () => {
    const navigate = useNavigate()
    const [experts, setExperts] = useState(null);
    const getData = async () => {
        try {
            const result= await api.requestSql(Requetes.experts)
            setExperts(result.data)
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
                    Experts
                    <button className="btn btn-success pull-right"
                        onClick={()=>{navigate("/experts/edit")}}>
                        <i className="fa fa-plus mr-2"></i>Ajouter un expert
                    </button>
                </h5>
            </div>
            { experts && experts.length===0 && <div style={{border:'1px solid',padding:'2px 0'}}>Aucune donnée trouvée</div>}              
            { experts && experts.length >0 && <ListeExperts data={experts} getData={getData}/>}
        </div>
    );
}

export default RechercheExperts;
