import { useState, useEffect } from "react";
import "./App.css";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "images/");
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
    });
  };
  useEffect(() => {
    //   listAll(imageListRef).then((res) => {
    //     res.items.forEach((item) => {
    //       getDownloadURL(item).then((url) => {
    //         setImageList((prev) => [...prev, url]);
    //       });
    //     });
    //   });
    listAll(imageListRef).then((res) => {
      const urlPromises = res.items.map((item) =>
        getDownloadURL(item).then((url) => url)
      );

      Promise.all(urlPromises).then((urls) => {
        setImageList(urls);
      });
    });
  }, []);

  return (
    <div className="App">
      <h1>FIREBASE</h1>
      <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} />
      <button onClick={uploadImage}>Upload</button>

      <div>
        {imageList.map((url, n) => {
          return <img key={n} src={url} width="200px" alt="img" />;
        })}
      </div>
    </div>
  );
}

export default App;
