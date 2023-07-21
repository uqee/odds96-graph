import { CytoscapeOptions } from 'cytoscape';
import { Edge, Emoji, Node, NodeStatus, NodeType } from './src';

export const elements: CytoscapeOptions['elements'] = {
  nodes: [
    new Node({
      bal: 110,
      dps: 370,
      id: 267376,
      name: 'Gulam Abdul Kadir',
      pnl: 45,
      root: true,
      proof: `5850 ${Emoji.CROSS}`,
      status: NodeStatus.ACTIVE,
      // type: NodeType.PERSON,
      wds: 325,
    }).build(),

    new Node({
      bal: 260,
      dps: 10500,
      id: 127448,
      name: 'Gulam Ashraf',
      pnl: 2800,
      proof: `5340 ${Emoji.CROSS}`,
      status: NodeStatus.ACTIVE,
      // type: NodeType.PERSON,
      wds: 7700,
    }).build(),

    new Node({
      bal: 6,
      dps: 820,
      id: 265519,
      name: 'Gulam Jilani',
      pnl: 380,
      proof: `5340 ${Emoji.CHECKMARK}`,
      status: NodeStatus.ACTIVE,
      // type: NodeType.PERSON,
      wds: 440,
    }).build(),

    new Node({
      bal: 0,
      dps: 436,
      id: 265455,
      name: 'Nasir Husain',
      pnl: 280,
      proof: `5340 ${Emoji.HOURGLASS}`,
      status: NodeStatus.BLOCKED,
      // type: NodeType.PERSON,
      wds: 156,
    }).build(),

    new Node({
      bal: 0,
      dps: 0,
      id: 301868,
      name: 'Nasir Husain',
      pnl: 0,
      proof: undefined,
      status: NodeStatus.ACTIVE,
      // type: NodeType.PERSON,
      wds: 0,
    }).build(),
  ],
  edges: [
    new Edge({
      comment: '5850 7325',
      source: 267376,
      target: 127448,
    }).build(),
  ],
};
