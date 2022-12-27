import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import api from '../../commons/api';
import DataTable from '../../commons/DataTable';

const ListeSuiveurs = ({data,getData}) => {
    const navigate=useNavigate();
    const location=useLocation();
    const columns = [
        {
            text: '#ID',
            dataField: 'odsuId',
            headerStyle:{width:'5%'},
        },
        {
          text: 'Libellé',
          dataField: 'odsuLibelle',
        },
        {
          text: 'Civilité',
          dataField: 'odsuCivil',
          headerStyle:{width:'5%'},
        },
        {
          text: 'Nom',
          dataField: 'odsuNom',
          classes:'link',
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                navigate('/suiveurs/edit',{state:{id:row.odsuId}}) 
                },
            }
        },
        {
          text: 'Prénom',
          dataField: 'odsuPren',
        },
        {
          text: 'Adresse',
          dataField: 'odsuAdr1',
        },
        {
          text: 'CP',
          dataField: 'odsuCpost',
          headerStyle:{width:'5%'},
        },
        {
          text: 'Ville',
          dataField: 'odsuVille',
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
                  await api.post("/removeSuiveur",{id:row.odsuId});
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

    console.log("location in ListeSuiveurs",location)

    return (
        <DataTable
            keyField={'odsuId'}
            columns={columns}
            data={data}
        />
 
    );
}

export default ListeSuiveurs;
