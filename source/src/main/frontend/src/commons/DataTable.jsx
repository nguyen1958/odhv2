import React, { useEffect } from 'react';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const DataTable = (props) => {
    const {data,columns,keyField,filterValue}=props
    const { SearchBar } = Search
    const optionBase={
        sort:true,
        headerAlign: 'center',
        align:'center',
    }
  
    useEffect(() => {
        console.log("in effect props of dataTable",props)
        return () => {};
    }, []);

    const MyExportCSV = (props) => {
        const handleClick = () => {
          props.onExport();
        };
        return  <button className="exportcsv btn btn-sm btn-secondary m-2" 
                    onClick={ handleClick }>Export au format CSV
                </button> 
      };
    //Options pour composant pagination
    const options={
        hidePageListOnlyOnePage:true,
        sizePerPageList: [
            {text: '15', value: 15},
            {text: '25', value: 25},
            {text: '30', value: 30},
            {text: '50', value: 50},
        ]
    }

//searchFomatted and filterValue sont incompatible
//On ne peut configurer l'un ou l'autre (tous avec formatter ou tous avec filterValue)
//searchFormatted=> appliquer le filtre sur le résultat retourné par le formatter - cellui-ci prime sur l'autre
//filtervalue => appliquer le filtre sur le résultat retourné par filterValue, utiliser lorsqu'il ya un formatter
//qui retourne un objet jsx (tags) au lieu de string
    return <ToolkitProvider
            keyField={keyField}
            data={ data }
            columns={columns.map((item)=>({...optionBase,...item}))}
            search= { { searchFormatted: filterValue ? false : true } } 
            exportCSV >
                {
                    props => {
                        console.log("props of toolkitProvider",props)
                        return (
                            <div>                          
                                <div className="row justify-content-center align-items-center mx-1">
                                    <span className="mx-2 bold">Filtre</span>
                                    <SearchBar { ...props.searchProps } placeholder=" "/>   
                                    <MyExportCSV {...props.csvProps } />
                                    <span className="ml-auto" >Résultat : {data.length}</span> 
                                </div>                         
                                  
                                <BootstrapTable
                                    {...props.baseProps}
                                    bootstrap4
                                    condensed 
                                    pagination={ paginationFactory(options) }             
                                />
                            </div>
                        )
                    }
                }
            </ToolkitProvider>
}

export default DataTable;
