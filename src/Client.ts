import { NodeDefinition } from 'cytoscape';

import { assertDefined } from './assertDefined';
import { Emoji } from './Emoji';
import { Entity, EntityInput } from './Entity';
import { EntityId } from './EntityId';
import { EntityType } from './EntityType';
import { toDefined } from './toDefined';
import { toNumber } from './toNumber';

export interface ClientInput extends EntityInput {
  id?: Entity['id'];
  redash_fraudControl_allClientsSameAccount?: string;
  redash_fraudControl_allClientsSameDevice?: string;
  retool_userInfo_mainInfo?: string;
  retool_userInfo_statistics?: string;
}

interface ClientLinkDevice {
  clientId: EntityId;
  tags: string[];
  deviceId: EntityId;
}

interface ClientLinkWallet {
  clientId: EntityId;
  tags: string[];
  walletId: EntityId;
}

export class Client extends Entity {
  public constructor(protected input: ClientInput) {
    super();
  }

  public build(): NodeDefinition {
    return {
      data: {
        content: this.content,
        id: this.id,
        status: this.status,
        type: EntityType.CLIENT,
      },
    };
  }

  private get deposits(): number | undefined {
    return toNumber(
      Client.data_PARSE<string>(
        /\s*Deposits USD\s*\$([\d\.]+)\n/,
        this.input.retool_userInfo_statistics
      )
    );
  }

  protected get content(): string {
    let content: string = '';

    // header

    content += `${Client.content_PAD(`🙂${this.id}`)} | ${this.status}`;
    content += `\n${Client.content_LINE}`;

    // body

    const { deposits, ngr, withdrawals } = this;
    content += `\n${Client.content_PAD('$')}`;
    content += ` | ${deposits - withdrawals - ngr}`;
    content += ` (↑${deposits} ↓${withdrawals} ${
      ngr > 0 ? Emoji.CHECKMARK : Emoji.CROSS
    }${ngr})`;

    const { name } = this;
    content += `\n${Client.content_PAD('name')}`;
    content += ` | ${name}`;

    // footer

    if (this.input.text !== undefined) {
      content += `\n${Client.content_LINE}`;
      content += `\n${this.input.text}`;
    }

    //

    return content;
  }

  public get id(): EntityId {
    return (
      this.input.id ??
      toDefined(
        Client.data_PARSE<EntityId>(
          /\s*Client ID\s*(\w+)\n/,
          this.input.retool_userInfo_mainInfo
        )
      )
    );
  }

  public get linkDevices(): ClientLinkDevice[] {
    const lines: string[] =
      this.input.redash_fraudControl_allClientsSameDevice
        ?.split('\n')
        .map((line) => line.trim())
        .filter((line) => line !== '') ?? [];

    const linkDevices: ClientLinkDevice[] = [];
    let linkDevice: ClientLinkDevice | undefined;
    let j: number = 0;

    for (let i = 0; i < lines.length; i++) {
      const line: string = lines[i];

      if (line.match(/^\d{1,7}$/)) j = 0;
      else j++;

      switch (j) {
        case 0:
          if (linkDevice !== undefined) {
            linkDevices.push(linkDevice);
          }
          linkDevice = { clientId: line } as ClientLinkDevice;
          break;
        case 1:
          assertDefined(linkDevice);
          linkDevice.deviceId = line;
          break;
        case 2:
          assertDefined(linkDevice);
          linkDevice.tags = (JSON.parse(line) as string[]).map((tag) =>
            tag.replace('block_suspend_reasons:', '')
          );
          break;
        default:
          throw new Error(`Unknown j = ${j}`);
      }
    }

    if (linkDevice !== undefined) {
      linkDevices.push(linkDevice);
    }

    return linkDevices;
  }

  public get linkWallets(): ClientLinkWallet[] {
    const lines: string[] =
      this.input.redash_fraudControl_allClientsSameAccount
        ?.split('\n')
        .map((line) => line.trim())
        .filter((line) => line !== '') ?? [];

    const linkWallets: ClientLinkWallet[] = [];
    let linkWallet: ClientLinkWallet | undefined;
    let j: number = 0;

    for (let i = 0; i < lines.length; i++) {
      const line: string = lines[i];

      if (line.match(/^\d{1,7}$/)) j = 0;
      else j++;

      switch (j) {
        case 0:
          if (linkWallet !== undefined) {
            linkWallets.push(linkWallet);
          }
          linkWallet = { clientId: line } as ClientLinkWallet;
          break;
        case 1:
          assertDefined(linkWallet);
          linkWallet.walletId = line;
          break;
        case 2:
          assertDefined(linkWallet);
          break;
        case 3:
          assertDefined(linkWallet);
          linkWallet.tags = (JSON.parse(line) as string[]).map((tag) =>
            tag.replace('block_suspend_reasons:', '')
          );
          break;
        default:
          throw new Error(`Unknown j = ${j}`);
      }
    }

    if (linkWallet !== undefined) {
      linkWallets.push(linkWallet);
    }

    return linkWallets;
  }

  private get name(): string {
    return (
      Client.data_PARSE<string>(
        /\s*Firstname\s*(\w+)/,
        this.input.retool_userInfo_mainInfo
      ) +
      ' ' +
      Client.data_PARSE<string>(
        /\s*Lastname\s*(\w+)/,
        this.input.retool_userInfo_mainInfo
      )
    );
  }

  private get ngr(): number | undefined {
    return toNumber(
      Client.data_PARSE<string>(
        /\s*NGR Total USD\s*\$([\d\.]+)\n/,
        this.input.retool_userInfo_statistics
      )
    );
  }

  private get status(): string | undefined {
    return Client.data_PARSE<string>(
      /\s*Status\s*(\w+)\n/,
      this.input.retool_userInfo_mainInfo
    );
  }

  private get withdrawals(): number | undefined {
    return toNumber(
      Client.data_PARSE<string>(
        /\s*Withdrawals USD\s*\$([\d\.]+)\n/,
        this.input.retool_userInfo_statistics
      )
    );
  }
}
