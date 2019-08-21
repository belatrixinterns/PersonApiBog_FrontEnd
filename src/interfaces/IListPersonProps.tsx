import { IPerson } from "./IPerson";

export interface IListPersonProps{
    data: IPerson[];
    handleUpdate: Function;
    handleDelete: Function;
    loading: boolean;
}