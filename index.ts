import cytoscape from 'cytoscape';
import cytoscapeCoseBilkent from 'cytoscape-cose-bilkent';
import cytoscapeNavigator from 'cytoscape-navigator';

import 'cytoscape-navigator/cytoscape.js-navigator.css';
import './index.css';

import { elements } from './EDITME';

cytoscape.use(cytoscapeCoseBilkent);
cytoscapeNavigator(cytoscape);

// const COLORS = {};

cytoscape({
  container: document.getElementById('index'),
  elements,
  layout: {
    name: 'cose-bilkent',
  },
  style: [
    {
      selector: '*',
      style: {
        label: 'data(label)',
        content: 'data(content)',
        'font-family': 'PT Mono, monospace',
        padding: '0.5em',
        'text-valign': 'center',
        'text-wrap': 'wrap',
      },
    },
    {
      selector: 'edge',
      style: {},
    },
    {
      selector: 'node',
      style: {
        'background-color': '#CAE2FF',
        'border-color': '#007BFF',
        'border-width': '1px',
        color: '#007BFF',
        shape: 'round-rectangle',
        width: 'label',
      },
    },
    {
      selector: 'node#1',
      style: {
        'background-color': '#007BFF',
        'border-color': '#007BFF',
        'border-width': '1px',
        color: 'white',
        shape: 'round-rectangle',
        width: 'label',
      },
    },
  ],
}).navigator();
