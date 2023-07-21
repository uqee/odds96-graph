import { NodeDefinition } from 'cytoscape';

import { Id } from './Id';
import { NodeStatus } from './NodeStatus';

type NodeParams = {
  balance?: number;
  comment?: string;
  id: Id;
  status?: NodeStatus;
};

export class Node {
  public static fromRetool(): Node {
    throw new Error();
  }

  private static getContent(params: NodeParams): string {
    let content: string = '';

    // header

    content += `${params.id}`;
    if (params.status !== undefined) content += ` ⋅ ${params.status}`;

    // body

    if (params.balance !== undefined) content += `\n balance ${params.balance}`;
    if (params.comment !== undefined) content += `\n comment ${params.comment}`;

    //

    return content;
  }

  //

  public constructor(private params: NodeParams) {}

  public build(): NodeDefinition {
    return {
      data: {
        id: `${this.params.id}`,
        content: Node.getContent(this.params),
      },
    };
  }
}
