import React, { Component } from 'react';
import {Input} from 'semantic-ui-react';

type PersonFormProps = {
    findAllItems: any
}

class PersonForm extends React.Component<PersonFormProps> {
    constructor(props: PersonFormProps){
        super(props);
        
    }
    render(){
        this.props.findAllItems;
        return(
            <div className="home">
                <Input/>
            </div>
        );
    }
}

export default PersonForm;