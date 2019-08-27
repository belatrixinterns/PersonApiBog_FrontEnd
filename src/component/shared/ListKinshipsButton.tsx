import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ListKinshipsButton = () => {
    return (
        <Link to="/kinships">
            <Button
                className="button-size"
                color="instagram"
                content="List kinships"
                icon="sitemap"
                labelPosition="left"
                size="medium"
            />
        </Link>
    );
}


export default ListKinshipsButton;
