import { NodeDefinition } from 'cytoscape';

import { EntityId } from './EntityId';

export interface EntityInput {
  root?: boolean;
  text?: string;
}

export abstract class Entity {
  protected static readonly LINE: string = '-'.repeat(32);

  protected static MATCH = (
    regExp: RegExp,
    text: string | undefined
  ): RegExpMatchArray[] | undefined => {
    return text !== undefined ? Array.from(text.matchAll(regExp)) : undefined;
  };

  protected static readonly PAD = (key: string): string =>
    key.toString().padEnd(7, ' ');

  //

  public abstract build(): NodeDefinition;
  protected abstract readonly content: string | undefined;
  public abstract readonly id: EntityId;
  protected abstract readonly input: EntityInput;
}
