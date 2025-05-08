import React, { useState, useCallback, useEffect } from "react";
import Dropzone from "./components/Dropzone";
import ImageGrid from "./components/ImageGrid";

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [gridSize, setGridSize] = useState<number>(4);
  const [tiles, setTiles] = useState<Blob[]>([]);

  const handleFile = (f: File) => {
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
    setTiles([]);
  };

  const sliceImage = useCallback(async () => {
    if (!file) return;
    const img = new Image();
    img.src = URL.createObjectURL(file);
    await new Promise((res) => {
      img.onload = res;
    });

    const tileW = Math.floor(img.width / gridSize);
    const tileH = Math.floor(img.height / gridSize);
    const frags: Blob[] = [];

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const canvas = document.createElement("canvas");
        canvas.width = tileW;
        canvas.height = tileH;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(
          img,
          x * tileW,
          y * tileH,
          tileW,
          tileH,
          0,
          0,
          tileW,
          tileH
        );
        const blob = await new Promise<Blob>((res) =>
          canvas.toBlob((b) => res(b!))
        );
        frags.push(blob);
      }
    }
    setTiles(frags);
  }, [file, gridSize]);

  useEffect(() => {
    if (tiles.length > 0) {
      sliceImage();
    }
  }, [gridSize, sliceImage]);

  return (
    <div className="app-container">
      <h1>Emoji Slicer</h1>
      <Dropzone onFile={handleFile} preview={preview} />
      {preview && (
        <div className="preview">
          <h2>Preview</h2>
          <img src={preview} alt="Preview" />
        </div>
      )}
      <div className="controls">
        <label>
          Grid Size: {gridSize} × {gridSize}
        </label>
        <input
          type="range"
          min={1}
          max={16}
          value={gridSize}
          onChange={(e) => setGridSize(+e.target.value)}
        />
        <button onClick={sliceImage} disabled={!file}>
          Slice Image
        </button>
      </div>
      {tiles.length > 0 && <ImageGrid tiles={tiles} gridSize={gridSize} />}
    </div>
  );
};

export default App;
