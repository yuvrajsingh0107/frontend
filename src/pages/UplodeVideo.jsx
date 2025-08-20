import React, { useState } from "react";

export default function VideoUploadPage() {
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setVideoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!videoFile) return alert("Please select a video first!");

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("title", title);
    formData.append("description", description);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5000/api/videos/upload", true);
    xhr.withCredentials = true; // for cookies if cross-domain

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setProgress(percent);
      }
    };

    xhr.onload = () => {
      setUploading(false);
      if (xhr.status === 200) {
        alert("Video uploaded successfully!");
        setVideoFile(null);
        setPreviewUrl(null);
        setTitle("");
        setDescription("");
        setProgress(0);
      } else {
        alert("Upload failed: " + xhr.responseText);
      }
    };

    setUploading(true);
    xhr.send(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col items-center py-10 px-4">
      <div
        className="w-full max-w-2xl bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <h1 className="text-2xl font-bold mb-4">Upload Video</h1>

        {/* Drag & Drop Area */}
        <div
          className="border-2 border-dashed border-gray-400  rounded-lg h-40 flex items-center justify-center cursor-pointer hover:bg-gray-50"
          onClick={() => document.getElementById("fileInput").click()}
        >
          {videoFile ? (
            <p className="text-green-600 font-medium">{videoFile.name}</p>
          ) : (
            <p className="text-gray-500">Drag & drop a video here or click to select</p>
          )}
          <input
            type="file"
            id="fileInput"
            accept="video/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>

        {/* Video Preview */}
        {previewUrl && (
          <video
            src={previewUrl}
            controls
            className="w-full mt-4 rounded-lg"
          />
        )}

        {/* Title & Description */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="Enter video title"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1"
            rows="3"
            placeholder="Enter video description"
          />
        </div>

        {/* Progress Bar */}
        {uploading && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {uploading ? `Uploading... ${progress}%` : "Upload"}
        </button>
      </div>
    </div>
  );
}
