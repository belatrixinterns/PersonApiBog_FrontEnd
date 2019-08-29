import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const CreatePersonButton = () => {
    return(
        <Link to="/person/create">
            <Button
            color="green"
            content="Create person"
            icon="add"
            labelPosition="left"
            size="medium"
            />
        </Link>
    );   
 }

  export default CreatePersonButton;