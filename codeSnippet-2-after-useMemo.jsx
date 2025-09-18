import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

const names = [
  "Mia Thompson",
  "Christopher Lane",
  "Emma Collins",
  "Daniel Harper",
  "Benjamin Foster",
  "Olivia Bennett",
  "Charlotte Brooks",
  "James Carter",
  "Amelia Reed",
  "Alexander Pierce",
  "Sophia Morgan",
  "Ethan Wallace",
  "Ava Mitchell",
  "Isabella Parker",
  "Matthew Quinn",
  "William Hayes",
  "Liam Foster",
  "Harper Sullivan",
  "Noah Adams",
  "Ella Griffin",
];

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true); // new state
  const [searchPhotos, setSearchPhotos] = useState("");
  const [photoDescription, setPhotoDescription] = useState("");
  const [photoType, setPhotoType] = useState("");

  useEffect(() => {
    console.log("API Call");
    const fetchPhotos = async () => {
      setPhotos([]);
      for (let i = 0; i < 20; i++) {
        const res = await fetch("https://picsum.photos/300/200");
        setPhotos((photos) => [
          ...photos,
          { url: res.url, photographer: names[i] },
        ]);
      }
      setLoading(false);
    };

    fetchPhotos();
  }, []);

  const filteredPhotos = useMemo(
    () =>
      photos.filter((photo) => {
        console.log(photo.photographer);
        return photo.photographer.includes(searchPhotos);
      }),
    [photos, searchPhotos]
  );

  return (
    <div>
      <h2>Without useMemo</h2>
      <hr />
      <h4>Upload your photo</h4>
      <form>
        <label htmlFor="description">Add your description : </label>
        <input
          name="description"
          type="text"
          value={photoDescription}
          onChange={(e) => setPhotoDescription(e.target.value)}
        />
        <br />
        <label htmlFor="type">Select photo type : </label>
        <select
          name="type"
          value={photoType}
          onChange={(e) => setPhotoType(e.target.value)}
        >
          <option value="jpg">jpg</option>
          <option value="png">png</option>
          <option value="gif">gif</option>
        </select>
        <br />
        <label htmlFor="attachment"></label>
        <input name="attachment" type="file" />
        <button>Upload</button>
        <br />
      </form>
      <hr />
      <h4>Photos List</h4>
      <input
        type="text"
        value={searchPhotos}
        onChange={(e) => setSearchPhotos(e.target.value)}
        placeholder="Search photos..."
      />
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}

      <div className="photo-grid">
        {!loading && filteredPhotos && (
          <PhotoGrid filteredPhotos={filteredPhotos} />
        )}
      </div>
    </div>
  );
}

const PhotoGrid = React.memo(({ filteredPhotos }) => {
  return filteredPhotos.map((photo) => (
    <div key={photo.url} className="photo-item">
      <img src={photo.url} alt={photo.photographer} />
      <div className="photographer-name">{photo.photographer}</div>
    </div>
  ));
});

export default App;
