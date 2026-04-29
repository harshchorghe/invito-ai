"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Navigation, MapPin, Loader2, Navigation2 } from "lucide-react";
import { Button } from "./ui/Button";

// Fix Leaflet default icon paths in Next.js
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

type VenueMapProps = {
  venue: string;
};

// Component to dynamically adjust map bounds
function ChangeView({ bounds }: { bounds: L.LatLngBounds | null }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [bounds, map]);
  return null;
}

export default function VenueMap({ venue }: VenueMapProps) {
  const [venueCoords, setVenueCoords] = useState<[number, number] | null>(null);
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
  const [routeCoords, setRouteCoords] = useState<[number, number][] | null>(null);
  
  const [status, setStatus] = useState<"loading" | "ready" | "not_found" | "error">("loading");
  const [routingStatus, setRoutingStatus] = useState<"idle" | "locating" | "routing" | "done" | "error">("idle");
  const [routingErrorMsg, setRoutingErrorMsg] = useState("");

  const [mapBounds, setMapBounds] = useState<L.LatLngBounds | null>(null);

  useEffect(() => {
    async function geocode() {
      if (!venue || venue.trim().length === 0) {
        setStatus("not_found");
        return;
      }
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(venue)}`;
        const res = await fetch(url);
        const data = await res.json();
        
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          setVenueCoords([lat, lon]);
          setMapBounds(L.latLngBounds([[lat, lon], [lat, lon]]));
          setStatus("ready");
        } else {
          setStatus("not_found");
        }
      } catch (err) {
        console.error("Geocoding failed:", err);
        setStatus("error");
      }
    }
    
    geocode();
  }, [venue]);

  const handleGetDirections = () => {
    if (!venueCoords) return;
    
    setRoutingStatus("locating");
    setRoutingErrorMsg("");
    
    if (!navigator.geolocation) {
      setRoutingStatus("error");
      setRoutingErrorMsg("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const uCoords: [number, number] = [position.coords.latitude, position.coords.longitude];
        setUserCoords(uCoords);
        setRoutingStatus("routing");

        try {
          // OSRM expects lon,lat format
          const url = `https://router.project-osrm.org/route/v1/driving/${uCoords[1]},${uCoords[0]};${venueCoords[1]},${venueCoords[0]}?overview=full&geometries=geojson`;
          const res = await fetch(url);
          const data = await res.json();
          
          if (data.routes && data.routes.length > 0) {
            // OSRM returns GeoJSON coordinates as [lon, lat], Leaflet needs [lat, lon]
            const rCoords = data.routes[0].geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]);
            setRouteCoords(rCoords);
            
            // Adjust bounds to fit both points and the route
            const bounds = L.latLngBounds(uCoords, venueCoords);
            setMapBounds(bounds);
            setRoutingStatus("done");
          } else {
            setRoutingStatus("error");
            setRoutingErrorMsg("Could not find a driving route.");
          }
        } catch (err) {
          console.error("Routing failed:", err);
          setRoutingStatus("error");
          setRoutingErrorMsg("Failed to connect to routing service.");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setRoutingStatus("error");
        setRoutingErrorMsg("Please allow location access to get directions.");
      }
    );
  };

  if (status === "loading") {
    return (
      <div className="w-full h-64 glass border border-white/10 rounded-2xl flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (status === "not_found" || status === "error") {
    return (
      <div className="w-full mt-8 glass border border-white/10 rounded-2xl p-6 text-center shadow-2xl">
        <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-50" />
        <h3 className="font-medium text-lg mb-1">Event Location</h3>
        <p className="text-muted-foreground text-sm mb-4">
          {venue}
        </p>
        <div className="inline-flex items-center gap-2 text-xs text-yellow-500/80 bg-yellow-500/10 px-3 py-1.5 rounded-full border border-yellow-500/20">
          Map routing unavailable for this specific address. Try entering a city or street name.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div className="glass border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full">
        <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center flex-wrap gap-4">
          <div>
            <h3 className="font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Event Location
            </h3>
            <p className="text-sm text-muted-foreground">{venue}</p>
          </div>
          
          {routingStatus === "idle" || routingStatus === "error" ? (
            <Button onClick={handleGetDirections} variant="default" size="sm" className="gap-2">
              <Navigation className="w-4 h-4" />
              Get Directions
            </Button>
          ) : routingStatus === "done" ? (
            <div className="text-sm text-green-500 flex items-center gap-2 font-medium">
              <Check className="w-4 h-4" /> Route generated
            </div>
          ) : (
            <div className="text-sm text-primary flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> 
              {routingStatus === "locating" ? "Locating you..." : "Calculating route..."}
            </div>
          )}
        </div>
        
        {routingErrorMsg && (
          <div className="bg-red-500/10 text-red-400 text-xs px-4 py-2 border-b border-white/5">
            {routingErrorMsg}
          </div>
        )}

        <div className="h-64 md:h-80 w-full relative z-0">
          {venueCoords && (
            <MapContainer 
              center={venueCoords} 
              zoom={14} 
              style={{ height: '100%', width: '100%', background: '#1a1a1a' }}
              zoomControl={false}
            >
              {/* Dark mode tiles for aesthetic fit */}
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              
              <Marker position={venueCoords}>
                <Popup>Event Location: {venue}</Popup>
              </Marker>
              
              {userCoords && (
                <Marker position={userCoords} icon={
                  L.icon({
                    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    className: "hue-rotate-[240deg]" // Turn user marker slightly different color
                  })
                }>
                  <Popup>Your Location</Popup>
                </Marker>
              )}

              {routeCoords && (
                <Polyline positions={routeCoords} color="#3b82f6" weight={5} opacity={0.8} />
              )}
              
              <ChangeView bounds={mapBounds} />
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
}

// Needed because I used `Check` from lucide-react but forgot to import it.
import { Check } from "lucide-react";
