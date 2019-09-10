import { DropdownItemProps } from "semantic-ui-react";

export interface INationality extends DropdownItemProps {
    text: string,
    value: string,
    key: number,
    label: string
}