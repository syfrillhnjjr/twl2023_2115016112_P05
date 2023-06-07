import React, { useState } from 'react';
import axios from 'axios';

function UploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  function handleFileSelect(event) {
    setSelectedFile(event.target.files[0]);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      axios.post('https://pie.dev/post', formData)
        .then(response => {
          setUploadStatus('success');
          console.log(response.data); // Menampilkan respons sebagai log di konsol
        })
        .catch(error => {
          setUploadStatus('error');
          if (error.response) {
            // Menangani kesalahan dari server dengan respons
            setErrorMessage(error.response.data.message);
          } else {
            // Menangani kesalahan jaringan atau kasus ujung lainnya
            setErrorMessage('Terjadi kesalahan saat mengunggah berkas.');
          }
          console.log(error); // Menampilkan informasi kesalahan ke konsol
        });
    } else {
      setErrorMessage('Tidak ada berkas yang dipilih.');
    }
  }
  

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="file" onChange={handleFileSelect} />
      <button type="submit">Upload</button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {uploadStatus === 'success' && <div className="success-message">Upload berhasil!</div>}
      {uploadStatus === 'error' && <div className="error-message">Upload gagal.</div>}
    </form>
  );
}

export default UploadForm;


