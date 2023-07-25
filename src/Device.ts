import { NodeDefinition } from 'cytoscape';

import { Entity, EntityInput } from './Entity';
import { EntityId } from './EntityId';
import { EntityType } from './EntityType';

export interface DeviceInput extends EntityInput {
  id: Entity['id'];
}

export class Device extends Entity {
  public constructor(protected input: DeviceInput) {
    super();
  }

  public build(): NodeDefinition {
    return {
      data: {
        content: this.content,
        id: this.id,
        type: EntityType.DEVICE,
      },
    };
  }

  protected get content(): string {
    let content: string = '';

    // header
    content += `${Device.content_PAD(`📱${this.id}`)}`;

    // footer
    if (this.input.text !== undefined) {
      content += `\n${Device.content_LINE}`;
      content += this.input.text;
    }

    return content;
  }

  public get id(): EntityId {
    return this.input.id;
  }
}
