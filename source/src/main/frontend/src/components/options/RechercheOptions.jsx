import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../commons/api';
import Requetes from '../../commons/Requetes';
import { natures } from '../../constantes/constante';
import images from '../../constantes/images';
import FormControl from '../../formik/FormControl';
import ListeOptions from './ListeOptions';


const RechercheOptions = () => {
    const navigate = useNavigate()
    //get reference to formik component
    const formikRef = useRef();
    const [options, setOptions] = useState([]);

    const getData = async (type) => {
        try {
            console.log("getData")
            const result= await api.requestSql(Requetes.optionByType(type))
            setOptions(result.data)
        }
        catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        console.log("getdata")
        getData(initialValues.typeOption)
        return () => {};
    }, []);

    const initialValues = {               
        typeOption:"A",            
    };

    return (
        <Formik innerRef={formikRef}
                initialValues={initialValues} >
        {
            (formik) => (
            <div>
                <div className="row bold mb-1">
                    <span><img src={images.logoMaintenance} alt="maintenance" /></span>{`Référentiel / Natures `}
                    <FormControl control="select" className="col-2" name="typeOption"
                        onChange={(e)=>{
                            console.log(e.target.value)
                            formik.setFieldValue("typeOption",e.target.value)
                            getData(e.target.value)
                        }}>
                        {
                            natures?.map((item,index)=><option key={index} value={item.value}>{item.key}</option>)                                        
                        }
                    </FormControl>
                    <Link to="/options/edit">{`Ajouter une option`}</Link>
                </div>
                <div className="container">
                { options && options.length===0 && <div style={{border:'1px solid',padding:'2px 0'}}>Aucune donnée trouvée</div>}              
                { options && options.length >0 && <ListeOptions data={options} getData={getData}/>}
                </div>               
            </div>
            )
        }
        </Formik>
    );
}

export default RechercheOptions;
