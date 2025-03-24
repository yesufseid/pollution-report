"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon issue
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Dynamically import React Leaflet components
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });
const useMapEvents = require("react-leaflet").useMapEvents; // Use require instead of dynamic import

const PollutionMap = () => {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [popupData, setPopupData] = useState({
    type: "",
    description: "",
  });
  const [activeLayer, setActiveLayer] = useState("OpenStreetMap"); // State for active layer

  const MapClickHandler = () => {
    useMapEvents({
      click: (event:any) => {
        const { lat, lng } = event.latlng;
        setSelectedLocation({ lat, lng });
      },
    });
    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPopupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setPopupData((prev) => ({
      ...prev,
      [name || "type"]: value as string,
    }));
  };

  const handleSubmit = () => {
    if (popupData.type && popupData.description && selectedLocation) {
      alert("Pollution report submitted!");
      setSelectedLocation(null); // Close popup after submission
      setPopupData({ type: "", description: "" }); // Reset form
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <Box sx={{ width: "100%", height: "600px" }}>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6">Choose Map Layer</Typography>
        <Select
          value={activeLayer}
          onChange={(e) => setActiveLayer(e.target.value)}
          fullWidth
        >
          <MenuItem value="OpenStreetMap">OpenStreetMap</MenuItem>
          <MenuItem value="GPSMap">GPS Map</MenuItem>
          <MenuItem value="Satellite">Satellite</MenuItem>
        </Select>
      </Box>
      <MapContainer
        center={[9.03, 38.75]} // Default center (e.g., Addis Ababa)
        zoom={12}
        style={{ height: "100%", width: "100%", zIndex: 1 }}
      >
        <MapClickHandler />
        {/* Switch between layers based on activeLayer state */}
        {activeLayer === "OpenStreetMap" && (
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
        )}
        {activeLayer === "GPSMap" && (
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution="Map data: &copy; OpenTopoMap & contributors"
          />
        )}
        {activeLayer === "Satellite" && (
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="&copy; Esri, DigitalGlobe, GeoEye, Earthstar Geographics, and the GIS User Community"
          />
        )}

        {selectedLocation && (
          <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
            <Popup>
              <Box sx={{ padding: 2, width: 250 }}>
                <Typography variant="h6" gutterBottom>
                  Report Pollution
                </Typography>
                <Select
                  fullWidth
                  name="type"
                  value={popupData.type}
                  onChange={()=>handleSelectChange}
                  displayEmpty
                >
                  <MenuItem value="">Select Pollution Type</MenuItem>
                  <MenuItem value="water">Water</MenuItem>
                  <MenuItem value="air">Air</MenuItem>
                  <MenuItem value="sound">Sound</MenuItem>
                </Select>
                <TextField
                  name="description"
                  value={popupData.description}
                  onChange={handleInputChange}
                  label="Describe the issue"
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  fullWidth
                >
                  Submit
                </Button>
              </Box>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </Box>
  );
};

export default PollutionMap;
