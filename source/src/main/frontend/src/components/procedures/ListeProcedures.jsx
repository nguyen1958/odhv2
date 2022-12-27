import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import DataTable from '../../commons/DataTable';
import { dateToString } from '../../commons/Utils';

const ListeProcedures = ({data}) => {
    const navigate=useNavigate();
    const location=useLocation();
    const columns = [
        {
            text: 'Dossier',
            dataField: 'id',
            headerStyle:{width:'10%'},
            classes:'link',
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                //console.log(columnIndex,column,rowIndex,row)
                navigate('/procedures/edit',{state:{id:row.id,immId:row.immId}}) 
                },
            }
        },
        {
          text: 'Date',
          dataField: 'date',
          formatter: (cellContent, row) => {
            return dateToString(cellContent)
          },
        },
        {
          text: 'Date Fin',
          dataField: 'datefin',
          formatter: (cellContent, row) => {
            return dateToString(cellContent)
          },
        },
        {
          text: 'Type de procédure',
          dataField: 'type',
        },
        {
          text: 'Suiveur',
          dataField: 'suiveur',
        }
    ];

    console.log("location in listeProcedures",location)

    return (
        <DataTable
            keyField={'id'}
            columns={columns}
            data={data}
        />
 
    );
}

export default ListeProcedures;
