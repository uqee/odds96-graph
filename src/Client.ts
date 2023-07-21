import { ClientStatus } from './ClientStatus';
import { inspect } from './inspect';
import { Node, NodeData } from './Node';

export interface ClientData extends NodeData {
  bal?: number;
  dps?: number;
  name?: string;
  pnl?: number;
  status?: ClientStatus;
  wds?: number;
}

export class Client extends Node {
  protected static KEYS: (keyof ClientData)[] = [
    ...super.KEYS,
    'bal',
    'dps',
    'name',
    'pnl',
    'status',
    'wds',
  ];

  public constructor(protected data: ClientData) {
    super(data);
  }

  protected getContent(): string {
    const { data } = this;
    let content: string = '';

    // header

    content += `${Client.PAD(`🙂${data.ID}`)} | ${
      data.status ?? ClientStatus.ACTIVE
    }`;
    content += `\n${Client.LINE}`;

    // body
    // known data

    if (data.name !== undefined) {
      content += `\n${Client.PAD('name')} | ${data.name}`;
    }

    if (data.pnl !== undefined || data.balance !== undefined) {
      content += `\n${Client.PAD('pnl/bal')} | ${data.pnl}/${data.bal}`;
    }

    if (data.dps !== undefined || data.wds !== undefined) {
      content += `\n${Client.PAD('dps/wds')} | ${data.dps}/${data.wds}`;
    }

    // footer
    // unknown data

    const footer: string = inspect(data, Client.KEYS);

    if (footer !== '') {
      content += `\n${Client.LINE}`;
      content += footer;
    }

    //

    return content;
  }
}
