import { useState, useEffect } from 'react';

import API from '../API';

import {isPersistedState} from '../helpers';


const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

export const useMoviesFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(); // its [movies, setMovies]
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // console.log(searchTerm);


    const fetchMovies = async (page, searchTerm = '') => {
        try {
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovies(searchTerm, page);
            // console.log(movies);

            setState((prev) => ({
                ...movies,
                results:
                    page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
            }))

        } catch (error) {
            setError(true);
        }
        setLoading(false)
    }

    useEffect(() => {
        if(!searchTerm){
            const sessionState = isPersistedState('homeState');

            if(sessionState){
                setState(sessionState)
                return;
            }
        }

        setState(initialState)
        fetchMovies(1, searchTerm)
    }, [searchTerm]);

    //Load More
    useEffect(() => {
        if (!isLoadingMore) return;

        fetchMovies(state?.page + 1, searchTerm);
        setIsLoadingMore(false)

    }, [searchTerm, isLoadingMore, state?.page])

    // sessionStorage effect
    useEffect(() => {
      if(!searchTerm) sessionStorage.setItem('homeState', JSON.stringify(state))
    }, [searchTerm, state])
    

    return { state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore };
}
