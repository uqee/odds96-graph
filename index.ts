import cytoscape, { CytoscapeOptions } from 'cytoscape';
import cytoscapeCoseBilkent from 'cytoscape-cose-bilkent';
import cytoscapeNavigator from 'cytoscape-navigator';
import 'cytoscape-navigator/cytoscape.js-navigator.css';
import materialColors from 'material-colors';

// @ts-ignore
import elements from './EDITME.json';
import './index.css';

cytoscape.use(cytoscapeCoseBilkent);
cytoscapeNavigator(cytoscape);

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
      style: {
        color: materialColors.blue['700'],
        'line-color': materialColors.blue['700'],
        width: '1px',
      },
    },
    {
      selector: 'node',
      style: {
        'background-color': materialColors.blue['100'],
        'border-color': materialColors.blue['700'],
        'border-width': '1px',
        color: materialColors.blue['700'],
        shape: 'round-rectangle',
        width: 'label',
      },
    },
    {
      selector: 'node#1',
      style: {
        'background-color': materialColors.blue['500'],
        'border-color': materialColors.blue['700'],
        'border-width': '1px',
        color: materialColors.white,
        shape: 'round-rectangle',
        width: 'label',
      },
    },
  ],
}).navigator();
