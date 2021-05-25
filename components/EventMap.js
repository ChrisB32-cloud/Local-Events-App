import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import ReactMapGl, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Geocode from 'react-geocode'

export default function EventMap({ evt }) {

    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [loading, setLoading] = useState(true)
    const [viewport, setViewport] = useState({
        latitude: 36.5298,
        longitude: -87.3595,
        width: "100%",
        height: "500px",
        zoom: 12
    });



    // console.log(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);
    // set response language. Defaults to english.
    // Geocode.setLanguage("en");

    // // Get latitude & longitude from address.
    // useEffect(() => {
    //     Geocode.fromAddress(evt.address).then(
    //         (response) => {
    //             const { lat, lng } = response.results[0].geometry.location;
    //             // console.log(lat, lng);
    //             setLat(lat)
    //             setLng(lng)
    //             setViewport({ ...viewport, latitude: lat, longitude: lng })
    //             setLoading(false)
    //         },
    //         (error) => {
    //             console.error(error);
    //         }
    //     );
    // }, [])

    // Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

    if (loading) return false

    console.log(lat, lng);
    return (
        <ReactMapGl
            {...viewport}
            onViewportChange={(vp) => setViewport(vp)}
            mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}

        >
            <Marker key={evt.id} latitude={lat} longitude={lng}>
                <Image
                    src='/images/pin.svg'
                    width={30}
                    height={30}
                />
            </Marker>
        </ReactMapGl>
    )
}
