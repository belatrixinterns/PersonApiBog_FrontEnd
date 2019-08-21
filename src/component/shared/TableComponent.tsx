import React from "react";
import ReactTable from "react-table";
import { ITableProps } from "../../interfaces/ITableProps";
import { Input, Form, Grid, Button, Icon } from 'semantic-ui-react'
import "../../assets/TableComponent.css"

interface IFilteredProps {
    id: String,
    value: String
}

class TableComponent extends React.Component<ITableProps> {

   state = {
        filteredPeople: Array<IFilteredProps>(),
        filterDocumentType: "NOT_SEARCHED"
    }

    constructor(props: ITableProps){
        super(props);
    }

    onFilteredChange(filtered: any) {
     
        if (filtered.length > 1 && this.state.filterDocumentType === "") {

          const filterDocumentType = "NOT_SEARCHED";
          this.setState( () => ({
            filteredPeople: filteredPeople.filter(item:  => item.id != "all"),
            filterDocumentType
          }));
        } else this.setState({ filteredPeople });
      }


    
    filter = (event: any) => {
       const {filteredValue} = event.target;
       const filtered = [{id: "", value: filteredValue}];
       this.setState({
           filteredPeople: filtered,
           filterDocumentType: filteredValue
       })
    }

    onFilterChange(filtered: any){

    }

    public render() {
        return <div className="table-margin">
            <Grid >
                <Grid.Row>
                    <Grid.Column width={10}>
                        <Form>
                            <Form.Field>
                                <Input icon='users' iconPosition='left' className="search-input" placeholder='Search person...' onChange={ this.filter}/>
                            </Form.Field>
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Button
                            color="green"
                            content="New person"
                            icon="add"
                            labelPosition="left"
                        >   
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <ReactTable
                noDataText=""
                loading={this.props.loading}
                data={this.props.data}
                columns={this.props.columns}
                filterable={true}
                defaultPageSize={10}
                pageSizeOptions={[5, 10, 20]} />
        </div>;
    }
}

export default TableComponent;