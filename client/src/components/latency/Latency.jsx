import React, { useState, useEffect } from 'react';


async function measureDelay(url = '/') {
    const start = performance.now();
    await fetch(url, { cache: "no-store" }); 
    const end = performance.now();
    return end - start; 
}
  
// import React, { useState, useEffect } from 'react';

function DelayDisplay({ url }) {
  const [delay, setDelay] = useState(null);

  useEffect(() => {
    // Measure latency per 0.5s 
    const interval = setInterval(async () => {
      const newDelay = await measureDelay(url);
      setDelay(newDelay);
    }, 500); 

    // clear timer
    return () => clearInterval(interval);
  }, [url]); 

  return (
    <div>
      Latency: {delay !== null ? `${delay.toFixed(2)}ms` : 'measuring...'}
    </div>
  );
}
;

export default DelayDisplay;