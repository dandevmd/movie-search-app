
import React from 'react';
import { Link } from 'react-router-dom';

import { Wrapper, Content, LogoImg, TMDBLogoImg } from './Header.styles';

import RMDBLogo from '../../images/logo2.png';
import TMDBLogo from '../../images/logo1.png';


const Header = () => {
  return (
    <Wrapper>
      <Content>
        <Link to='/'>
          <LogoImg src={RMDBLogo} alt={RMDBLogo} />
        </Link>
        <TMDBLogoImg src={TMDBLogo} alt={TMDBLogo} />
      </Content>
    </Wrapper>
  )
}

export default Header;
