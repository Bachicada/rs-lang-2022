import * as React from 'react';
import gitIcon from '../../assets/git-icon.png';
import rsLogo from '../../assets/rs-logo.png'

export function Footer() {
  return (
    <footer className='footer'>
        <span>2022</span>
        <a className='footerLink' href='https://github.com/timursk' target="_blank" rel="noreferrer">
          <span>timursk</span>
          <img className='gitIcon' src={gitIcon} alt="gitIcon" />
        </a>
        <a className='footerLink' href='https://github.com/Bachicada' target="_blank" rel="noreferrer">
          <span>bachicada</span> 
          <img className='gitIcon' src={gitIcon} alt="gitIcon" />
        </a>
        <a className='footerLink' href='https://rs.school/' target="_blank" rel="noreferrer">
           <img className='gitIcon' src={rsLogo} alt="gitIcon" />
        </a>
    </footer>
  );
}
