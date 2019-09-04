import { DropdownItemProps } from "semantic-ui-react";

export interface IPersonOnUpdate extends DropdownItemProps {
    key: string,
    text: string,
    gender: String
}