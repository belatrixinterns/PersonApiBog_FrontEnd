import React, { FunctionComponent } from 'react';
import PersonForm from '../../component/PersonForm/PersonForm'


const PersonFormPage:FunctionComponent = (props:any) => {
    console.log(props.match);


    return(
        <div className="CreatePerson">
            <PersonForm type={props.match && props.match.url}/>
        </div>
    );
}

export default PersonFormPage;