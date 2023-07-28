import { CytoscapeOptions } from 'cytoscape';

import { Client, ClientInput } from './Client';
import { Edge } from './Edge';
import { EntityId } from './EntityId';
import { Node } from './Node';

export const toElements = (
  clientInputs: ClientInput[]
): CytoscapeOptions['elements'] => {
  const elements: CytoscapeOptions['elements'] = {
    nodes: [],
    edges: [],
  };

  const edges: Map<EntityId, Edge> = new Map();
  const nodes: Map<EntityId, Node> = new Map();

  for (let i = 0; i < clientInputs.length; i++) {
    const clientInput = clientInputs[i];
    if (i === 0) clientInput.root = true;

    const client: Client = new Client(clientInput);
    nodes.set(client.id, client);

    for (const link of client.links) {
      //

      if (!nodes.has(link.clientId)) {
        nodes.set(link.clientId, new Client({ id: link.clientId }));
      }

      //

      if (link.parameter === undefined) continue;

      if (!nodes.has(link.parameter)) {
        nodes.set(
          link.parameter,
          new Node({ id: link.parameter, type: link.type })
        );
      }

      //

      const edge1: Edge = new Edge({
        source: client.id,
        target: link.parameter,
      });

      const edge2: Edge = new Edge({
        source: link.parameter,
        target: client.id,
      });

      const edge3: Edge = new Edge({
        source: link.clientId,
        target: link.parameter,
      });

      const edge4: Edge = new Edge({
        source: link.parameter,
        target: link.clientId,
      });

      if (!edges.has(edge1.id) && !edges.has(edge2.id)) {
        edges.set(edge1.id, edge1);
      }

      if (!edges.has(edge3.id) && !edges.has(edge4.id)) {
        edges.set(edge3.id, edge3);
      }
    }
  }

  for (const edge of edges.values()) elements.edges.push(edge.build());
  for (const node of nodes.values()) elements.nodes.push(node.build());

  return elements;
};
