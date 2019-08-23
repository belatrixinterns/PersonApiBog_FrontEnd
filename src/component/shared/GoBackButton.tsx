import { createBrowserHistory } from 'history';
import React from 'react';
import { Button } from 'semantic-ui-react';

const history = createBrowserHistory();

const GoBackButton: React.FC = () => {

    function goBack(event: any){
        event.preventDefault();
        history.goBack();
    }

    return(
        <Button content="Go back" icon="icon arrow circle left" onClick={(e) => goBack(e)}></Button>
    )
}

export default GoBackButton;