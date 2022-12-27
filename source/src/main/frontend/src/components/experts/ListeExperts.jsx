import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import api from '../../commons/api';
import DataTable from '../../commons/DataTable';

const ListeExperts = ({data,getData}) => {
    const navigate=useNavigate();
    const location=useLocation();
    const columns = [
        {
            text: '#ID',
            dataField: 'odexpId',
            headerStyle:{width:'5%'},
        },
        {
          text: 'Code',
          dataField: 'odexpCode',
          headerStyle:{width:'5%'},
        },
        {
          text: 'Civilité',
          dataField: 'odexpCivil',
          headerStyle:{width:'5%'},
        },
        {
          text: 'Nom',
          dataField: 'odexpNom',
          classes:'link',
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                navigate('/Experts/edit',{state:{id:row.odexpId}}) 
                },
            }
        },
        {
          text: 'Prénom',
          dataField: 'odexpPren',
        },
        {
          text: 'Adresse',
          dataField: 'odexpAdr1',
        },
        {
          text: 'CP',
          dataField: 'odexpCpost',
          headerStyle:{width:'5%'},
        },
        {
          text: 'Ville',
          dataField: 'odexpVille',
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
                  await api.post("/removeExpert",{id:row.odexpId});
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

    console.log("location in ListeExperts",location)

    return (
        <DataTable
            keyField={'odexpId'}
            columns={columns}
            data={data}
        />
 
    );
}

export default ListeExperts;
