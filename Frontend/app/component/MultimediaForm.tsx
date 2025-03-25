"use client"
import React, { useState,useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { UploadFile as UploadFileIcon } from "@mui/icons-material";

const MultimediaForm = ({draft}:{draft:string}) => {
  const [selectedLocation, setSelectedLocation] = useState<{
      lat: number;
      lng: number;
    } | null>(null);
 const [popupData, setPopupData] = useState({
        type: "",
        description: "",
      });
  const [files, setFiles] = useState<File[]>([]);
  const [playingFile, setPlayingFile] = useState<string | null>(null);

useEffect(()=>{
     const data=window && window.localStorage.getItem(draft)
     const datas=data && JSON.parse(data)
     setSelectedLocation({lat:datas.lat,lng:datas.lng})
     setPopupData({type:datas.type,description:datas.description})
},[])







  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...e.target.files]); // Collect all selected files
    }
  };

  const handlePlayPause = (fileUrl: string) => {
    if (playingFile === fileUrl) {
      setPlayingFile(null); // Stop playing
    } else {
      setPlayingFile(fileUrl); // Start playing
    }
  };

  const handleSubmit = () => {
    if (files.length === 0) {
      alert("Please upload at least one file!");
      return;
    }

    // Pass data to the parent or backend
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    // formData.append("latitude", location);
    // formData.append("longitude", location);

    // onSubmit(formData);
  };

  return (
    <div className=" mx-10">
      <div className="">
    <Card sx={{ mt: 4, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Upload Multimedia
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Location: Latitude {selectedLocation?.lat}, Longitude {selectedLocation?.lng}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <input
            id="file-upload"
            type="file"
            multiple
            accept="image/*,audio/*,video/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <IconButton
              color="primary"
              component="span"
              aria-label="upload files"
            >
              <UploadFileIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </label>
          <Typography variant="body2" sx={{ ml: 1 }}>
            {files.length > 0
              ? `${files.length} file(s) selected`
              : "No files selected"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
    </div>
    <div className="">
    {files.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Selected Files:
            </Typography>
                 <div className="grid lg:grid-cols-2 gap-10 justify-center" >
              {files.map((file, index) => {
                const fileUrl = URL.createObjectURL(file);
                return (
                    <Box
                    key={index}
                      sx={{
                        width: 400,
                        height: 400,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #ccc",
                        borderRadius: 2,
                        overflow: "hidden",
                        flexDirection: "column",
                      }}
                    >
                      {file.type.startsWith("image/") ? (
                        <img
                          src={fileUrl}
                          alt={file.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : file.type.startsWith("audio/") ? (
                        <Box>
                          <audio controls src={fileUrl} style={{ width: "100%" }} />
                        </Box>
                      ) : file.type.startsWith("video/") ? (
                        <Box>
                          <video
                            controls
                            src={fileUrl}
                            style={{ width: "100%", height: "100%" }}
                          />
                        </Box>
                      ) : (
                        <Typography
                          variant="caption"
                          sx={{ textAlign: "center", padding: 1 }}
                        >
                          File
                        </Typography>
                      )}
                    </Box>
                );
              })}
              </div>
          </Box>
        )}
        </div>
    </div>
  );
};

export default MultimediaForm;
