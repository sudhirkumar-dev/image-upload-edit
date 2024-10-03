import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const MyDropzone = ({
  images,
  setImages,
  editModeImages,
  setEditModeImages,
  setFinalResponse,
}) => {
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const [error, setError] = useState("");

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      const totalFiles =
        images.length + editModeImages.length + acceptedFiles.length;
      if (totalFiles > 3) {
        setError("Too many files. Maximum 3 files allowed.");
        setRejectedFiles(rejectedFiles);
        return;
      }
      setError("");
      setImages((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
      setRejectedFiles(rejectedFiles);
    },
    [images, editModeImages, setImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000 * 3,
    maxFiles: 3,
  });

  const handleRemoveFile = (name) => {
    setImages((prevFiles) => prevFiles.filter((file) => file.name !== name));
  };

  const handleRemoveEditImages = (element) => {
    setEditModeImages((prevImages) =>
      prevImages.filter((file) => file !== element)
    );
  };

  useEffect(()=>{
    setFinalResponse({
      localImages:images,
      finalURLS:editModeImages
    })
  }, [images, editModeImages, setFinalResponse])

  return (
    <form className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <aside>
        <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
          {images.map((file) => (
            <li key={file.name} style={{ position: "relative" }}>
              <img src={file.preview} alt="" width={100} height={100} />
              <FontAwesomeIcon
                icon={faTrash}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  cursor: "pointer",
                  color: "red",
                  fontSize: "1.5rem",
                }}
                onClick={() => handleRemoveFile(file.name)}
              />
            </li>
          ))}
          {editModeImages?.map((file) => (
            <li key={file} style={{ position: "relative" }}>
              <img src={file} alt="" width={100} height={100} />
              <FontAwesomeIcon
                icon={faTrash}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  cursor: "pointer",
                  color: "red",
                  fontSize: "1.5rem",
                }}
                onClick={() => handleRemoveEditImages(file)}
              />
            </li>
          ))}
        </ul>
      </aside>
      {rejectedFiles.length > 0 && (
        <p>
          {rejectedFiles[0]?.errors[0]?.message || "File type not accepted."}
        </p>
      )}
      {error && <p>{error}</p>}
    </form>
  );
};

export default MyDropzone;
