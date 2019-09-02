import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';

const CreateKinshipButtonHomePage = () => {
    return (
        <div>
            <Link to="/kinship/create">
                <Button
                    color="teal"
                    content="Create kinship"
                    icon="add"
                    labelPosition="left"
                    size="medium"
                    className="button-size"
                    data-tip=""
                    data-for="react-toooltip-create-kinship"
                />
            </Link>
            <ReactTooltip id="react-toooltip-create-kinship" type="info" place="right">
                Througd this Button you can go to the Create kinship from.
            </ReactTooltip>

        </div>

    );
}


export default CreateKinshipButtonHomePage;