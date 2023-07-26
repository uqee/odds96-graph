import { CytoscapeOptions } from 'cytoscape';

import { Client, ClientInput } from './Client';
import { Device } from './Device';
import { Entity } from './Entity';
import { EntityId } from './EntityId';
import { Link } from './Link';
import { Wallet } from './Wallet';

export const toElements = (
  clientInputs: ClientInput[]
): CytoscapeOptions['elements'] => {
  const elements: CytoscapeOptions['elements'] = {
    nodes: [],
    edges: [],
  };

  const edges: Map<EntityId, Link> = new Map();
  const nodes: Map<EntityId, Entity> = new Map();

  for (let i = 0; i < clientInputs.length; i++) {
    const clientInput = clientInputs[i];
    if (i === 0) clientInput.root = true;

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

      //

      const link1: Link = new Link({
        source: client.id,
        target: linkDevice.deviceId,
      });

      const link2: Link = new Link({
        source: linkDevice.deviceId,
        target: client.id,
      });

      const link3: Link = new Link({
        source: linkDevice.clientId,
        target: linkDevice.deviceId,
      });

      const link4: Link = new Link({
        source: linkDevice.deviceId,
        target: linkDevice.clientId,
      });

      if (!edges.has(link1.id) && !edges.has(link2.id)) {
        edges.set(link1.id, link1);
      }

      if (!edges.has(link3.id) && !edges.has(link4.id)) {
        edges.set(link3.id, link3);
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

      //

      const link1: Link = new Link({
        source: client.id,
        target: linkWallet.walletId,
      });

      const link2: Link = new Link({
        source: linkWallet.walletId,
        target: client.id,
      });

      const link3: Link = new Link({
        source: linkWallet.clientId,
        target: linkWallet.walletId,
      });

      const link4: Link = new Link({
        source: linkWallet.walletId,
        target: linkWallet.clientId,
      });

      if (!edges.has(link1.id) && !edges.has(link2.id)) {
        edges.set(link1.id, link1);
      }

      if (!edges.has(link3.id) && !edges.has(link4.id)) {
        edges.set(link3.id, link3);
      }
    }
  }

  for (const edge of edges.values()) elements.edges.push(edge.build());
  for (const node of nodes.values()) elements.nodes.push(node.build());

  return elements;
};
