import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import api from '../../commons/api';
import DataTable from '../../commons/DataTable';

const ListeSyndics = ({data,getData}) => {
    const navigate=useNavigate();
    const location=useLocation();
    const columns = [
        {
            text: '#ID',
            dataField: 'odsynId',
            headerStyle:{width:'5%'},
        },
        {
          text: 'Code',
          dataField: 'odsynCode',
          headerStyle:{width:'5%'},
        },
        {
          text: 'Raison sociale',
          dataField: 'odsynRaison',
          classes:'link',
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                navigate('/Syndics/edit',{state:{id:row.odsynId}}) 
                },
            }
        },
        {
          text: 'Adresse',
          dataField: 'odsynAdr1',
        },
        {
          text: 'CP',
          dataField: 'odsynCpost',
          headerStyle:{width:'5%'},
        },
        {
          text: 'Ville',
          dataField: 'odsynVille',
          headerStyle:{width:'10%'},
        },
        {
          text: '',
          dataField: 'dummy',
          isDummyField: true,
          headerStyle:{width:'2%'},
          formatter: (cellContent, row)=><i className="fa fa-trash cursor text-danger"></i>,
          events: {
            onClick: async (e, column, columnIndex, row, rowIndex) => {
              try{
                let result = window.confirm("Voulez-vous certain de faire cette suppression ?");
                if(result){
                  await api.post("/removeSyndic",{id:row.odsynId});
                  getData()
                }
              }
              catch(error){
                alert(error)
              }
            },
          }
        },
    ];

    console.log("location in ListeSyndics",location)

    return (
        <DataTable
            keyField={'odsynId'}
            columns={columns}
            data={data}
        />
 
    );
}

export default ListeSyndics;
