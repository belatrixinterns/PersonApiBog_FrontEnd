import React, { Component } from 'react';
import PersonForm from '../../component/PersonForm/PersonForm'

class CreatePerson extends React.Component {
    constructor(props: any){
        super(props);        
        
    }
    findAllItems() {
        
    }
    render(){
        return(
            <div className="CreatePerson">
                <PersonForm findAllItems={this.findAllItems}/>
            </div>
        );
    }
}

export default CreatePerson;