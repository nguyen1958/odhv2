import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import api from '../../commons/api';
import DataTable from '../../commons/DataTable';

const ListeOptions = ({data,getData}) => {
    const navigate=useNavigate();
    const location=useLocation();
    const columns = [
        {
            text: '#ID',
            dataField: 'odntId',
            headerStyle:{width:'5%'},
        },
        {
          text: 'Nom',
          dataField: 'odntNom',
          classes:'link',
          events: {
              onClick: (e, column, columnIndex, row, rowIndex) => {
              navigate('/Options/edit',{state:{type:row.odntType,id:row.odntId}}) 
              },
          }
        },
        {
          text: '',
          dataField: 'dummy',
          isDummyField: true,
          headerStyle:{width:'5%'},
          formatter: (cellContent, row)=><i className="fa fa-trash cursor text-danger"></i>,
          events: {
            onClick: async (e, column, columnIndex, row, rowIndex) => {
              try{
                let result = window.confirm("Voulez-vous certain de faire cette suppression ?");
                if(result){
                  await api.post("/removeOption",{id:row.odntId});
                  getData(row.odntType)
                }
              }
              catch(error){
                alert(error)
              }
            },
          }
        },
    ];

    console.log("location in ListeOptions",location)

    return (
        <DataTable
            keyField={'odntId'}
            columns={columns}
            data={data}
        />
 
    );
}

export default ListeOptions;
