import { IKinshipNames } from "../component/shared/IKinshipNames";

export interface IListKinshipProps{
    data: IKinshipNames[];
    handleDelete: Function;
    loading: boolean;

}