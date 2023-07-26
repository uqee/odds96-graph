import { NodeDefinition } from 'cytoscape';
import { Emoji } from './Emoji';

import { Entity, EntityInput } from './Entity';
import { EntityId } from './EntityId';
import { EntityType } from './EntityType';

export interface UnknownInput extends EntityInput {
  id: Entity['id'];
  type?: EntityType;
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
        type: this.type,
      },
    };
  }

  protected get content(): string {
    let content: string = '';

    // header

    switch (this.type) {
      case EntityType.DEVICE:
        content += Emoji.DEVICE;
        break;
      case EntityType.WALLET:
        content += Emoji.WALLET;
        break;
      default:
        break;
    }

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

  public get type(): EntityType {
    return this.input.type ?? EntityType.UNKNOWN;
  }
}
