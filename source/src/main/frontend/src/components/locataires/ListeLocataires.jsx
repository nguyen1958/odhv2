import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import api from '../../commons/api';
import DataTable from '../../commons/DataTable';


const ListeLocataires = ({data,getData}) => {
    const navigate=useNavigate();
    const location=useLocation();
    const columns = [
      {
          text: '#ID',
          dataField: 'odlocId',
          headerStyle:{width:'5%'},
      },
      {
        text: 'Civilité',
        dataField: 'odlocCivil',
        headerStyle:{width:'5%'},
      },
      {
        text: 'Nom',
        dataField: 'odlocNom',
        classes:'link',
        events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
            navigate('/locataires/edit',{state:{id:row.odlocId}}) 
            },
        }
      },
      {
        text: 'Prénom',
        dataField: 'odlocPren',
      },
      {
        text: 'Adresse',
        dataField: 'odlocAdr1',
      },
      {
        text: 'CP',
        dataField: 'odlocCpost',
        headerStyle:{width:'5%'},
      },
      {
        text: 'Ville',
        dataField: 'odlocVille',
        headerStyle:{width:'15%'},
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
                await api.post("/removeLocataire",{id:row.odlocId});
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

    console.log("location in listeLocataires",location)

    return (
        <DataTable
            keyField={'odlocId'}
            columns={columns}
            data={data}
        />
 
    );
}

export default ListeLocataires;
