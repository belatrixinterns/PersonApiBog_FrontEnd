import { IKinshipNames } from "../component/shared/IKinshipNames";

export interface IKinshipsWithParents extends IKinshipNames{
    grandParentsFather?: IKinshipNames[],
    grandParentsMother?: IKinshipNames[]
}
