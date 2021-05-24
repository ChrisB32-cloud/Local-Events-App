import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Geocode from 'react-geocode'
import ReactMapGL, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'


export default function EventMap({ evt }) {

    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [loading, setLoading] = useState(true)
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: 36.5298,
        longitude: -87.3595,
        zoom: 8
    });

    Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

    // console.log(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);
    // set response language. Defaults to english.
    Geocode.setLanguage("en");

    // Get latitude & longitude from address.
    useEffect(() => {
        Geocode.fromAddress(evt.address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
                setLat(lat)
                setLng(lng)
            },
            (error) => {
                console.error(error);
            }
        );
    }, [])

    // console.log(evt);
    return (
        <div>
            <ReactMapGL
                {...viewport}
                onViewportChange={(viewport) => setViewport(viewport)}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
            />
        </div>
    )
}
