import React, { FunctionComponent } from "react";
import { Button } from "semantic-ui-react";
import GoBackButton from "./GoBackButton";
    
type updateButtonsFormProps = {
    handleSubmit:any
}

const CreateButtonsForm:FunctionComponent<updateButtonsFormProps> = (props) => {
        return(
            <div>               
                <Button className="submit_button"  floated='right' onClick={props.handleSubmit} >
                    <i className="icon settings" /> Add
                </Button>
                <GoBackButton/>
            </div>
        );
    }

export default CreateButtonsForm;