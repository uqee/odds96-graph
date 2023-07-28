import { NodeDefinition } from 'cytoscape';

import { Emoji } from './Emoji';
import { EntityId } from './EntityId';

export interface EntityInput {
  root?: boolean;
  text?: string;
}

export abstract class Entity {
  protected static readonly line: string = '-'.repeat(32);

  protected static match = (
    regExp: RegExp,
    text: string | undefined
  ): RegExpMatchArray[] | undefined => {
    return text !== undefined ? Array.from(text.matchAll(regExp)) : undefined;
  };

  protected static readonly pad = (line: string): string => {
    return line.padEnd(7, ' ');
  };

  protected static readonly shrink = (line: string): string => {
    return line.length > 16
      ? line.substring(0, 4) + Emoji.ELLIPSIS + line.substring(line.length - 4)
      : line;
  };

  //

  public abstract build(): NodeDefinition;
  protected abstract readonly content: string | undefined;
  public abstract readonly id: EntityId;
  protected abstract readonly input: EntityInput;
}
