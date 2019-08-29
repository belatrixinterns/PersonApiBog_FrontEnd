import React from "react";
import { Button } from "semantic-ui-react";
import GoBackButton from "./GoBackButton";

const createButtonsForm = () => {
        return(
            <div>
                <Button className="submit_button" floated='right' type="submit" content="Add" icon="add" />
                <GoBackButton/>
            </div>
        );
    }

export default createButtonsForm;