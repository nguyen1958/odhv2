import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import DataTable from '../../commons/DataTable';
import { dateToString } from '../../commons/Utils';

const ListeListing = ({resultat:{choix,data}}) => {
    
    const columnsImmeuble = [
        {
          text: 'Immeuble',
          dataField: 'cadastre',
          headerStyle:{width:'10%'},
        },
        {
          text: 'Syndic',
          dataField: 'syndic',
        },
        {
          text: 'Usage',
          dataField: 'usage',
        },
        {
          text: 'Type de propriété',
          dataField: 'typepropriete',
        },
        {
          text:'Adresse',
          dataField:'adresse'
        },
    ];

    const columnsProcedure = [
      {
        text: 'Immeuble',
        dataField: 'cadastre',
        headerStyle:{width:'10%'},
      },
      {
        text: 'Syndic',
        dataField: 'syndic',
      },
      {
        text: 'Procédure',
        dataField: 'id',
        headerStyle:{width:'10%'},
      },
      {
        text: 'Suiveur',
        dataField: 'suiveur',
      },
      {
        text:'Type de procédure',
        dataField:'typeprocedure'
      },
      {
        text: 'Date',
        dataField: 'date',
        formatter: (cellContent, row) => {
          return dateToString(cellContent)
        },
      },
      {
        text: 'Date fin',
        dataField: 'datefin',
        formatter: (cellContent, row) => {
          return dateToString(cellContent)
        },
      },
  ];


    return (
        <DataTable
            keyField={`id`}
            columns={choix==="immeuble"?columnsImmeuble:columnsProcedure}
            data={data}
        />
 
    );
}

export default ListeListing;
