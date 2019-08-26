import { IPerson } from "./IPerson";

export interface IListPersonProps{
    data: IPerson[];
    handleDelete: Function;
    loading: boolean;

}