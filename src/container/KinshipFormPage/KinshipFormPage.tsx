import React, { FunctionComponent } from 'react';
import { Route } from 'react-router-dom';
import KinshipForm from '../../component/KinshipForm/KinshipForm';


const KinshipFormPage:FunctionComponent = () => {
    return(
        <div className="CreateKinship">
            <Route component={KinshipForm}/>
        </div>
    );
}

export default KinshipFormPage;