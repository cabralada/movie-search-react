import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movie : '',
            typingTimeOut: 0
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {

        const self = this;

        if (self.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout);
         }

         self.setState({
            [event.target.name]: event.target.value,
            typingTimeout: setTimeout(() => {
                this.props.buildData(this.state.movie)
              }, 500)
         });
        
    };

    render() {
        return(
            <form>
                <TextField
                    onChange={this.handleChange}
                    style={styleSearch}
                    id="movie"
                    label="Search by movie"
                    name="movie"
                    defaultValue={this.state.movie}
                    margin="normal"
                />
            </form>
            
        );
    }
}

export default Search;

const styleSearch = {
    width: 'calc(100% - 2rem)',
    margin: '1rem 1rem 2rem 1rem'
}