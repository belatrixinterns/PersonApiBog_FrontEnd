import React, { Component } from 'react';
import {Input, Select, Form, Label} from 'semantic-ui-react';
import {DateInput} from 'semantic-ui-calendar-react';

type PersonFormProps = {
    findAllItems: any
}
type PersonFormStatus = {
    name: any,
    lantName: any,
    documentType: any,
    document: any,
    documentId: any,
    dateOfBirth: any,
    gender: any,
    nationality: any,
    genderList: any,
    nationalityList: any,
    documentTypeList: any,
}

class PersonForm extends React.Component<PersonFormProps, PersonFormStatus> {
    constructor(props: PersonFormProps){
        super(props);
        this.state = {name: '',lantName: '',documentType: '',document: '',documentId: '',dateOfBirth: "",gender: '',nationality: '',
                        genderList: [{}],nationalityList: [{}],documentTypeList: [{}],};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event:any){
        this.setState({name: event.target.value});

    }

    handleSubmit(event:any){
        alert('A name was submitted: ' + this.state.name);
        event.preventDefault();
    }
    
    render(){
        return(
            <div className="home">
                <form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <Label>
                            Name:<Input type="text" value={this.state.name} onChange={this.handleChange} />
                        </Label>
                    </Form.Field>
                    <Form.Field>
                        <Label>
                            Last Name:<Input type="text" value={this.state.name} onChange={this.handleChange} />
                        </Label>
                    </Form.Field>
                    <Form.Field>
                        <Label>
                            Document Type: <Select options={this.state.documentTypeList} type="text" value={this.state.name} onChange={this.handleChange} />
                        </Label>
                    </Form.Field>
                    <Form.Field>
                        <Label>
                            Document:<Input type="text" value={this.state.name} onChange={this.handleChange} />
                        </Label>
                    </Form.Field>
                    <Form.Field>
                        <Label>
                            Date of Bith:<DateInput name="date"
                                    placeholder="Date"
                                    iconPosition="left"
                                    onChange={this.handleChange} 
                                    value={this.state.dateOfBirth} />
                        </Label>
                    </Form.Field>
                    <Form.Field>
                        <Label>
                            Gender: <Select options={this.state.genderList} type="text" value={this.state.name} onChange={this.handleChange} />
                        </Label>
                    </Form.Field>
                    <Form.Field>
                        <Label>
                            Nationality: <Select options={this.state.nationalityList} type="text" value={this.state.name} onChange={this.handleChange} />
                        </Label>
                    </Form.Field>
                    <Input type="submit" value="Add" />
                </form>
            </div>
        );
    }
}

export default PersonForm;