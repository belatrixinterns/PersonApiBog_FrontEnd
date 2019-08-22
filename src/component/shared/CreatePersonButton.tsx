import React from "react";
import { Button } from "semantic-ui-react";

const createPersonButton: React.FC = () =>{
    return(<Button
      color="green"
      content="Create person"
      icon="add"
      labelPosition="left"
  ></Button>)
  }

  export default createPersonButton;