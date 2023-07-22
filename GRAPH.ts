import { ClientStatus, Emoji, NodeData, NodeType } from './src';

export const GRAPH: NodeData[] = [
  {
    ID: 267376,
    LINKS: [[5850, Emoji.CROSS], 7325],
    TYPE: NodeType.CLIENT,
    //
    bal: 110,
    dps: 370,
    name: 'Gulam Abdul Kadir',
    pnl: 45,
    status: ClientStatus.ACTIVE,
    wds: 325,
  },
  {
    ID: 127448,
    LINKS: [[5340, Emoji.CROSS], 5850, 7325],
    TYPE: NodeType.CLIENT,
    //
    bal: 260,
    dps: 10500,
    name: 'Gulam Ashraf',
    pnl: 2800,
    status: ClientStatus.ACTIVE,
    wds: 7700,
  },
  {
    ID: 265519,
    LINKS: [[5340, Emoji.CHECKMARK], 5850, 7325],
    TYPE: NodeType.CLIENT,
    //
    bal: 6,
    dps: 820,
    name: 'Gulam Jilani',
    pnl: 380,
    status: ClientStatus.ACTIVE,
    wds: 440,
  },
  {
    ID: 265455,
    LINKS: [[5340, Emoji.HOURGLASS], 5850, [301868, 'DUPL']],
    TYPE: NodeType.CLIENT,
    //
    bal: 0,
    dps: 436,
    name: 'Nasir Husain',
    pnl: 280,
    status: ClientStatus.BLOCKED,
    wds: 156,
  },
  {
    ID: 301868,
    TYPE: NodeType.CLIENT,
    //
    bal: 0,
    dps: 0,
    name: 'Nasir Husain',
    pnl: 0,
    proof: undefined,
    status: ClientStatus.ACTIVE,
    wds: 0,
  },
  {
    ID: 5340,
    TYPE: NodeType.WALLET,
  },
  {
    ID: 5850,
    TYPE: NodeType.WALLET,
  },
  {
    ID: 7325,
    TYPE: NodeType.WALLET,
  },
];
