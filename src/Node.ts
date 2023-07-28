import { NodeDefinition } from 'cytoscape';

import { assertDefined } from './assertDefined';
import { Emoji } from './Emoji';
import { Entity, EntityInput } from './Entity';
import { EntityId } from './EntityId';
import { EntityType } from './EntityType';

export interface NodeInput extends EntityInput {
  id?: Entity['id'];
  type?: EntityType;
}

export class Node extends Entity {
  public constructor(protected input: NodeInput) {
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

    let id: string = this.id;

    switch (this.type) {
      case EntityType.ACCOUNT:
        content += Emoji.WALLET;
        id = Node.shrink(id);
        break;
      case EntityType.DEVICE:
        content += Emoji.DEVICE;
        id = Node.shrink(id);
        break;
      case EntityType.EMAIL:
        content += Emoji.MAIL;
        break;
      case EntityType.NAME:
        content += Emoji.FACE;
        break;
      case EntityType.PHONE:
        content += Emoji.PHONE;
        id = Node.shrink(id);
        break;
      default:
        break;
    }

    content += Node.pad(id);

    // footer

    if (this.input.text !== undefined) {
      content += `\n${Node.line}`;
      content += this.input.text;
    }

    return content;
  }

  public get id(): EntityId {
    assertDefined(this.input.id);
    return this.input.id;
  }

  public get type(): EntityType {
    return this.input.type ?? EntityType.NODE;
  }
}
