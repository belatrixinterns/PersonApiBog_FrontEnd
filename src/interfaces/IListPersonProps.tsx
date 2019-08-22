import { IPerson } from "./IPerson";

export interface IListPersonProps{
    data: IPerson[];
    handleUpdate: Function;
    handleDelete: Function;
    handleInspect: Function;
    loading: boolean;

}