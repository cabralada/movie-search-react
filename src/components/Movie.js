import React, { Component } from 'react';

import axios from 'axios';
import styled from 'styled-components';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

import ThumbsUp from '@material-ui/icons/ThumbUp';
import ThumbsDown from '@material-ui/icons/ThumbDown';
import ThumbsUpDown from '@material-ui/icons/ThumbsUpDown';

import Alarm from '@material-ui/icons/Alarm';
import Error from '@material-ui/icons/Error';
import AudioTrack from '@material-ui/icons/Audiotrack';
import Family from '@material-ui/icons/Favorite';

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import blueGrey from '@material-ui/core/colors/blueGrey';

class Movie extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    callData(data) {
        let str = this.props.info.replace(/\s+/g, '-').toLowerCase();
        let url = `https://sbot-fe-test.herokuapp.com/api/v1/movies?query=${str}`
        axios.get(url)
        .then(res => {
            const {data} = res;
            this.setState({ data });
        })
    }

    componentDidMount() {
        let {info} = this.props;
        this.callData(info)
    }

    render() {

        let {data} = this.state;

        const Loading = () => {
            return (
                <Typography style={{textAlign: 'center'}} color="textSecondary">
                    Loading ...
                </Typography>
            )
        };

        const ErrorSearch = () => {
            return (
                <Typography style={{textAlign: 'center'}}>
                    <strong>{this.props.info}</strong>, <br />
                    no match! pls, search again ...
                </Typography>
            )
        };

        if (data.length === 0) {
            return <Loading />
        }

        if(!data.hasOwnProperty('original_title')){
            return <ErrorSearch />
        }

        let smallImg = data.full_backdrop_path;
        let description = data.overview;
        let adult = data.adult;
        let language = data.original_language;
        let rating = data.vote_average;
        let releasedYear = data.release_date.split('-')[0]
        let releasedMonth = data.release_date.split('-')[1]
        let releasedDay = data.release_date.split('-')[2]
        let release = `${releasedDay}/${releasedMonth}/${releasedYear}`;

        const VerifyRating = () => {
            if (rating > 7) {
                return <ThumbsUp />
            } else if ( 7 > rating && rating > 4) {
                return <ThumbsUpDown />
            } else {
                return <ThumbsDown />
            }
        }

        const ImgMovie = () => {
            let error = 'https://image.tmdb.org/t/p/w500/null';

            if (smallImg === error) return null

            return (
                <CardMedia
                    style={{paddingTop: '56.25%'}}
                    image={smallImg}
                    title={data.original_title}
                />
            )

        }

        return(
            <Card style={sizeLimitation}>
                <ImgMovie/>
                <CardContent>
                    <Typography variant="headline" component="h2">
                        {data.original_title}
                    </Typography>
                    <Typography>
                        {releasedYear}
                    </Typography>
                    <Typography style={styleParagraph} component="p">
                        {description}
                    </Typography>
                </CardContent>

                <ListItemStyle>
                    <li className="borderbox" style={{backgroundColor: red[500]}}>
                        <span>
                            {adult ? <Error /> : <Family />}
                        </span>
                        <strong>{adult ? '+18' : 'Family'}</strong>
                    </li>
                    <li className="borderbox released" style={{backgroundColor: green[500]}}>
                        <span><Alarm /></span>
                        <strong>{release}</strong>
                    </li>
                    <li className="borderbox" style={{backgroundColor: blue[500]}}>
                        <span><AudioTrack /></span>
                        <strong>{language}</strong>
                    </li>
                    <li className="borderbox" style={{backgroundColor: blueGrey[500]}}>
                        <span>
                            <VerifyRating />
                        </span>
                        <strong >{rating}</strong>
                    </li>
                </ListItemStyle>
            </Card>
        );
    }
}

export default Movie;

const styleParagraph = {
    margin: '30px 0'
}

const sizeLimitation = {
    maxHeight: '75vh',
    overflow: 'auto'
}

const ListItemStyle = styled.ul`
    margin: 0;
    padding-left: 0;

    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-flex: 0;
    -ms-flex: 0 1 auto;
    flex: 0 1 auto;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;

    li {
        -ms-flex-preferred-size: 50%;
        flex-basis: 50%;
        max-width: 50%;
        list-style: none;
        padding: 1rem 0;
        text-align: center;
        color: white;
        position: relative;

        span {
            height: 30px;
            display: inline-block;
            position: relative;
            top: 5px;
            margin-right: 5px;
        }

        strong {
            display: inline-block;
            font-size: 1rem;
            padding: 4px 0 4px 5px;
            position: relative;
            top: -2px;
        }
    }
`;
