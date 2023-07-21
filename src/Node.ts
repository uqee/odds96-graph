import { NodeDefinition } from 'cytoscape';

import { Id } from './Id';
import { inspect } from './inspect';
import { NodeStatus } from './NodeStatus';
// import { NodeType } from './NodeType';

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

export class Node {
  public static fromRetool(): Node {
    throw new Error();
  }

  private static getContent(params: NodeParams): string {
    let content: string = '';

    // header

    content += `${params.id}`.padEnd(7, ' ');
    if (params.status !== undefined) content += ` | ${params.status}`;
    content += '\n' + '-'.repeat(18);

    // body
    // known params

    if (params.name !== undefined) {
      content += `\n${'name'.padEnd(7, ' ')} | ${params.name}`;
    }

    if (params.pnl !== undefined || params.balance !== undefined) {
      content += `\n${'pnl/bal'.padEnd(7, ' ')} | ${params.pnl}/${params.bal}`;
    }

    if (params.dps !== undefined || params.wds !== undefined) {
      content += `\n${'dps/wds'.padEnd(7, ' ')} | ${params.dps}/${params.wds}`;
    }

    // footer
    // unknown params

    const footer: string = inspect(params, [
      'bal',
      'dps',
      'id',
      'name',
      'pnl',
      'root',
      'status',
      'type',
      'wds',
    ]);

    if (footer !== '') {
      content += '\n' + '-'.repeat(18);
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
