import React, { useEffect, useState } from "react";
import MyDropzone from "./MyDropZone";

const App = () => {
  const [images, setImages] = useState([]);
  const [mode, setMode] = useState("CREATE");
  const [editModeImages, setEditModeImages] = useState([]);
  const [finalresponse, setFinalResponse] = useState(null);
  console.log(images, "Images");
  console.log(finalresponse, "final response of user");

  let s3Images = [
    "https://s3.ap-south-1.amazonaws.com/teraconnects-dev-objects/Listing/shutterstock-1011970336-medical-equipment-dealers-7-c29uf.jpg",
    "https://s3.ap-south-1.amazonaws.com/teraconnects-dev-objects/RegistrationCertificate/120210c3-4cdf-4bc6-9d90-851809fdf1e9.png",
  ];

  useEffect(() => {
    if (mode == "CREATE") {
      setEditModeImages([]);
    } else if (mode == "EDIT") {
      setEditModeImages(s3Images);
    }
  }, [mode]);

  return (
    <section className="section">
      <div className="container">
        <h1>Upload files</h1>
        <h2>{mode}</h2>
        <MyDropzone
          images={images}
          setImages={setImages}
          editModeImages={editModeImages}
          setEditModeImages={setEditModeImages}
          finalresponse={finalresponse}
          setFinalResponse={setFinalResponse}
        />
      </div>
      <button onClick={() => setMode("CREATE")}>CREATE</button>
      <button onClick={() => setMode("EDIT")}>EDIT</button>
    </section>
  );
};

export default App;
