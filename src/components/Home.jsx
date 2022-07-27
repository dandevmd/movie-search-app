import { useState, useEffect } from 'react';

import { useMoviesFetch } from '../hooks/useMoviesFetch';

import API from '../API';
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE, } from '../config';

import HeroImage from './HeroImage/index';
import Grid from './Grid/index';
import Thumb from './Thumb/index';
import Spinner from './Spinner/index';
import SearchBar from './SearchBar/index';
import Button from './Button/index';

import NoImage from '../images/no_image.jpg';

const Home = () => {
    const { state,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        setIsLoadingMore } = useMoviesFetch();
    // console.log(state?.results)
    // const moviesItem = state?.results.map((movie) => movie.title)
    //    console.log(moviesItem)

    if (error) return <>Something gone Wrong</>;

    return (
        <>
            {!searchTerm && state?.results[0] ? (
                <HeroImage
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state?.results[0]?.backdrop_path}`}
                    title={state?.results[0].original_title}
                    text={state?.results[0].overview} />
            ) : null}

            <SearchBar setSearchTerm={setSearchTerm} />
            <Grid header={searchTerm ? 'Search Results' : 'Popular Movies'}>
                {state?.results.map((movie) => (
                    <Thumb
                        key={movie.id}
                        clickable
                        image={
                            movie.poster_path
                                ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                                : NoImage
                        }
                        movieId={movie.id}
                    />
                ))}
            </Grid>
            {loading && <Spinner />}
            {state?.page < state?.total_pages && !loading && (
            <Button text='Load More' callback={()=>{setIsLoadingMore(true)}}/>)}
        </>
    )
}

export default Home;