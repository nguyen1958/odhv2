import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import DataTable from '../../commons/DataTable';

const ListeImmeubles = ({data}) => {
    const navigate=useNavigate();
    const location=useLocation();
    const columns = [
        {
            text: '#ID',
            dataField: 'id',
            headerStyle:{width:'10%'}
        },
        {
          text: 'Cadastre',
          dataField: 'cadastre',
          headerStyle:{width:'10%'},
          classes:'link',
          events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
              //console.log(columnIndex,column,rowIndex,row)
              console.log("row",row)
              navigate('./edit',{state:{id:row.id}}) 
            },
          }
        },
        {
          text: 'Adresse',
          dataField: 'nomrue',
        },
        {
          text: 'Lots',
          dataField: 'nblot',
          headerStyle:{width:'10%'},
          classes:'link',
          formatter:(cell,row)=>{
            if(row.nblot==0) return <span>Non</span>
            else return <span>Oui <span className="badge badge-light text-danger">{row.nblot}</span></span>
          },
          events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
              navigate('/lots',{state:{id:row.id,
                                       of:"immeuble",
                                       sujet:row.cadastre}}) 
            },
          }
        },
        {
          text: 'Procédures',
          dataField: 'nbprocedure',
          headerStyle:{width:'10%'},
          classes:'link',
          formatter:(cell,row)=>{
            if(row.nbprocedure==0) return <span>Non</span>
            return <span>Oui <span className="badge badge-light text-danger">{row.nbprocedure}</span></span>
          },
          events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
              navigate('/procedures',{state:{id:row.id,cadastre:row.cadastre}}) 
            },
          }
        },
        {
          text: 'Vision globale',
          dataField: 'df1',
          isDummyField: true,
          formatter: (cellContent, row) => {
            return <span>Voir</span>
          },
          headerStyle:{width:'10%'},
          classes:'link',
          events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
              navigate('./detail',{state:{id:row.id}}) 
            },
          }
        }
    ];

    console.log("location in listeImmeubles",location)

    return (
        <DataTable
            keyField={`id`}
            columns={columns}
            data={data}
        />
 
    );
}

export default ListeImmeubles;
