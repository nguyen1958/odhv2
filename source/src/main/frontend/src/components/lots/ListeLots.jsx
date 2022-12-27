import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import DataTable from '../../commons/DataTable';

const ListeLots = ({data}) => {
    const navigate=useNavigate();
    const location=useLocation();
    const columns = [
        {
          text: 'Lot',
          dataField: 'lot',
          headerStyle:{width:'10%'},
          classes:'link',
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                navigate('/lots/edit',{state:{id:row.id,immId:row.immId}}) 
                },
            }
        },
        {
          text: 'Immeuble',
          dataField: 'cadastre',
          headerStyle:{width:'10%'},
          classes:'link',
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                navigate('/immeubles/edit',{state:{id:row.immId}}) 
                },
            }
        },
        {
          text: 'Type',
          dataField: 'typelot',
          headerStyle:{width:'10%'},
        },
        {
          text: 'Propriétaire',
          dataField: 'proprietaire',
          classes:'link',
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                navigate('/proprietaires/edit',{state:{id:row.proId}})  
                },
            }
        },
        {
          text: 'Locataire',
          dataField: 'locataire',
          classes:'link',
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                navigate('/locataires/edit',{state:{id:row.locId}}) 
                },
            }
        },
        {
          text: 'Historique',
          dataField: 'df1',
          isDummyField: true,
          formatter: (cellContent, row) => {
            return <span>Voir</span>
          },
          headerStyle:{width:'10%'},
          classes:'link',
          events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
              console.log("row",row)
              navigate('/lots/historique',{state:{id:row.id,immId:row.immId}}) 
            },
        }
      }
    ];

    console.log("location in listeLots",location)

    return (
        <DataTable
            keyField={'id'}
            columns={columns}
            data={data}
        />
 
    );
}

export default ListeLots;