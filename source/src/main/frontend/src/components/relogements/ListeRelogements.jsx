import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import api from '../../commons/api';
import DataTable from '../../commons/DataTable';

const ListeRelogements = ({data,getData}) => {
    const navigate=useNavigate();
    const location=useLocation();
    const columns = [
        {
            text: '#ID',
            dataField: 'relogement.odreId',
            headerStyle:{width:'5%'},
        },
        {
          text: 'Nom',
          dataField: 'relogement.odreNom',
          classes:'link',
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                navigate('/relogements/edit',{state:{id:row.relogement.odreId}}) 
                },
            }
        },
        {
          text: 'Type',
          dataField: 'type',
          headerStyle:{width:'5%'},
        },
        {
          text: 'Adresse',
          dataField: 'relogement.odreAdr1',
        },
        {
          text: 'CP',
          dataField: 'relogement.odreCpost',
          headerStyle:{width:'5%'},
        },
        {
          text: 'Ville',
          dataField: 'relogement.odreVille',
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
                  await api.post("/removeRelogement",{id:row.relogement.odreId});
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

    console.log("location in ListeRelogements",location)

    return (
        <DataTable
            keyField={'relogement.odreId'}
            columns={columns}
            data={data}
        />
 
    );
}

export default ListeRelogements;
