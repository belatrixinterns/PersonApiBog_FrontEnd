import React, { FunctionComponent } from "react";
import { Button } from "semantic-ui-react";
import GoBackButton from "./GoBackButton";
import Messages from '../shared/Messages'

type updateButtonsFormProps = {
    updateButtonHandler:any
}

const UpdateButtonsForm:FunctionComponent<updateButtonsFormProps> = (props) => {
        return(
            <div>               
                <Button className="submit_button"  floated='right' onClick={props.updateButtonHandler} type="submit" >
                    <i className="icon settings" /> Save
                </Button>
                <GoBackButton/>
            </div>
        );
    }

export default UpdateButtonsForm;