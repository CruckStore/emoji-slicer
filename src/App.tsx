import React, { useState, useRef } from 'react';
import ImageUploader from './components/ImageUploader';
import ImageGrid from './components/ImageGrid';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [gridSize, setGridSize] = useState<number>(4);
  const [tiles, setTiles] = useState<Blob[]>([]);

  const handleSlice = async () => {
    if (!file) return;
    const img = new Image();
    img.src = URL.createObjectURL(file);
    await new Promise(res => { img.onload = res; });

    const tileWidth = Math.floor(img.width / gridSize);
    const tileHeight = Math.floor(img.height / gridSize);
    const fragments: Blob[] = [];

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const canvas = document.createElement('canvas');
        canvas.width = tileWidth;
        canvas.height = tileHeight;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(
          img,
          x * tileWidth,
          y * tileHeight,
          tileWidth,
          tileHeight,
          0,
          0,
          tileWidth,
          tileHeight
        );
        const blob = await new Promise<Blob>(res => canvas.toBlob(b => res(b!)));
        fragments.push(blob);
      }
    }
    setTiles(fragments);
  };

  return (
    <div className="app-container">
      <h1>Emoji Slicer</h1>
      <ImageUploader onFileSelect={setFile} />
      <div className="controls">
        <label>Grid Size: {gridSize} x {gridSize}</label>
        <input
          type="range"
          min={1}
          max={16}
          value={gridSize}
          onChange={e => setGridSize(+e.target.value)}
        />
        <button onClick={handleSlice} disabled={!file}>Slice Image</button>
      </div>
      {tiles.length > 0 && <ImageGrid tiles={tiles} gridSize={gridSize} />}
    </div>
  );
};

export default App;