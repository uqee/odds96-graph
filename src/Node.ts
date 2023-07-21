import { NodeDefinition } from 'cytoscape';

import { inspect } from './inspect';
import { NodeId } from './NodeId';
import { NodeType } from './NodeType';

type NodeLink =
  | NodeId //
  | [NodeId, string];

export interface NodeData {
  ID: NodeId;
  LINKS?: NodeLink[];
  ROOT?: boolean;
  TYPE: NodeType;

  [key: string]: unknown;
}

export class Node {
  protected static KEYS: (keyof NodeData)[] = ['ID', 'LINKS', 'ROOT', 'TYPE'];
  protected static LINE: string = '-'.repeat(21);
  protected static PAD = (key: number | string): string =>
    key.toString().padEnd(9, ' ');

  public constructor(protected data: NodeData) {}

  public build(): NodeDefinition {
    return {
      data: {
        ...this.data,
        id: this.data.ID.toString(),
        content: this.getContent(),
      },
    };
  }

  protected getContent(): string {
    const { data } = this;
    let content: string = '';

    // header
    content += `${Node.PAD(data.ID)} | ${data.TYPE}`;

    // footer
    const footer: string = inspect(data, Node.KEYS);
    if (footer !== '') {
      content += `\n${Node.LINE}`;
      content += footer;
    }

    return content;
  }
}
