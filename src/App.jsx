import React, {useState, useMemo, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
import {OBJLoader} from '@loaders.gl/obj';
import {Map} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import DeckGL from '@deck.gl/react';
import {GeoJsonLayer, ArcLayer} from '@deck.gl/layers';
import { exampledata } from './exampledata';

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';

const INITIAL_VIEW_STATE = {

    longitude: -122.4,
    latitude: 37.74,
    zoom: 11,
    maxZoom: 20,
    pitch: 30,
    bearing: 0
};

/* eslint-disable react/no-deprecated */
export default function App({data, mapStyle = MAP_STYLE}) {
  const [selectedCounty, selectCounty] = useState(null);
  
  
  const layers = [
    new GeoJsonLayer({
      id: 'geojson',
      data,
      stroked: false,
      filled: true,
      getFillColor: [0, 0, 0, 0],
      onClick: ({object}) => selectCounty(object),
      pickable: true
    }),

    new SimpleMeshLayer({
      id: 'SimpleMeshLayer',
      data: exampledata,
      
      /* props from SimpleMeshLayer class */
      
      getColor: d => [Math.sqrt(d.exits), 140, 0],
      getPosition: d => d.coordinates,
      mesh: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/humanoid_quad.obj',
      sizeScale: 30,
      
      /* props inherited from Layer class */
      
      loaders: [OBJLoader],
      pickable: true,
    }),
  ];

  return (
    <DeckGL
      layers={layers}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      getTooltip={({object}) => object && `${object.coordinates}
      ${object.address}`}
    >
      <Map reuseMaps mapLib={maplibregl} mapStyle={mapStyle} preventStyleDiffing={true} />
    </DeckGL>
  );
}