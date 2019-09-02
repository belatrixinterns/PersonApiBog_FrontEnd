import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';

const ListPersonButton = () => {
    return (
        <div>
            <Link to="/persons">
                <Button className="button-size"
                    color="blue"
                    content="List person"
                    icon="users"
                    labelPosition="left"
                    size="medium"
                    data-tip=""
                    data-for="react-toooltip-list"
                />
            </Link>
            <ReactTooltip id="react-toooltip-list" type="dark" place="right">
                Througd this Button you can go to see the Persons.
            </ReactTooltip>
        </div>
    );
}


export default ListPersonButton;
