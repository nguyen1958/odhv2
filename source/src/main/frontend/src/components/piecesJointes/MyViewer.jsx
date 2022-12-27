import React,{ useState } from 'react';
import api from '../../commons/api'

import { useLocation } from 'react-router-dom';
const MyViewer = () => {
    const {state}=useLocation()
    const url= async ()=> await api.post("/loadFile",{path:state.path})
    return (
        <div>          
            {window.open(`http://localhost:8080/loadFile?path=${state.path}`)}
        </div>
    );
}

export default MyViewer;
