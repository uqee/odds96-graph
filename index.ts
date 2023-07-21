import cytoscape, { CytoscapeOptions } from 'cytoscape';
import cytoscapeCoseBilkent from 'cytoscape-cose-bilkent';
import cytoscapeNavigator from 'cytoscape-navigator';
import 'cytoscape-navigator/cytoscape.js-navigator.css';

// @ts-ignore
import elements from './EDITME.json';
import './index.css';

cytoscape.use(cytoscapeCoseBilkent);
cytoscapeNavigator(cytoscape);

// const COLORS = {};

cytoscape({
  container: document.getElementById('index'),
  elements: elements as CytoscapeOptions['elements'],
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
        // @ts-ignore
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
