import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

import Search from './Search';
import Movie from './Movie';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      movieName: 'Jurassic-park'
    }

    this.buildData = this.buildData.bind(this);
  }

  buildData(data) {
    this.setState({
      movieName: data
    })
  }

  render() {
    let value = this.state.movieName;

    const MovieList = () => {
      return <Movie info={value} />
    }

    return (
      <Grid
      container
      style={styleMaster}
      spacing={16}
      direction='row'
      justify= 'center'
      >
          <Grid xs={10} sm={6} item>
              <Search buildData={this.buildData} />
              <MovieList />
          </Grid>
    </Grid>
    );
  }
}

export default App;

const styleMaster = {
  margin: '0 auto',
  maxWidth: '1000px',
  width: 'auto',
  fontSize: '2rem',
  height: '100vh'
};

