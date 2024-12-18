'use client'
import React, {useState} from 'react';
import MapWrapper from './MapWrapper';
import {Map, NavigationControl, Popup, useControl} from 'react-map-gl';
import {GeoJsonLayer, ArcLayer, DeckProps} from 'deck.gl';
import {MapboxOverlay} from '@deck.gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import {usageData} from "@/lib/definition";
import {usageColor} from "@/lib/utils";

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

export default function ({usageData}:{usageData:usageData[]}) {
    const [selected, setSelected] = useState(null);
    const layers = [
        new ArcLayer<usageData>({
            id:'bikeUsageArcLayer',
            data:usageData,
            getSourcePosition:(d:usageData)=>d.startCoordinate,
            getTargetPosition:(d:usageData)=>d.endCoordinate,
            getSourceColor:(d:usageData)=>usageColor(d.startTime),
            getTargetColor:(d:usageData)=>usageColor(d.endTime),
        }),
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

