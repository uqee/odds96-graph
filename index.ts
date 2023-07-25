// documentation
// https://js.cytoscape.org/#style

// another awesome tool
// https://www.yworks.com/yed-live/

import cytoscape, { CytoscapeOptions } from 'cytoscape';
import cytoscapeCoseBilkent from 'cytoscape-cose-bilkent';
import cytoscapeNavigator from 'cytoscape-navigator';
import 'cytoscape-navigator/cytoscape.js-navigator.css';
import materialColors from 'material-colors';

import { clientInputs } from './data';
import './index.css';
import {
  Client,
  Device,
  Link,
  Entity,
  EntityId,
  EntityType,
  Wallet,
} from './src';

cytoscape.use(cytoscapeCoseBilkent);
cytoscapeNavigator(cytoscape);

//

const elements: CytoscapeOptions['elements'] = {
  nodes: [],
  edges: [],
};

const edges: Map<EntityId, Link> = new Map();
const nodes: Map<EntityId, Entity> = new Map();

for (let i = 0; i < clientInputs.length; i++) {
  const clientInput = clientInputs[i];

  const client: Client = new Client(clientInput);
  nodes.set(client.id, client);

  for (const linkDevice of client.linkDevices) {
    //

    if (!nodes.has(linkDevice.clientId)) {
      nodes.set(linkDevice.clientId, new Client({ id: linkDevice.clientId }));
    }

    if (!nodes.has(linkDevice.deviceId)) {
      nodes.set(linkDevice.deviceId, new Device({ id: linkDevice.deviceId }));
    }
  }

  for (const linkWallet of client.linkWallets) {
    //

    if (!nodes.has(linkWallet.clientId)) {
      nodes.set(linkWallet.clientId, new Client({ id: linkWallet.clientId }));
    }

    if (!nodes.has(linkWallet.walletId)) {
      nodes.set(linkWallet.walletId, new Wallet({ id: linkWallet.walletId }));
    }
  }
}

for (const edge of edges.values()) elements.edges.push(edge.build());
for (const node of nodes.values()) elements.nodes.push(node.build());

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
      selector: 'node[type="DEVICE"], node[type="WALLET"]',
      style: {
        'background-color': materialColors.cyan['100'],
        'border-color': materialColors.cyan['700'],
        color: materialColors.cyan['700'],
      },
    },
  ],
}).navigator();
