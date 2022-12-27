import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import api from '../../commons/api';
import DataTable from '../../commons/DataTable';

const ListeRues = ({data,getData}) => {
    const navigate=useNavigate();
    const location=useLocation();
    const columns = [
        {
            text: '#ID',
            dataField: 'odrueId',
            headerStyle:{width:'5%'},
        },
        {
          text: 'Code',
          dataField: 'odrueCode',
          headerStyle:{width:'5%'},
        },
        {
          text: 'Type',
          dataField: 'odrueType',
          headerStyle:{width:'10%'},
        },
        {
          text: 'Liaison',
          dataField: 'odrueLiaison',
          headerStyle:{width:'10%'},
        },
        {
          text: 'Nom',
          dataField: 'odrueNom',
          classes:'link',
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                navigate('/Rues/edit',{state:{id:row.odrueId}}) 
                },
            }
        },
        {
          text: 'CP',
          dataField: 'odrueCodeposte',
          headerStyle:{width:'5%'},
        },
        {
          text: 'Ville',
          dataField: 'odrueVille',
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
                  await api.post("/removeRue",{id:row.odrueId});
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

    console.log("location in ListeRues",location)

    return (
        <DataTable
            keyField={'odrueId'}
            columns={columns}
            data={data}
        />
 
    );
}

export default ListeRues;
