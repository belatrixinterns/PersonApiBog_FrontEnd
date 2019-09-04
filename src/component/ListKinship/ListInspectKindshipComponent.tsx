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
import Messages from '../shared/Messages';
import ReactTooltip from 'react-tooltip';

const ListInspectKindshipComponent: React.FC<IListKinshipProps> = (props) => {

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
                data-tip=""
                data-for="react-toooltip-update-kinship"
              >
                <i className="icon settings" />
              </Button>
              <ReactTooltip id="react-toooltip-update-kinship" type="info" place="right">
                {Messages.TOOLTIP_GO_TO_UPDATE_kINSHIP}
              </ReactTooltip>
            </Link>

            <Button
              onClick={() => props.handleDelete(relation)}
              className="circular ui icon button"
              color="red"
              data-tip=""
              data-for="react-toooltip-delete-kinship">
              <i className="icon trash" />
            </Button>
            <ReactTooltip id="react-toooltip-delete-kinship" type="error" place="right">
              {Messages.TOOLTIP_GO_DELETE_KINSHIP}
            </ReactTooltip>
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
      button={()=>{}}>
    </TableComponent>)
}

export default ListInspectKindshipComponent;