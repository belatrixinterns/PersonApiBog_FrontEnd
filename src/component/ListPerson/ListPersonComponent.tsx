import React, { useState } from "react";
import { IPerson } from "../../interfaces/IPerson";
import TableComponent from "../shared/TableComponent";
import { Column } from "react-table";
import { IListPersonProps } from "../../interfaces/IListPersonProps";
import { Button } from "semantic-ui-react";

const ListPersonComponent: React.FC<IListPersonProps> = (props) => {

    let columns:Array<Column<IPerson>> = [
        {
          Header: "Name",
          columns: [
            {
            Header: "First Name",
            accessor: "name",
            filterable: false,
            },
            {
            Header: "Last Name",
            accessor: "last_name",
            filterable: false
            }
          ]
        },
        
        {
          Header: "Document",
          columns: [
            {
              Header: "Document Type",
          accessor: "document_type",
          Filter: ({ filter, onChange }) => (
            <select
              onChange={event => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : "all"}
            >
              <option value="">Show All</option>
              <option value="CC">CC</option>
              <option value="CE">CE</option>
              <option value="TI">TI</option>
            </select>
          ) 
            },
            {
              Header: "Document ID",
              accessor: "document_id",
              filterable: false,
              Cell: props => <span className="number">{props.value}</span>
            },
          ]
         
        },
        
        {
          Header: "Actions",
          filterable: false,
          sortable: false,
              Cell: row => (
                <div>
                  
                  <Button
                    onClick={() => props.handleUpdate(row.original)}
                    className="circular ui icon button"
                    primary
                  >
                    <i className="icon settings" />
                  </Button>
                  <Button
                  onClick={() => props.handleDelete(row.original)}
                  className="circular ui icon button"
                  color="red">
                  <i className="icon trash"/>
        
                  </Button>
                </div>
                
              ),
        }
      ];
    
    
    return(<TableComponent columns={columns} data={props.data} loading={props.loading}></TableComponent>)
}

export default ListPersonComponent;