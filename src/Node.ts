import { NodeDefinition } from 'cytoscape';

import { Id } from './Id';
import { inspect } from './inspect';
import { NodeStatus } from './NodeStatus';
// import { NodeType } from './NodeType';

//

type NodeParams = {
  bal?: number;
  comment?: string;
  dps?: number;
  id: Id;
  name?: string;
  pnl?: number;
  root?: boolean;
  status?: NodeStatus;
  // type: NodeType;
  wds?: number;

  [key: string]: unknown;
};

const NodeParams_knownKeys: (keyof NodeParams)[] = [
  'bal',
  'comment',
  'dps',
  'id',
  'name',
  'pnl',
  'root',
  'status',
  // 'type',
  'wds',
];

//

export class Node {
  public static fromRetool(): Node {
    throw new Error();
  }

  private static getContent_lengthHeader: number = 21;
  private static getContent_lengthKey: number = 9;
  private static getContent(params: NodeParams): string {
    let content: string = '';

    // header

    content += `🧑${params.id}`.padEnd(Node.getContent_lengthKey, ' ');
    if (params.status !== undefined) content += ` | ${params.status}`;
    content += `\n${'-'.repeat(Node.getContent_lengthHeader)}`;

    // body
    // known params

    if (params.name !== undefined) {
      content +=
        `\n${'name'.padEnd(Node.getContent_lengthKey, ' ')}` +
        ` | ${params.name}`;
    }

    if (params.pnl !== undefined || params.balance !== undefined) {
      content +=
        `\n${'pnl/bal'.padEnd(Node.getContent_lengthKey, ' ')}` +
        ` | ${params.pnl}/${params.bal}`;
    }

    if (params.dps !== undefined || params.wds !== undefined) {
      content +=
        `\n${'dps/wds'.padEnd(Node.getContent_lengthKey, ' ')}` +
        ` | ${params.dps}/${params.wds}`;
    }

    // footer
    // unknown params

    const footer: string = inspect(params, NodeParams_knownKeys);

    if (footer !== '') {
      content += `\n${'-'.repeat(Node.getContent_lengthHeader)}`;
      content += footer;
    }

    //

    return content;
  }

  public constructor(private params: NodeParams) {}

  public build(): NodeDefinition {
    return {
      data: {
        ...this.params,
        id: `${this.params.id}`,
        content: Node.getContent(this.params),
        root: this.params.root,
      },
    };
  }
}
