import React from 'react';

function Event({ event }) {
  return (
    <div>
      <iframe width="560"
        title="youtube"
        height="315"
        src="https://www.youtube.com/embed/NMre6IAAAiU"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
      <div className="chatbox"> 
        
      </div>
    </div>
  )
}

export default Event;