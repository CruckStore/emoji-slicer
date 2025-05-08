import React from 'react';

interface Props { onFileSelect: (file: File) => void; }
const ImageUploader: React.FC<Props> = ({ onFileSelect }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) onFileSelect(e.target.files[0]);
  };
  return (
    <div className="uploader">
      <input type="file" accept="image/*" onChange={handleChange} />
    </div>
  );
};
export default ImageUploader;