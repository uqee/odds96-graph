import { inspect } from './inspect';
import { Node, NodeData } from './Node';

export interface WalletData extends NodeData {}

export class Wallet extends Node {
  public constructor(protected data: WalletData) {
    super(data);
  }

  protected getContent(): string {
    const { data } = this;
    let content: string = '';

    // header
    content += `${Wallet.PAD(`👛${data.ID}`)}`;

    // footer
    const footer: string = inspect(data, Wallet.KEYS);
    if (footer !== '') {
      content += `\n${Wallet.LINE}`;
      content += footer;
    }

    return content;
  }
}
