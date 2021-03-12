import React from 'react';
import data from '../../../data/data.json';
import Typed from 'react-typed';

function Text() {
  return (
    <div className='art-lg-text art-code mb-25'>
      &lt;<i>code</i>&gt; I{' '}
      <Typed
        loop
        typeSpeed={100}
        backSpeed={100}
        strings={data.typed}
        smartBackspace
        shuffle={false}
        backDelay={1}
        fadeOut={false}
        fadeOutDelay={100}
        loopCount={0}
        showCursor
        cursorChar='|'
      />
      &lt;/<i>code</i>&gt;
    </div>
  );
}

export default Text;
