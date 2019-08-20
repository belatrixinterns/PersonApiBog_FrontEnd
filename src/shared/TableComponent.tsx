import React from "react";
import ReactTable from "react-table";
import { ITableProps } from "../interfaces/ITableProps";


class TableComponent extends React.Component<ITableProps> {
    public render() {
        return <ReactTable
        data={this.props.data} 
        columns={this.props.columns} 
        filterable={true} 
        defaultPageSize={10}
        pageSizeOptions={[5, 10, 20]} />;
    }
}

export default TableComponent;