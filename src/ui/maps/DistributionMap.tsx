'use client'
import React, {useState} from 'react';
import MapWrapper from './MapWrapper';
import {Map, NavigationControl, Popup, useControl} from 'react-map-gl';
import {GeoJsonLayer, ArcLayer, DeckProps, ScatterplotLayer, HeatmapLayer} from 'deck.gl';
import {MapboxOverlay} from '@deck.gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import {mapData,parkingAreaInfo} from "@/lib/definition";

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
    'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

// Set your Mapbox token here or via environment variable
// const MAPBOX_TOKEN = "pk.eyJ1IjoidnY4ejg2IiwiYSI6ImNtNGVxdXc0ODEyMnIyanEweHdwZzF0b2kifQ.B5Num2zwPZCsKSGqu07iqQ"; // eslint-disable-line

const INITIAL_VIEW_STATE = {
    latitude: 31.251180073866866,
    longitude:121.45280296476405,
    zoom: 12,
    bearing: 0,
    pitch: 0
};

const MAP_STYLE = 'mapbox://styles/mapbox/light-v11';

function DeckGLOverlay(props: DeckProps) {
    const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
    overlay.setProps(props);
    return null;
}

export default function ({mapData,parkingAreaInfo}:{mapData:mapData[],parkingAreaInfo:parkingAreaInfo[]}) {
    const [selected, setSelected] = useState(null);
    const layers = [
        new ScatterplotLayer<mapData>({
            id: 'bikeScatterPlot',
            data: mapData,
            getPosition:(d:mapData)=>d.coordinate,
            getFillColor:[255,140,0],
            radiusScale:3,
            radiusMinPixels:0.5,
            radiusMaxPixels:5,
            pickable: true,
        }),
        new ScatterplotLayer<parkingAreaInfo>({
            id: 'parkingAreaScatterPlot',
            data: parkingAreaInfo,
            getPosition:(d:parkingAreaInfo)=>d.coordinate,
            getRadius:(d:parkingAreaInfo)=>d.radius,
            radiusScale:3,
            radiusMinPixels:3,
            pickable: true,
            filled:true,
            getFillColor:[0,255,140,100]

        }),
        new HeatmapLayer<mapData>({
            id:'heatmap',
            data:mapData,
            aggregation:'SUM',
            getPosition:(d:mapData)=>d.coordinate,
            getWeight:1,
            radiusPixels:25
        })
    ];

    return (
        <MapWrapper>
            <Map
                initialViewState={INITIAL_VIEW_STATE}
                mapStyle={MAP_STYLE}
                mapboxAccessToken={'pk.eyJ1IjoidnY4ejg2IiwiYSI6ImNtNGVxdXc0ODEyMnIyanEweHdwZzF0b2kifQ.B5Num2zwPZCsKSGqu07iqQ'}
            >
                {selected && (
                    <Popup
                        key={selected.properties.name}
                        anchor="bottom"
                        style={{zIndex: 10}} /* position above deck.gl canvas */
                        longitude={selected.geometry.coordinates[0]}
                        latitude={selected.geometry.coordinates[1]}
                    >
                        {selected.properties.name} ({selected.properties.abbrev})
                    </Popup>
                )}
                <DeckGLOverlay layers={layers} /* interleaved*/ />
                <NavigationControl position="top-left"/>
            </Map>
        </MapWrapper>
    );
}

