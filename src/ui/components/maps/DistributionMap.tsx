'use client'
import React from 'react';
import MapWrapper from './MapWrapper';
import {Map, NavigationControl, useControl} from 'react-map-gl';
import {DeckProps, ScatterplotLayer, HeatmapLayer,IconLayer} from 'deck.gl';
import {MapboxOverlay} from '@deck.gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import {mapData,parkingAreaInfo} from "@/lib/definition";

const INITIAL_VIEW_STATE = {
    latitude: 31.251180073866866,
    longitude:121.45280296476405,
    zoom: 12,
    bearing: 0,
    pitch: 0
};

const MAP_STYLE = 'mapbox://styles/mapbox/light-v11';

function DeckGLOverlay(props: DeckProps) {
    // @ts-ignore
    const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
    overlay.setProps(props);
    return null;
}

export default function ({mapData,parkingAreaInfo}:{mapData:mapData[],parkingAreaInfo:parkingAreaInfo[]}) {
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
            radiusScale:1,
            radiusMinPixels:3,
            pickable: true,
            filled:true,
            getFillColor:[0,255,140,100]

        }),
        new IconLayer<parkingAreaInfo>({
            id:"parkingAreaIconLayer",
            data:parkingAreaInfo,
            getPosition:(d:parkingAreaInfo)=>d.coordinate,
            getColor:[0,140,255],
            getSize:20,
            sizeMinPixels:10,
            getIcon:()=>'marker',
            iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
            iconMapping: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.json',
            pickable:true
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
                <DeckGLOverlay layers={layers} /* interleaved*/ />
                <NavigationControl position="top-left"/>
            </Map>
        </MapWrapper>
    );
}

