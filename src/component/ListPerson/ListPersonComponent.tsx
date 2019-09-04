import React from "react";
import { IPerson } from "../../interfaces/IPerson";
import TableComponent from "../shared/TableComponent";
import { Column } from "react-table";
import { IListPersonProps } from "../../interfaces/IListPersonProps";
import { Button } from "semantic-ui-react";
import matchSorter from 'match-sorter';
import CreatePersonButton from "../shared/CreatePersonButton";
import { Link } from "react-router-dom";
import Messages from '../shared/Messages';
import ReactTooltip from 'react-tooltip';

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
          <div >
            <Link to={`person/update/${person.id}`}>
              <Button
                className="circular ui icon button"
                primary
                data-tip=""
                data-for="react-toooltip-update-person"
              >
                <i className="icon settings" />
              </Button>
              <ReactTooltip id="react-toooltip-update-person" type="info" place="right">
                {Messages.TOOLTIP_GO_UPDATE_PERSON}
              </ReactTooltip>
            </Link>
            <Button
              onClick={() => props.handleDelete(person)}
              className="circular ui icon button"
              color="red"
              data-tip=""
              data-for="react-toooltip-delete-person"
            >
              <i className="icon trash" />
            </Button>
            <ReactTooltip id="react-toooltip-delete-person" type="error" place="right">
              {Messages.TOOLTIP_GO_DELETE_PERSON}
            </ReactTooltip>
            <Link to={`person/inspect/${person.id}`}>
              <Button

                className="circular ui icon button"
                color="black"
                data-tip=""
                data-for="react-toooltip-inspect-person"
              >
                <i className="icon eye" />
              </Button>
              <ReactTooltip id="react-toooltip-inspect-person" type="dark" place="right">
                {Messages.TOOLTIP_GO_INSPECT_PERSON}
              </ReactTooltip>
            </Link>

            <Link to={`person/inspect/${person.id}/kinships`}>
              <Button
                className="circular ui icon button"
                color="teal"
                data-tip=""
                data-for="react-toooltip-inspect-person´s kainships"
              >
                <i className="icon users" />
              </Button>
              <ReactTooltip id="react-toooltip-inspect-person´s kainships" type="dark" place="right">
                {Messages.TOOLTIP_GO_INSPECT_PERSONS_KINSHIPS}
              </ReactTooltip>
            </Link>
          </div >

        )
      }

      ,
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
    <div>
      <h2 className="person_form_container">List Person</h2>
      <TableComponent
        columns={columns}
        data={props.data}
        loading={props.loading}
        columnsAccessor={columnsAccessor}
        searchPlaceHolder="Search person..."
        button={CreatePersonButton}>
      </TableComponent>
    </div>
  )
}

export default ListPersonComponent;