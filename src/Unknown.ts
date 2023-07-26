import { NodeDefinition } from 'cytoscape';

import { Entity, EntityInput } from './Entity';
import { EntityId } from './EntityId';
import { EntityType } from './EntityType';

export interface UnknownInput extends EntityInput {
  id: Entity['id'];
}

export class Unknown extends Entity {
  public constructor(protected input: UnknownInput) {
    super();
  }

  public build(): NodeDefinition {
    return {
      data: {
        content: this.content,
        id: this.id,
        type: EntityType.UNKNOWN,
      },
    };
  }

  protected get content(): string {
    let content: string = '';

    // header
    content += Unknown.PAD(this.id);

    // footer
    if (this.input.text !== undefined) {
      content += `\n${Unknown.LINE}`;
      content += this.input.text;
    }

    return content;
  }

  public get id(): EntityId {
    return this.input.id;
  }
}
