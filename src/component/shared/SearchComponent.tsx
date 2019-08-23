import React from "react";
import { Form, Input } from 'semantic-ui-react';

const SearchComponent: React.FC<any> = (table: any) => {

    function filter(event: any) {
        const { value } = event.target;
        table.handleFilter(value);
    }

    return (
        <Form>
            <Form.Field>
                <Input icon='users' iconPosition='left' className="search-input" placeholder={table.searchPlaceHolder} onChange={(e) => filter(e)} />
            </Form.Field>
        </Form>
    );
}

export default SearchComponent;