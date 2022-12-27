import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import api from '../../commons/api';
import DataTable from '../../commons/DataTable';

const ListeEntreprises = ({data,getData}) => {
    const navigate=useNavigate();
    const location=useLocation();
    const columns = [
        {
            text: '#ID',
            dataField: 'odenId',
            headerStyle:{width:'5%'},
        },
        {
          text: 'Code',
          dataField: 'odenCode',
          headerStyle:{width:'5%'},
        },
        {
          text: 'Nom',
          dataField: 'odenNom',
          classes:'link',
          events: {
              onClick: (e, column, columnIndex, row, rowIndex) => {
              navigate('/entreprises/edit',{state:{id:row.odenId}}) 
              },
          }
        },
        {
          text: 'Description',
          dataField: 'odenComment',
        },
        {
          text: 'Adresse',
          dataField: 'odenAddr1',
        },
        {
          text: 'CP',
          dataField: 'odenCodeposte',
          headerStyle:{width:'5%'},
        },
        {
          text: 'Ville',
          dataField: 'odenVille',
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
                  await api.post("/removeEntreprise",{id:row.odenId});
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

    console.log("location in ListeEntreprises",location)

    return (
        <DataTable
            keyField={'odenId'}
            columns={columns}
            data={data}
        />
 
    );
}

export default ListeEntreprises;
