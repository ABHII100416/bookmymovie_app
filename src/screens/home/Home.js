import React from 'react'
import './Home.css';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Card, CardContent, Typography, FormControl, InputLabel, Input, Button, Select, Checkbox, ListItemText } from '@material-ui/core';
import useTheme from '@material-ui/styles/useTheme';
import MenuItem from '@material-ui/core/MenuItem';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    pointer: {
        cursor: 'pointer',
    },
    gridMovie: {
        height: 350,
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
});

const Home = (props) => {

    const theme = useTheme();

    const { classes } = props;
    const [movies, setMovies] = useState([]);
    const [sortMovie, setSortMovie] = useState([]);
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [genre, setGenre] = useState([]);
    const [artist, setArtist] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState([]);
    const [selectedGenre, setSelectedAGenre] = useState([]);


    const fetchMovies = async () => {
        const response = await fetch(`/api/v1/movies`);
        const json = await response.json();
        if (response.ok) {
            setMovies(json.movies);

        }
    }

    const handleArtistChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedArtist(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    const handleGenreChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedAGenre(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }
    const fetchArtist = async () => {
        const response = await fetch(`/api/v1/artists`);
        const json = await response.json();
        if (response.ok) {
            setArtist(json.artists);

        }
    }

    const fetchGenre = async () => {
        const response = await fetch(`/api/v1/genres`);
        const json = await response.json();
        if (response.ok) {
            setGenre(json.genres);

        }
    }


    const sortMovies = async () => {
        const response = await fetch(`/api/v1/movies?title=${title}&start_date=${startDate}&end_date=${endDate}`);
        const json = await response.json();
        if (response.ok) {
            setSortMovie(json.movies);
        }
    }

    useEffect(() => {
        fetchMovies();
        sortMovies();
        fetchArtist();
        fetchGenre();
    }, []);
    return (
        <div className='home'>
            <div className="upcoming-movie-header">
                <p>Upcoming Movies</p>
            </div>
            <div className={classes.root}>
                <GridList className={classes.gridList} cols={6}>
                    {movies.map(movie => (
                        <GridListTile key={movie.id}>
                            <img src={movie.poster_url} alt={movie.title} />
                            <GridListTileBar title={movie.title}>
                            </GridListTileBar>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
            <div className="flex-container">
                <div className="movieList">
                    <div>
                        <GridList cellHeight={350} cols={4}>
                            {sortMovie.map(movie => (
                                <GridListTile className={classes.pointer} key={movie.id}>
                                    <Link to={`/movie/${movie.id}`}>
                                        <img src={movie.poster_url} alt={movie.title} />
                                    </Link>

                                    <GridListTileBar title={movie.title}>
                                    </GridListTileBar>
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                </div>
                <div className="filters">
                    <Card sx={{ maxWidth: 240, minWidth: 240, }}>
                        <CardContent>
                            <Typography>FIND MOVIES BY:</Typography>
                            <FormControl className='setMargin' fullWidth>
                                <InputLabel htmlFor='movie-name'>Movie Name</InputLabel>
                                <Input onChange={(e) => setTitle(e.target.value)} id="movie-name" />
                            </FormControl>
                            <FormControl className='setMargin' fullWidth>
                                <InputLabel>Genres</InputLabel>
                                <Select
                                    multiple
                                    value={selectedGenre}
                                    onChange={handleGenreChange}
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    {genre.map((name) => (
                                        <MenuItem key={name.id} value={name.genre}>
                                            <Checkbox />
                                            <ListItemText primary={name.genre} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl className='setMargin' l fullWidth>
                                <InputLabel>Artists</InputLabel>
                                <Select
                                    multiple
                                    value={selectedArtist}
                                    onChange={handleArtistChange}
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    {artist.map((name) => (
                                        <MenuItem key={name.id} value={`${name.first_name} ${name.last_name}`}>
                                            <Checkbox />
                                            <ListItemText primary={`${name.first_name} ${name.last_name}`} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl className='setMargin' fullWidth>
                                <InputLabel htmlFor='relase'>Release Date Start</InputLabel>
                                <Input onChange={(e) => setStartDate(e.target.value)} type='date' id="release" />
                            </FormControl>
                            <FormControl className='setMargin' fullWidth>
                                <InputLabel htmlFor='end'>Release Date End</InputLabel>
                                <Input onChange={(e) => setEndDate(e.target.value)} type='date' id="end" />
                            </FormControl>
                            <Button color="primary" onClick={sortMovies} fullWidth variant="contained">Apply</Button>

                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

Home.PropTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);