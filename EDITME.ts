import { CytoscapeOptions } from 'cytoscape';
import { Edge, Node, NodeStatus } from './src';

export const elements: CytoscapeOptions['elements'] = {
  nodes: [
    new Node({
      comment:
        '+ **267376** active + balance/pnl **110/45** + dps/wds **370/325** + name **Gulam Abdul Kadir** + proof **5850** ❌',
      id: 267376,
      status: NodeStatus.ACTIVE,
    }).build(),
    new Node({
      comment:
        '+ **267376** active + balance/pnl **110/45** + dps/wds **370/325** + name **Gulam Abdul Kadir** + proof **5850** ❌',
      id: 2,
      status: NodeStatus.ACTIVE,
    }).build(),
  ],
  edges: [
    new Edge({
      comment: 'a: hello\nb:hello',
      source: 267376,
      target: 2,
    }).build(),
  ],
};
