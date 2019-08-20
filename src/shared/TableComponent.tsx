import React from "react";
import ReactTable, { TableProps } from "react-table";


const TableComponent = (props: TableProps) => {
    return <ReactTable
        data={props.data} 
        columns={props.columns} 
        filterable={false} 
        pageSize={10}
        pageSizeOptions={[5, 10, 20]} />;
}

export default TableComponent;