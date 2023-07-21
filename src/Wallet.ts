import { inspect } from './inspect';
import { Node, NodeData } from './Node';
import { NodeType } from './NodeType';

export interface WalletData extends NodeData {
  type: NodeType.WALLET;
}

export class Wallet extends Node {
  public constructor(protected data: WalletData) {
    super(data);
  }

  protected getContent(): string {
    const { data } = this;
    let content: string = '';

    // header
    content += `${Wallet.PAD(`👛${data.id}`)}`;

    // footer
    const footer: string = inspect(data, Wallet.KEYS);
    if (footer !== '') {
      content += `\n${Wallet.LINE}`;
      content += footer;
    }

    return content;
  }
}
