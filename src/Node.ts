import { NodeDefinition } from 'cytoscape';

import { inspect } from './inspect';
import { NodeId } from './NodeId';
import { NodeType } from './NodeType';

export interface NodeData {
  id: NodeId;
  type: NodeType;

  [key: string]: unknown;
}

export class Node {
  protected static KEYS: (keyof NodeData)[] = ['id', 'type'];
  protected static LINE: string = '-'.repeat(21);
  protected static PAD = (key: number | string): string =>
    key.toString().padEnd(9, ' ');

  public constructor(protected data: NodeData) {}

  public build(): NodeDefinition {
    return {
      data: {
        ...this.data,
        id: this.data.id.toString(),
        content: this.getContent(),
      },
    };
  }

  protected getContent(): string {
    const { data } = this;
    let content: string = '';

    // header
    content += `${Node.PAD(data.id)} | ${data.type}`;

    // footer
    const footer: string = inspect(data, Node.KEYS);
    if (footer !== '') {
      content += `\n${Node.LINE}`;
      content += footer;
    }

    return content;
  }
}
