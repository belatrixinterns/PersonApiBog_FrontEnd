import React, { FunctionComponent } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { createBrowserHistory } from 'history';

type KinshipFormProps = {
    type: string,
}

const KinshipForm : FunctionComponent<KinshipFormProps> = (props) => {

    const history = createBrowserHistory();

    function cancelButtonHandler(event:any){
        history.goBack();
    }

    return(
        <div className="kinship_form_container">
            <form >
                <h2>Add Person</h2>
                <Table basic='very'>
                    <Table.Body>
                       
                    </Table.Body>
                </Table>
                <Button className="submit_button" basic floated='right' type="submit" content="Add" />
                <Button className="submit_button" type="button" onClick={cancelButtonHandler} basic floated='right' content="Cancel" />
            </form>
        </div>
    );

}

export default KinshipForm;