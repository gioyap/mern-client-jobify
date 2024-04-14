import Wrapper from '../assets/wrappers/SmallSidebar';
import { FaTimes } from 'react-icons/fa';

import Logo from './Logo';
import { NavLink } from 'react-router-dom';
import links from '../utils/links';


const SmallSidebar = () => {

  return (
    <Wrapper>
      <div

      >
        <div className='content'>
          <button type='button' className='close-btn' >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className='nav-links'>
            {links.map((link) => {
              const { text, path, icon } = link;

              return (
                <NavLink
                  to={path}
                  key={text}
                  className='nav-link'

                  // will discuss in a second
                  end
                >
                  <span className='icon'>{icon}</span>
                  {text}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;