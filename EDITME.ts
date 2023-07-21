import { CytoscapeOptions } from 'cytoscape';
import {
  ClientData,
  ClientStatus,
  DeviceData,
  Edge,
  Emoji,
  getNode,
  NodeData,
  NodeId,
  NodeType,
  WalletData,
} from './src';

type ItemLink = NodeId | [NodeId, string];
type Item = (ClientData | DeviceData | NodeData | WalletData) & {
  LINKS?: ItemLink[];
};

const graph: Item[] = [
  {
    LINKS: [5850, 7325],
    bal: 110,
    dps: 370,
    id: 267376,
    name: 'Gulam Abdul Kadir',
    pnl: 45,
    proof: `5850 ${Emoji.CROSS}`,
    status: ClientStatus.ACTIVE,
    type: NodeType.CLIENT,
    wds: 325,
  },
  {
    LINKS: [5340, 5850, 7325],
    bal: 260,
    dps: 10500,
    id: 127448,
    name: 'Gulam Ashraf',
    pnl: 2800,
    proof: `5340 ${Emoji.CROSS}`,
    status: ClientStatus.ACTIVE,
    type: NodeType.CLIENT,
    wds: 7700,
  },
  {
    LINKS: [5340, 5850, 7325],
    bal: 6,
    dps: 820,
    id: 265519,
    name: 'Gulam Jilani',
    pnl: 380,
    proof: `5340 ${Emoji.CHECKMARK}`,
    status: ClientStatus.ACTIVE,
    type: NodeType.CLIENT,
    wds: 440,
  },
  {
    LINKS: [5340, 5850, [301868, 'DUPL']],
    bal: 0,
    dps: 436,
    id: 265455,
    name: 'Nasir Husain',
    pnl: 280,
    proof: `5340 ${Emoji.HOURGLASS}`,
    status: ClientStatus.BLOCKED,
    type: NodeType.CLIENT,
    wds: 156,
  },
  {
    bal: 0,
    dps: 0,
    id: 301868,
    name: 'Nasir Husain',
    pnl: 0,
    proof: undefined,
    status: ClientStatus.ACTIVE,
    type: NodeType.CLIENT,
    wds: 0,
  },
  {
    id: 5340,
    type: NodeType.WALLET,
  },
  {
    id: 5850,
    type: NodeType.WALLET,
  },
  {
    id: 7325,
    type: NodeType.WALLET,
  },
];

export const elements: CytoscapeOptions['elements'] = {
  nodes: [],
  edges: [],
};

for (let i = 0; i < graph.length; i++) {
  const item = graph[i];

  // edges

  const links: ItemLink[] = (item.LINKS as ItemLink[]) ?? [];
  item.LINKS = undefined;

  for (const link of links) {
    elements.edges.push(
      new Edge(
        Array.isArray(link)
          ? { source: item.id, target: link[0], label: link[1] }
          : { source: item.id, target: link }
      ).build()
    );
  }

  // nodes

  item.root = i === 0 ? true : undefined;
  elements.nodes.push(getNode(item).build());
}
