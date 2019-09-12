import { IKinshipNames } from "../component/shared/IKinshipNames";
import { IPerson } from "./IPerson";

export interface IKinshipsWithParents extends IKinshipNames{
    grandParentsFather?: (IPerson | undefined)[],
    grandParentsMother?: (IPerson | undefined)[],
}
