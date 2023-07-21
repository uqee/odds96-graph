import { EdgeDefinition } from 'cytoscape';

import { NodeId } from './NodeId';

export interface EdgeData {
  label?: string;
  source: NodeId;
  target: NodeId;
}

export class Edge {
  public constructor(private data: EdgeData) {}

  public build(): EdgeDefinition {
    return {
      data: {
        ...this.data,
        content: this.getContent(),
        source: this.data.source.toString(),
        target: this.data.target.toString(),
      },
    };
  }

  private getContent(): string {
    const { data } = this;
    return data.label ?? '';
  }
}
