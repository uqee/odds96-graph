// documentation
// https://js.cytoscape.org/#style

// another awesome tool
// https://www.yworks.com/yed-live/

import cytoscape, { CytoscapeOptions } from 'cytoscape';
import cytoscapeCoseBilkent from 'cytoscape-cose-bilkent';
import cytoscapeNavigator from 'cytoscape-navigator';
import 'cytoscape-navigator/cytoscape.js-navigator.css';
import materialColors from 'material-colors';

import { GRAPH } from './GRAPH';
import './index.css';
import { Edge, getNode } from './src';

cytoscape.use(cytoscapeCoseBilkent);
cytoscapeNavigator(cytoscape);

//

const elements: CytoscapeOptions['elements'] = {
  nodes: [],
  edges: [],
};

for (let i = 0; i < GRAPH.length; i++) {
  const item = GRAPH[i];

  item.ROOT = i === 0 ? true : undefined;
  elements.nodes.push(getNode(item).build());

  for (const link of item.LINKS ?? []) {
    elements.edges.push(
      new Edge(
        Array.isArray(link)
          ? { source: item.ID, target: link[0], label: link[1] }
          : { source: item.ID, target: link }
      ).build()
    );
  }
}

console.log(elements);

//

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
        content: 'data(content)',
        'font-family': 'PT Mono, monospace',
      },
    },
    {
      selector: 'edge',
      style: {
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
      selector: 'node[TYPE="CLIENT"][status="ACTIVE"]',
      style: {
        'background-color': materialColors.blue['100'],
        'border-color': materialColors.blue['700'],
        color: materialColors.blue['700'],
      },
    },
    {
      selector: 'node[TYPE="CLIENT"][status="ACTIVE"][ROOT]',
      style: {
        'background-color': materialColors.blue['500'],
        color: materialColors.white,
      },
    },
    {
      selector: 'node[TYPE="CLIENT"][status="BLOCKED"]',
      style: {
        'background-color': materialColors.red['100'],
        'border-color': materialColors.red['700'],
        color: materialColors.red['700'],
      },
    },
    {
      selector: 'node[TYPE="CLIENT"][status="BLOCKED"][ROOT]',
      style: {
        'background-color': materialColors.red['500'],
        color: materialColors.white,
      },
    },
    {
      selector: 'node[TYPE="DEVICE"], node[TYPE="WALLET"]',
      style: {
        'background-color': materialColors.cyan['100'],
        'border-color': materialColors.cyan['700'],
        color: materialColors.cyan['700'],
      },
    },
  ],
}).navigator();
