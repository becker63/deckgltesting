import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";

const DATA_URL =
  'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/arc/counties.json';

const root = createRoot(document.getElementById('root'))

root.render(<App/>)


  