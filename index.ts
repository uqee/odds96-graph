import cytoscape from 'cytoscape';
import cytoscapeCoseBilkent from 'cytoscape-cose-bilkent';
import cytoscapeNavigator from 'cytoscape-navigator';
import 'cytoscape-navigator/cytoscape.js-navigator.css';
import materialColors from 'material-colors';

import { elements } from './EDITME';
import './index.css';

cytoscape.use(cytoscapeCoseBilkent);
cytoscapeNavigator(cytoscape);

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
        height: 'label',
        // @ts-ignore
        padding: '0.5em',
        'text-justification': 'left',
        'text-valign': 'center',
        'text-wrap': 'wrap',
        width: 'label',
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
        'border-width': '1px',
        shape: 'round-rectangle',
      },
    },
    {
      selector: 'node[status = "ACTIVE"]',
      style: {
        'background-color': materialColors.blue['100'],
        'border-color': materialColors.blue['700'],
        color: materialColors.blue['700'],
      },
    },
    {
      selector: 'node[status = "ACTIVE"][root]',
      style: {
        'background-color': materialColors.blue['500'],
        color: materialColors.white,
      },
    },
    {
      selector: 'node[status = "BLOCKED"]',
      style: {
        'background-color': materialColors.red['100'],
        'border-color': materialColors.red['700'],
        color: materialColors.red['700'],
      },
    },
    {
      selector: 'node[status = "BLOCKED"][root]',
      style: {
        'background-color': materialColors.red['500'],
        color: materialColors.white,
      },
    },
  ],
}).navigator();
