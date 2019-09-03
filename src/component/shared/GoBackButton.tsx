import { createBrowserHistory } from 'history';
import React from 'react';
import { Button } from 'semantic-ui-react';
import Messages from '../shared/Messages'
import ReactTooltip from 'react-tooltip';

const history = createBrowserHistory();

const GoBackButton: React.FC = () => {

    function goBack(event: any) {
        event.preventDefault();
        history.goBack();
    }

    return (
        <div>
            <Button
                className="go_back_button"
                content="Go back"
                icon="arrow circle left"
                onClick={(e) => goBack(e)}
                data-tip=""
                data-for="react-toooltip-goback"
            >
            </Button>
            <ReactTooltip id="react-toooltip-goback" type="error" place="right">
                {Messages.TOOLTIP_GO_BACK}
            </ReactTooltip>
        </div>
    )
}

export default GoBackButton;