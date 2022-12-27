import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import api from '../../commons/api';
import DataTable from '../../commons/DataTable';

const ListeProprietaires = ({data,getData}) => {
    const navigate=useNavigate();
    const location=useLocation();
    const columns = [
        {
            text: '#ID',
            dataField: 'odproId',
            headerStyle:{width:'5%'},
        },
        {
          text: 'Civilité',
          dataField: 'odproCivil',
          headerStyle:{width:'5%'},
        },
        {
          text: 'Nom',
          dataField: 'odproNom',
          classes:'link',
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                navigate('/proprietaires/edit',{state:{id:row.odproId}}) 
                },
            }
        },
        {
          text: 'Prénom',
          dataField: 'odproPren',
        },
        {
          text: 'Adresse',
          dataField: 'odproAdr1',
        },
        {
          text: 'CP',
          dataField: 'odproCpost',
          headerStyle:{width:'5%'},
        },
        {
          text: 'Ville',
          dataField: 'odproVille',
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
                  await api.post("/removeProprietaire",{id:row.odproId});
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

    console.log("location in ListeProprietaires",location)

    return (
        <DataTable
            keyField={'odproId'}
            columns={columns}
            data={data}
        />
 
    );
}

export default ListeProprietaires;
