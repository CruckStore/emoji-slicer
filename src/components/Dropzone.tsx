import React, { useRef, useState } from 'react';

interface Props { onFile: (file: File) => void; }
const Dropzone: React.FC<Props> = ({ onFile }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hover, setHover] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setHover(false);
    if (e.dataTransfer.files[0]) onFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) onFile(e.target.files[0]);
  };

  return (
    <div
      className={`dropzone ${hover ? 'hover' : ''}`}
      onClick={() => inputRef.current?.click()}
      onDragOver={e => { e.preventDefault(); setHover(true); }}
      onDragLeave={() => setHover(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleChange}
        hidden
      />
      <p>Glissez-déposez ou cliquez pour sélectionner une image</p>
    </div>
  );
};

export default Dropzone;