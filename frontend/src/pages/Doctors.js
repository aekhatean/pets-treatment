import React from 'react';
import Doctor_card_container from '../components/Doctor_card_container';
import '../styles/sidebar.css'
import '../styles/master.css'

function Doctors() {
  return ( <>
  <div className='mybody'>
  <div className='sidebar'>
    ahmed
    </div>
  <div className='parent_cards_div'>
  <Doctor_card_container></Doctor_card_container>
  <Doctor_card_container></Doctor_card_container>
  </div>

  </div>
  </> );
}

export default Doctors;
