import { Client, ClientData } from './Client';
import { Device, DeviceData } from './Device';
import { Node, NodeData } from './Node';
import { NodeType } from './NodeType';
import { Wallet, WalletData } from './Wallet';

export const getNode = (nodeData: NodeData): Node => {
  switch (nodeData.TYPE) {
    case NodeType.CLIENT:
      return new Client(nodeData as ClientData);
    case NodeType.DEVICE:
      return new Device(nodeData as DeviceData);
    case NodeType.WALLET:
      return new Wallet(nodeData as WalletData);
    default:
      return new Node(nodeData);
  }
};
