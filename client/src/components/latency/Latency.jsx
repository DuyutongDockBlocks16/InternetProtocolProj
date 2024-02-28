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
    // 设置定时器，每秒测量一次延时
    const interval = setInterval(async () => {
      const newDelay = await measureDelay(url);
      setDelay(newDelay);
    }, 500); // 每0.5秒测量一次

    // 组件卸载时清理定时器
    return () => clearInterval(interval);
  }, [url]); // 当url改变时重新设置定时器

  return (
    <div>
      Latency: {delay !== null ? `${delay.toFixed(2)}ms` : 'measuring...'}
    </div>
  );
}
;

export default DelayDisplay;