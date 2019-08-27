import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ListPersonButton = () => {
    return(
        <Link to="/persons">
            <Button className="button-size"
            color="blue"
            content="List person"
            icon="users"
            labelPosition="left"
            size="medium"
            />
        </Link>
    );   
 }
  

  export default ListPersonButton;