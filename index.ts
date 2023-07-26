// documentation
// https://js.cytoscape.org/#style

// another awesome tool
// https://www.yworks.com/yed-live/

import cytoscape from 'cytoscape';
import cytoscapeCoseBilkent from 'cytoscape-cose-bilkent';
import cytoscapeNavigator from 'cytoscape-navigator';
import 'cytoscape-navigator/cytoscape.js-navigator.css';
import materialColors from 'material-colors';

import { clientInputs } from './data';
import './index.css';
import { toElements } from './src';

cytoscape.use(cytoscapeCoseBilkent);
cytoscapeNavigator(cytoscape);

cytoscape({
  container: document.getElementById('index'),
  elements: toElements(clientInputs),
  layout: {
    name: 'cose-bilkent',
  },
  style: [
    {
      selector: '*',
      style: {
        content: 'data(content)',
        'font-family': 'PT Mono, monospace',
      },
    },
    {
      selector: 'edge',
      style: {
        color: materialColors.grey['700'],
        'curve-style': 'straight',
        'text-rotation': 'autorotate',
        width: '1px',
      },
    },
    {
      selector: 'node',
      style: {
        'border-width': '1px',
        height: 'label',
        // @ts-ignore
        padding: '0.5em',
        shape: 'round-rectangle',
        'text-justification': 'left',
        'text-valign': 'center',
        'text-wrap': 'wrap',
        width: 'label',
      },
    },
    {
      selector: 'node[type="CLIENT"][status="Active"]',
      style: {
        'background-color': materialColors.blue['100'],
        'border-color': materialColors.blue['700'],
        color: materialColors.blue['700'],
      },
    },
    {
      selector: 'node[type="CLIENT"][status="Active"][root]',
      style: {
        'background-color': materialColors.blue['500'],
        color: materialColors.white,
      },
    },
    {
      selector: 'node[type="CLIENT"][status="Blocked"]',
      style: {
        'background-color': materialColors.red['100'],
        'border-color': materialColors.red['700'],
        color: materialColors.red['700'],
      },
    },
    {
      selector: 'node[type="CLIENT"][status="Blocked"][root]',
      style: {
        'background-color': materialColors.red['500'],
        color: materialColors.white,
      },
    },
    {
      selector: 'node[type="UNKNOWN"]',
      style: {
        'background-color': materialColors.cyan['100'],
        'border-color': materialColors.cyan['700'],
        color: materialColors.cyan['700'],
      },
    },
  ],
}).navigator();
