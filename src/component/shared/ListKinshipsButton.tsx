import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import Messages from '../shared/Messages'

const ListKinshipsButton = () => {
    return (
        <div>
            <Link to="/kinships">
                <Button
                    className="button-size"
                    color="instagram"
                    content="List kinships"
                    icon="list alternate outline"
                    labelPosition="left"
                    size="medium"
                    data-tip=""
                    data-for="react-toooltip-kinship"
                />
            </Link>
            <ReactTooltip id="react-toooltip-kinship" type="dark" place="right">
                {Messages.TOOLTIP_LIST_KINSHIP}
                </ReactTooltip>
        </div>
    );
}


export default ListKinshipsButton;
