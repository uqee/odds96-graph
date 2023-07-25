import { NodeDefinition } from 'cytoscape';

import { EntityId } from './EntityId';

export interface EntityInput {
  root?: boolean;
  text?: string;
}

export abstract class Entity {
  protected static readonly content_LINE: string = '-'.repeat(32);
  protected static readonly content_PAD = (key: string): string =>
    key.toString().padEnd(8, ' ');

  protected static data_PARSE = <T extends string>(
    regExp: RegExp,
    text: string | undefined
  ): T | undefined => {
    return (text?.match(regExp) ?? undefined)?.[1] as T | undefined;
  };

  //

  public abstract build(): NodeDefinition;
  protected abstract readonly content: string | undefined;
  public abstract readonly id: EntityId;
  protected abstract readonly input: EntityInput;
}
