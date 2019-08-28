import React, { FunctionComponent } from 'react';
import PersonForm from '../../component/PersonForm/PersonForm'
import { Route } from 'react-router-dom';


const PersonFormPage:FunctionComponent = () => {
    return(
        <div className="CreatePerson">
            <Route component={PersonForm}/>
        </div>
    );
}

export default PersonFormPage;