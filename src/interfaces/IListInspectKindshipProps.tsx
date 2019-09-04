import { IKinship} from "../component/shared/Ikindship";

export interface IIListInspectKindshipProps{
    data: IKinship[];
    handleDelete: Function;
    loading: boolean;

}