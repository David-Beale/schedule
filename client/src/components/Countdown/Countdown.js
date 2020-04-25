import React, { useState, useEffect } from 'react';

function Countdown (props) {
  const countDownDate = props.info.date.getTime();
  const [message, setMessage] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setReady(true)
    }, 300);
  }, []);
  useEffect(() => {
    if (ready) {
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
                {days > 0 ? `${days} ${days > 1 ? 'days' : 'day'} ` : ''} {hours}h:{mins}m:{seconds}s
              </div>
            </div>
          )
        }
        if (distance < 0) {
          setMessage(
            <div className='countdown-inner-container'>
              <div className='countdown-message'>
                Event has already started
              </div>
            </div>

          )
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [ready]);

  return (
    <div>
      {message}
    </div>

  );
}

export { Countdown as default };
