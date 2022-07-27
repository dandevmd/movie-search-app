import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';


import { Wrapper, Content } from './SearchBar.styles';

import SearchIcon from '../../images/search.png';


const SearchBar = ({ setSearchTerm }) => {
    const [state, setState] = useState('');
    const initial = useRef(true)

    useEffect(() => {
        if (initial.current) {
            initial.current = false;
            return;
        }

        const timer = setTimeout(() => {
            return setSearchTerm(state);
        }, 100);

        return () => clearTimeout(timer);
    }, [setSearchTerm, state])



    return (
        <Wrapper>
            <Content>
                <img src={SearchIcon} alt="" />
                <input
                    type="text"
                    placeholder='Search Movie'
                    onChange={(event) => setState(event.currentTarget.value)}
                    value={state} />
            </Content>
        </Wrapper>
    )
}

SearchBar.propTypes = {
    setSearchTerm: PropTypes.func
}

export default SearchBar