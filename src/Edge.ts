import { EdgeDefinition } from 'cytoscape';

import { Entity, EntityInput } from './Entity';
import { EntityId } from './EntityId';
import { EntityType } from './EntityType';

export interface EdgeInput extends EntityInput {
  source: EntityId;
  target: EntityId;
}

export class Edge extends Entity {
  public constructor(protected input: EdgeInput) {
    super();
  }

  public build(): EdgeDefinition {
    return {
      data: {
        content: this.content,
        id: this.id,
        source: this.input.source,
        target: this.input.target,
        type: EntityType.EDGE,
      },
    };
  }

  protected get content(): string {
    return this.input.text ?? '';
  }

  public get id(): EntityId {
    return `${this.input.source}-${this.input.target}`;
  }
}
