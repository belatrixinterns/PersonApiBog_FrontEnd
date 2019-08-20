import React, { useState } from "react";
import TableComponent  from "../../shared/TableComponent"
import { Column } from "react-table";
import { IPerson } from "../../interfaces/IPerson";

const [people, setPeople] = useState<Array<IPerson>>([]);

  export class ListPersonTable extends React.Component{

    columns: Array<Column<IPerson>> = [
        {
          Header: "First Name",
          accessor: "name"
        },
        {
          Header: "Last Name",
          accessor: "last_name"
        },
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
          Cell: props => <span className="number">{props.value}</span>
        },
        {
          Header: "Actions",
          filterable: false,
          Cell: row => (
            <div>
              <button
                 onClick={() => this.handleUpdate(row.original)}
                className="circular ui icon button"
              >
                <i className="icon settings" />
              </button>
              <button
               onClick={() => this.handleDelete(row.original)}
               className="circular ui icon button">
               <i className="icon trash"/>
              
               </button>
            </div>
            
          ),
        }
      ];

    getPeople(){
      fetch('https://personapibogbackend.herokuapp.com/person/')
      .then(response => response.json())
      .then(posts => setPeople(posts))
      .catch(err => console.log(err.message))
    }

    handleUpdate(row: any){
        console.log(row);
    }

    handleDelete(row: any){

    }

    public render(){
        return (<div>
            <TableComponent data={[]} columns={this.columns}></TableComponent>
            </div>
        );
    }
  }