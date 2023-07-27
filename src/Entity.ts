import { NodeDefinition } from 'cytoscape';

import { EntityId } from './EntityId';

export interface EntityInput {
  root?: boolean;
  text?: string;
}

export abstract class Entity {
  private static LENGTH_MAX: number = 32;
  private static LENGTH_MIN: number = 7;

  protected static readonly LINE: string = '-'.repeat(Entity.LENGTH_MAX);

  protected static MATCH = (
    regExp: RegExp,
    text: string | undefined
  ): RegExpMatchArray[] | undefined => {
    return text !== undefined ? Array.from(text.matchAll(regExp)) : undefined;
  };

  protected static readonly PAD = (line: string): string => {
    if (line.length < Entity.LENGTH_MIN) {
      line = line.padEnd(Entity.LENGTH_MIN, ' ');
    }

    if (line.length > Entity.LENGTH_MAX) {
      line =
        line.substring(0, Entity.LENGTH_MIN) +
        '...' +
        line.substring(line.length - Entity.LENGTH_MIN);
    }

    return line;
  };

  //

  public abstract build(): NodeDefinition;
  protected abstract readonly content: string | undefined;
  public abstract readonly id: EntityId;
  protected abstract readonly input: EntityInput;
}
