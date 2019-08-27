import React from "react";
import { IPerson } from "../../interfaces/IPerson";
import TableComponent from "../shared/TableComponent";
import { Column } from "react-table";
import { IListPersonProps } from "../../interfaces/IListPersonProps";
import { Button } from "semantic-ui-react";
import matchSorter from 'match-sorter';
import CreatePersonButton from "../shared/CreatePersonButton";
import { Link } from "react-router-dom";

const ListPersonComponent: React.FC<IListPersonProps> = (props) => {

  let columnsAccessor: Array<string> = [
    "name",
    "last_name",
    "document_type",
    "document_id"
  ]
  let columns: Array<Column<IPerson>> = [
    {
      Header: "Name",
      columns: [
        {
          Header: "First Name",
          accessor: "name",
          filterable: false,
          filterMethod: filter,
          filterAll: true
        },
        {
          Header: "Last Name",
          accessor: "last_name",
          filterMethod: filter,
          filterable: false,
          filterAll: true,

        },
      ]
    },

    {
      Header: "Document",
      columns: [
        {
          Header: "Document Type",
          accessor: "document_type",
          filterable: true,
          filterMethod: filter,
          filterAll: true

        },
        {
          Header: "Document ID",
          accessor: "document_id",
          filterable: false,
          filterMethod: filter,
          filterAll: true,
          Cell: props => <span className="number">{props.value}</span>
        },
      ]

    },

    {
      Header: "Actions",
      filterable: false,
      sortable: false,
      filterMethod: filter,
      filterAll: true,
      Cell: row => {
        const person: IPerson = row.original; return (
          <div>
            <Link to={`person/update/${person.id}`}>
              <Button
                className="circular ui icon button"
                primary
              >
                <i className="icon settings" />
              </Button>
            </Link>
            <Button
              onClick={() => props.handleDelete(person)}
              className="circular ui icon button"
              color="red">
              <i className="icon trash" />
            </Button>
            <Link to={`person/inspect/${person.id}`}>
              <Button

                className="circular ui icon button"
                color="black">
                <i className="icon eye" />

              </Button>
            </Link>
          </div >

        )
      },
    },
  ];

  function filter(filter: any, rows: any) {

    const result = matchSorter(rows, filter.value, {
      keys: ["name", "last_name", "document_id", "document_type"],
      threshold: matchSorter.rankings.WORD_STARTS_WITH
    });
    return result;
  }

  return (
    <TableComponent
      columns={columns}
      data={props.data}
      loading={props.loading}
      columnsAccessor={columnsAccessor}
      searchPlaceHolder="Search person..."
      button={CreatePersonButton}>
    </TableComponent>)
}

export default ListPersonComponent;