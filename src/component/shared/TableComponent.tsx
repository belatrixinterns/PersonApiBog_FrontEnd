import React, { FunctionComponent } from "react";
import ReactTable, { Filter } from "react-table";
import { ITableProps } from "../../interfaces/ITableProps";
import "../../assets/TableComponent.css"
import SearchComponent from './SearchComponent';
import { Grid, Button, GridRow } from "semantic-ui-react";
import { Link } from "react-router-dom";
import CreatePersonButton from "../shared/CreatePersonButton"

class TableComponent extends React.Component<ITableProps> {

    state = {
        filteredObject: Array<any>(),
        filterValue: ""
    }

    constructor(props: ITableProps) {
        super(props);
    }
    onKeyInputEnter = (filtered: string) => {
        let filters: Array<Filter> = this.props.columnsAccessor.map(currentColumn => ({ id: currentColumn, value: filtered }))
        if (filtered.length > 0) {
            if (filtered.length > 1) {
                let filterObject = this.state.filteredObject.map(filter => {
                    let filterAct = filters.find(fil => fil.id == filter.id);
                    if (filterAct) {
                        filter.value = filterAct.value;
                        return filter;
                    }
                })
                this.setState({ filteredObject: filterObject })
            } else {
                this.setState((prev: any) => ({ filteredObject: prev.filteredObject.concat(filters) }))
            }
        } else {
            this.setState({ filteredObject: this.state.filteredObject.filter(filter => !filters.find(filActual => filActual.id == filter.id)) })
        }
    }

    onFilterChange = (changed: any) => {
        if (this.state.filteredObject.length > 1 && this.state.filterValue.length) {
            const filterAll = "";
            this.setState({
                filteredObject: changed.filter((item: any) => item.id != "all"),
                filterValue: filterAll
            });
        } else this.setState({ filteredObject: changed });
    }

    public render() {
        const buttonCreatr =  this.props.button;    
        
        return <div className="table-margin">
            <ReactTable
                getTheadFilterProps={() => {
                    return {
                        style:
                            { display: "none" }
                    };
                }}
                getTheadFilterThProps={() => {
                    return {
                        className:
                            "hiddenFilter"

                    };
                }}
                noDataText=""
                loading={this.props.loading}
                data={this.props.data}
                columns={this.props.columns}
                filterable={false}
                filtered={this.state.filteredObject}
                onFilteredChange={this.onFilterChange}
                defaultPageSize={5}
                pageSizeOptions={[5, 10, 20]}
            >
                {(state, makeTable) => {
                    return (
                        <div>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={10}>
                                        <SearchComponent data={state} searchPlaceHolder={this.props.searchPlaceHolder} handleFilter={this.onKeyInputEnter} />
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        
                                        <Link to="/person/create">
                                            {this.props.button()}
                                        </Link>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            {makeTable()}
                        </div>);
                }}
            </ReactTable>
        </div>;
    }
}
export default TableComponent;