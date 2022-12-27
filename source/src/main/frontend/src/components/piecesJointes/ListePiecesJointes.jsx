import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../commons/api';

const ListePiecesJointes = ({documents,photos,immId,procId}) => {
    const navigate=useNavigate()
    const clickHandler= (item)=>{
        console.log("url",item.url)
        window.open(item.url)  
    }

    return (
        <div className="d-flex">
            <div className="flex-fill">
                <table className="table table-sm table-bordered">
                    <thead className="bold text-center bg-light">
                        <tr>
                            <th>Documents</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            documents?.map((item,index)=>(
                                <tr className="link" key={index}>
                                    <td onClick={()=>clickHandler(item)}>{item.name}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="flex-fill">
            <table className="table table-sm table-bordered">
                <thead className="bold text-center bg-light">
                    <tr>
                        <th>Photos</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        photos?.map((item,index)=>(
                            <tr  className="link" key={index}>
                                <td onClick={()=>clickHandler(item)}>{item.name}</td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
                
            </div>           
        </div>
    );
}

export default ListePiecesJointes;
