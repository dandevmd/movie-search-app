import React from 'react';
import { useParams } from 'react-router-dom';

import useMovieFetch from '../../hooks/useMovieFetch';

import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';
import Grid from '../Grid/index';
import Spinner from '../Spinner/index';
import NoImage from '../../images/no_image.jpg';
import BreadCrumb from '../BreadCrumb/index';
import MovieInfo from '../MovieInfo/index';
import MovieInfoBar from '../MovieInfoBar';
import Actor from '../Actor/index';

const Movie = () => {
  const {movieId}= useParams();
  const {state: movie, loading, error}= useMovieFetch(movieId);
  // console.log('Movie component>>>', movie);

  if(loading) return  <Spinner/>
  if(error) return <>ERR: Something got wrong</>

  return (
    <>
      <BreadCrumb movieTitle={movie.original_title}/>
      <MovieInfo movie={movie}/>
      <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue}/>
      <Grid header='Actors'>
        {movie.actors.map(actor =>(
          <Actor
          key={actor.credit_id}
          name={actor.name}
          character={actor.character}
          imageUrl={actor.profile_path
            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
            : NoImage}
          />
        ))}
      </Grid>
    </>
  )
}

export default Movie