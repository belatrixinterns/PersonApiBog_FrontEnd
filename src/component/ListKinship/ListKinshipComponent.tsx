import React from "react";
import { IPerson } from "../../interfaces/IPerson";
import TableComponent from "../shared/TableComponent";
import { Column } from "react-table";
import { Button } from "semantic-ui-react";
import matchSorter from 'match-sorter';
import { Link } from "react-router-dom";
import { IRelation } from "../../interfaces/IRelation";
import { IListKinshipProps } from "../../interfaces/IListKindshipProps";
import CreateKinshipButton from "../shared/CreateKinshipButton";

const ListKinshipComponent: React.FC<IListKinshipProps> = (props) => {


  let columnsAccessor: Array<string> = [
    "personOne",
    "personTwo",
    "relation"
  ]
  let columns: Array<Column<IPerson>> = [
    {
      Header: "Full Name",
      columns: [
        {
          Header: "Person One",
          accessor: "personOne",
          filterable: false,
          filterMethod: filter,
          filterAll: true
        }
      ]
    },

    {
      Header: "Relation",
      columns: [
        {
          Header: "Relation",
          accessor: "relation",
          filterable: true,
          filterMethod: filter,
          filterAll: true

        }
      ]

    },
    {
      Header: "Full Name",
      columns: [
        {
          Header: "Person Two",
          accessor: "personTwo",
          filterable: true,
          filterMethod: filter,
          filterAll: true

        }
      ]

    },

    {
      Header: "Actions",
      filterable: false,
      sortable: false,
      filterMethod: filter,
      filterAll: true,
      Cell: row => {
        const relation: IRelation = row.original; return (
          <div>
            <Link to={`/kinship/update/${relation.id}`}>
              <Button
                className="circular ui icon button"
                primary
              >
                <i className="icon settings" />
              </Button>
            </Link>
              <Button
                onClick={() => props.handleDelete(relation)}
                className="circular ui icon button"
                color="red">
                <i className="icon trash" />
              </Button>
          </div >

        )
      },
    },
  ];

  function filter(filter: any, rows: any) {

    const result = matchSorter(rows, filter.value, {
      keys: ["relation", "personOne", "personTwo"],
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
      searchPlaceHolder="Search Realtionship..."
      button={CreateKinshipButton}>
    </TableComponent>)
}

export default ListKinshipComponent;