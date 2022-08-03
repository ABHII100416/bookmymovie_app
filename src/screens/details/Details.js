import { Typography } from '@material-ui/core'
import Link from 'react-router-dom/Link'
import React, { useEffect } from 'react'
import './Details.css';
import Box from '@material-ui/core/Box';

import { useState } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const Details = ({ match }) => {

    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState([]);
    const [duration, setDuration] = useState("");
    const [release, setRelease] = useState('');
    const [rating, setRating] = useState('');
    const [plot, setPlot] = useState("");
    const [trailer, setTrailer] = useState('');
    const [poster, setPoster] = useState('');

    const fetchMovie = async () => {
        const response = await fetch(`/api/v1/movies/${match.params.id}`);
        var json = await response.json();

        if (response.ok) {
            setTitle(json.title);
            setGenre(json.genres);
            setDuration(json.duration);
            setRating(json.rating);
            setRelease(json.release_date);
            setPlot(json.storyline);
            setPoster(json.poster_url);
            setTrailer(json.trailer_url);
        }
    }

    useEffect(() => {
        fetchMovie();
    }, []);

    return (
        <div className='details'>
            <div className="details-header">
                <p className='back-button'><Link to='/'>{`< Back to Home`}</Link></p>
            </div>
            <div className="flex-container">
                <div className="poster">
                    <img src={poster} style={{ width: '100%' }} alt="" />
                </div>
                <div className="details">
                    <Typography variant='h2'>{title}</Typography>
                    <Typography><strong>Genres:</strong> {genre}</Typography>
                    <Typography><strong>Duration:</strong> {duration}</Typography>
                    <Typography><strong>Release Date:</strong> {release}</Typography>
                    <Typography><strong>Rating:</strong> {rating}</Typography>
                    <Typography><strong>Plot:</strong> {plot}</Typography>
                    <Typography><strong>Trailer:</strong></Typography>
                    <iframe src={trailer} frameborder="0"></iframe>
                </div>
                <div className="stars">
                    <Typography>
                        Rate this Movie:
                    </Typography>

                    <GridList className='margin'>
                        <GridListTile>
                            <img className='img' src={poster} alt="Poster" />
                            <GridListTileBar title={title}>
                            </GridListTileBar>
                        </GridListTile>

                    </GridList>

                </div>
            </div>
        </div>
    )
}

export default Details