import { EdgeDefinition } from 'cytoscape';

import { Id } from './Id';

type EdgeParams = {
  comment?: string;
  source: Id;
  target: Id;
};

export class Edge {
  public static fromRetool(): Node {
    throw new Error();
  }

  private static getContent(params: EdgeParams): string {
    let content: string = '';

    if (params.comment !== undefined) content += `\n comment ${params.comment}`;

    return content;
  }

  //

  public constructor(private params: EdgeParams) {}

  public build(): EdgeDefinition {
    return {
      data: {
        content: Edge.getContent(this.params),
        source: `${this.params.source}`,
        target: `${this.params.target}`,
      },
    };
  }
}
