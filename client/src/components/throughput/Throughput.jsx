import React, { useState } from 'react';

function Throughput({ downloadUrl, uploadUrl }) {
  const [downloadSpeed, setDownloadSpeed] = useState(null);
  const [uploadSpeed, setUploadSpeed] = useState(null);

  const measureDownloadSpeed = async () => {
    const fileSizeInBytes = 5000000;
    const fileUrl = downloadUrl; 

    const startTime = new Date().getTime();
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const endTime = new Date().getTime();

    const durationInSeconds = (endTime - startTime) / 1000;
    const bitsLoaded = fileSizeInBytes * 8;
    const speedBps = (bitsLoaded / durationInSeconds).toFixed(2);
    const speedKbps = (speedBps / 1024).toFixed(2);
    const speedMbps = (speedKbps / 1024).toFixed(2);

    setDownloadSpeed(`${speedMbps} Mbps`);
  };

  const measureUploadSpeed = async () => {
    const dataSizeInBytes = 5000000; // 使用一个5MB的数据块来模拟文件上传
    const data = new Blob([new Uint8Array(dataSizeInBytes)], { type: 'application/octet-stream' });
    const formData = new FormData();
    formData.append('file', data);

    const startTime = new Date().getTime();
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });
    const endTime = new Date().getTime();

    if (response.ok) {
      const durationInSeconds = (endTime - startTime) / 1000;
      const bitsLoaded = dataSizeInBytes * 8;
      const speedBps = (bitsLoaded / durationInSeconds).toFixed(2);
      const speedKbps = (speedBps / 1024).toFixed(2);
      const speedMbps = (speedKbps / 1024).toFixed(2);

      setUploadSpeed(`${speedMbps} Mbps`);
    } else {
      console.error('上传失败');
      setUploadSpeed('上传失败');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div>
        <button className="self-end bg-primary px-8 py-2 text-emerald-700 hover:bg-emerald-800 hover:text-emerald-500 shadow-lg rounded-lg transform hover:scale-105 transition duration-150 ease-in-out"
          onClick={measureDownloadSpeed}>Download throughput measuring</button>
          {downloadSpeed && <p>Download Speed: {downloadSpeed}</p>}
      </div>
      <div>
        <button className="self-end bg-primary px-8 py-2 text-emerald-700 hover:bg-emerald-800 hover:text-emerald-500 shadow-lg rounded-lg transform hover:scale-105 transition duration-150 ease-in-out"
          onClick={measureUploadSpeed}>Upload throughput measuring</button>
        {uploadSpeed && <p>Upload Speed: {uploadSpeed}</p>}
      </div>
    </div>
  );
}

export default Throughput;