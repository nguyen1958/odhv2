import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import api from '../../commons/api';
import DataTable from '../../commons/DataTable';

const ListeUtilisateurs = ({data,getData}) => {
    const navigate=useNavigate();
    const location=useLocation();
    const columns = [
        {
            text: '#ID',
            dataField: 'odutiId',
            headerStyle:{width:'5%'},
        },
        {
          text: 'Utilisateur',
          dataField: 'odutiUtilisateur',
          classes:'link',
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                navigate('/utilisateurs/edit',{state:{id:row.odutiId}}) 
                },
            }
        },
        {
          text: 'Nom',
          dataField: 'odutiNom',
        },
        {
          text: 'Prénom',
          dataField: 'odutiPrenom',
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
                  await api.post("/removeUtilisateur",{id:row.odutiId});
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

    console.log("location in ListeUtilisateurs",location)

    return (
        <DataTable
            keyField={'odutiId'}
            columns={columns}
            data={data}
        />
 
    );
}

export default ListeUtilisateurs;
