import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useAlert } from 'react-alert';

import HomeViewModel from './HomeViewModel';
import UserRepositoryInMemory from '../../../infrastructure/repositories/UserRepositoryInMemory';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const center = {
    lat: -6.230542008213134,
    lng: 106.81733782258075
};

const API_KEY = process.env.REACT_APP_GMAPS_API_KEY

function HomePage() {
    const alert = useAlert();

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY ? API_KEY : '',
    })

    const { listUsers, getListUsers, getRole, map, setMap, getMarkers, init } = HomeViewModel(UserRepositoryInMemory.getInstance())

    const onLoad = useCallback((map: any) => {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = useCallback((map: any) => {
        setMap(null)
    }, [])

    useEffect(() => {
        init()
        getListUsers()
    }, [])

    return isLoaded ? (
        <div>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {
                    map ? getMarkers().map((marker) => (
                        <Marker
                            key={marker.id}
                            position={{ lat: marker.gps_x_coordinate, lng: marker.gps_y_coordinate }}
                            label={marker.name}
                        />
                    )) : <></>
                }
            </GoogleMap>
            <button className="close-btn" onClick={() => alert.show('Dengan menutup halaman ini anda akan perlu login kembali', {
                timeout: 1000, // custom timeout just for this one alert
                type: 'info',
                onClose: () => {
                    console.log('closed')
                },
            })}>X</button>
        </div>
    ) : <></>
}

export default HomePage;