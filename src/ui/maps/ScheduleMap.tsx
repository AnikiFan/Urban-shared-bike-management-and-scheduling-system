'use client'
import React, {useEffect, useState} from 'react';
import MapWrapper from './MapWrapper';
import {Map, NavigationControl, Popup, useControl} from 'react-map-gl';
import {GeoJsonLayer, ArcLayer, DeckProps} from 'deck.gl';
import {MapboxOverlay} from '@deck.gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import {useSelected} from "@/ui/components/SelectContext";
import {getSchedulingHistory} from "@/lib/actions";
import {requiredSchedulingHistory, schedulingData} from "@/lib/definition";
import {usageColor} from "@/lib/utils";

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

export default function UsageMap() {
    const selectedBike = useSelected();
    const [scheduleHistory,setScheduleHistory] = useState<requiredSchedulingHistory[]>([]);
    useEffect(() => {getSchedulingHistory(selectedBike).then((value)=>setScheduleHistory(value))},[selectedBike])
    const layers = [
        new ArcLayer({
            id: 'schedulingHistoryArcLayer',
            data: scheduleHistory,
            getSourcePosition:(d:requiredSchedulingHistory)=>d.startCoordinate,
            getTargetPosition:(d:requiredSchedulingHistory)=>d.endCoordinate,
            getSourceColor:(d:requiredSchedulingHistory)=>usageColor(d.startTime),
            getTargetColor:(d:requiredSchedulingHistory)=>usageColor(d.endTime),
            getWidth:10
        })
    ];

    return (
        <MapWrapper>
            <Map
                initialViewState={INITIAL_VIEW_STATE}
                mapStyle={MAP_STYLE}
                mapboxAccessToken={'pk.eyJ1IjoidnY4ejg2IiwiYSI6ImNtNGVxdXc0ODEyMnIyanEweHdwZzF0b2kifQ.B5Num2zwPZCsKSGqu07iqQ'}
            >
                <DeckGLOverlay layers={layers} /* interleaved*/ />
                <NavigationControl position="top-left"/>
            </Map>
        </MapWrapper>
    );
}

