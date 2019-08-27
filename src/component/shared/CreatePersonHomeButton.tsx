import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const CreatePersonHomeButton = () => {
    return(
        <Link to="/person/create" className="button-size">
            <Button className="button-size"
            color="green"
            content="Create person"
            icon="add"
            labelPosition="left"
            size="medium"
            />
        </Link>
    );   
 }
  

  export default CreatePersonHomeButton;