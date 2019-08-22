import { TableProps } from "react-table";

export interface ITableProps {
    data: TableProps["data"];
    columns: TableProps["columns"];
    columnsAccessor: Array<string>;
    loading: boolean;
    searchPlaceHolder:string;
    button: React.FC;
}