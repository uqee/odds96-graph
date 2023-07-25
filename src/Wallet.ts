import { NodeDefinition } from 'cytoscape';

import { Entity, EntityInput } from './Entity';
import { EntityId } from './EntityId';
import { EntityType } from './EntityType';

export interface WalletInput extends EntityInput {
  id: Entity['id'];
}

export class Wallet extends Entity {
  public constructor(protected input: WalletInput) {
    super();
  }

  public build(): NodeDefinition {
    return {
      data: {
        content: this.content,
        id: this.id,
        type: EntityType.WALLET,
      },
    };
  }

  protected get content(): string {
    let content: string = '';

    // header
    content += `${Wallet.content_PAD(`👛${this.id}`)}`;

    // footer
    if (this.input.text !== undefined) {
      content += `\n${Wallet.content_LINE}`;
      content += this.input.text;
    }

    return content;
  }

  public get id(): EntityId {
    return this.input.id;
  }
}
