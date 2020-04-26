import React from 'react';
import db from '../../assets/logos/db.jpg';
import pp from '../../assets/logos/pp.jpg';
import gs from '../../assets/logos/gs.jpg';
import jt from '../../assets/logos/jt.jpg';

export default function About() {
  return (
    <div className='about-container'>
      <div className='about-section'>
        <h2>Who are we</h2>
        <p>
          software engineers that share the same belief of helping passionate
          people to share their skills and passions.
        </p>
        <p>
          We believe that the current situation shouldn't prevent anyone to
          share skills and knowlegde
        </p>
        <p>
          We want to help everyone to be able to start and continue sharing
          their skills and abilities and knowledge through the means they
          already have or help them create new ways to share.
        </p>
      </div>
      <div className='about-section'>
        <h2>How we do it</h2>
        <p>
          We are sharing anyone's events so that everyone knows when their
          favorite performer is going to share again. We keep track of the time
          of events so that no one would miss events that they would like to
          attent to.
        </p>
      </div>
      <div className='about-section'>
        <h2>What we do</h2>
        <p>
          We gather information from people's submission through our platform
          with the details of their events and display them to the public.
        </p>
      </div>
      <div className='about-section'>
        <h2>The Team</h2>
        <div className='team__container'>
          <div className='dev__container'>
            <img src={db} alt='David Beale' />
            <h5>David Beale</h5>
          </div>
          <div className='dev__container'>
            <img src={pp} alt='Pawel Pietruszka' />
            <h5>Pawel Pietruszka</h5>
          </div>
          <div className='dev__container'>
            <img src={gs} alt='Giovanni Stasi' />
            <h5>Giovanni Stasi</h5>
          </div>
          <div className='dev__container'>
            <img src={jt} alt='Joseph Tolentino' />
            <h5>Joseph Tolentino</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
