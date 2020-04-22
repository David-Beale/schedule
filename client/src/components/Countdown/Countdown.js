import React, { useState, useEffect } from 'react';

function Countdown (props) {
  const countDownDate = props.info.date.getTime();
  const [message, setMessage] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance > 0) {
        const days = (Math.floor(distance / (1000 * 60 * 60 * 24)))
        const hours = (Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = (Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        const seconds = (Math.floor((distance % (1000 * 60)) / 1000));
        setMessage(
          <div className='countdown-inner-container'>
            <div className='countdown-message'>
              Event is starting in
           </div>
            <div className='countdown-timer'>
              {days} {days > 1 ? 'days' : 'day'} {hours}h:{mins}m:{seconds}s
            </div>
          </div>
        )
      }


      if (distance < 0) {
        setMessage(`Event has already started`)
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div>
      {message}
    </div>

  );
}

export { Countdown as default };
