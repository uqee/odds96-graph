import { EdgeDefinition } from 'cytoscape';

import { Id } from './Id';
import { inspect } from './inspect';

type EdgeParams = {
  comment?: string;
  source: Id;
  target: Id;

  [key: string]: unknown;
};

export class Edge {
  public static fromRetool(): Node {
    throw new Error();
  }

  private static getContent(params: EdgeParams): string {
    let content: string = '';
    content += inspect(params, ['source', 'target']);
    return content;
  }

  public constructor(private params: EdgeParams) {}

  public build(): EdgeDefinition {
    return {
      data: {
        ...this.params,
        content: Edge.getContent(this.params),
        source: `${this.params.source}`,
        target: `${this.params.target}`,
      },
    };
  }
}
