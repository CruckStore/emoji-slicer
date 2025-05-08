import React from 'react';

interface Props { tiles: Blob[]; gridSize: number; }
const ImageGrid: React.FC<Props> = ({ tiles, gridSize }) => (
  <div className="grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
    {tiles.map((blob, idx) => (
      <a
        key={idx}
        download={`tile_${Math.floor(idx/gridSize)}_${idx%gridSize}.png`}
        href={URL.createObjectURL(blob)}
        className="tile"
      >
        <img src={URL.createObjectURL(blob)} alt={`tile-${idx}`} />
        <span className="filename">tile_{Math.floor(idx/gridSize)}_{idx%gridSize}.png</span>
      </a>
    ))}
  </div>
);
export default ImageGrid;