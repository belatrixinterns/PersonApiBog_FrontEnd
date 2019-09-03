import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const CreateKinshipButton = () => {
    return(
        <Link to="/kinship/create">
            <Button
            className="redirect_create_button"
            color="green"
            content="Create kinship"
            icon="add"
            labelPosition="left"
            size="medium"
            />
        </Link>
    );   
 }
  

  export default CreateKinshipButton;