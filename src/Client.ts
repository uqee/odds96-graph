import { NodeDefinition } from 'cytoscape';

import { assertDefined } from './assertDefined';
import { Entity, EntityInput } from './Entity';
import { EntityId } from './EntityId';
import { EntityType } from './EntityType';
import { isDefined } from './isDefined';
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
  deviceId: EntityId;
}

interface ClientLinkWallet {
  clientId: EntityId;
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
        root: this.input.root === true ? true : undefined,
        status: this.status,
        type: EntityType.CLIENT,
      },
    };
  }

  protected get content(): string {
    const { email, id, login, name, phone, status, tags } = this;
    let { deposits, ngr, withdrawals } = this;
    let content: string = '';

    // header

    content += Client.PAD(`🙂${id}`);
    if (isDefined(status)) content += ` | ${status}`;

    // body

    {
      let body: string = '';

      if (isDefined(deposits) || isDefined(ngr) || isDefined(withdrawals)) {
        deposits = Math.round(deposits ?? 0);
        ngr = Math.round(ngr ?? 0);
        withdrawals = Math.round(withdrawals ?? 0);

        body += `\n${Client.PAD('$')}`;
        body += ` | ${deposits - withdrawals - ngr}`;
        body += ` (↑${deposits} ↓${withdrawals} ${ngr > 0 ? '-' : '+'}${ngr})`;
      }

      if (isDefined(email)) {
        body += `\n${Client.PAD('email')} | ${email}`;
      }

      if (isDefined(login)) {
        body += `\n${Client.PAD('login')} | ${login}`;
      }

      if (isDefined(name)) {
        body += `\n${Client.PAD('name')} | ${name}`;
      }

      if (isDefined(phone)) {
        body += `\n${Client.PAD('phone')} | ${phone}`;
      }

      if (tags !== undefined) {
        for (const tag of tags) {
          body += `\n${Client.PAD('tag')} | ${tag}`;
        }
      }

      if (isDefined(body)) {
        content += `\n${Client.LINE}`;
        content += body;
      }
    }

    // footer

    {
      let footer: string = '';

      if (isDefined(this.input.text)) {
        footer += this.input.text;
      }

      if (isDefined(footer)) {
        content += `\n${Client.LINE}`;
        content += footer;
      }
    }

    //

    return content;
  }

  private get deposits(): number | undefined {
    return toNumber(
      Client.MATCH(
        /\s*Deposits USD\s*\$([\d\.]+)\n/g,
        this.input.retool_userInfo_statistics
      )?.[0]?.[1]
    );
  }

  private get email(): string | undefined {
    return Client.MATCH(
      /\s*Contact email\s*(\w+)\n/g,
      this.input.retool_userInfo_mainInfo
    )?.[0]?.[1];
  }

  public get id(): EntityId {
    return (
      this.input.id ??
      toDefined(
        Client.MATCH(
          /\s*Client ID\s*(\w+)\n/g,
          this.input.retool_userInfo_mainInfo
        )?.[0]?.[1]
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
          break;
        case 3:
          assertDefined(linkDevice);
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

  private get login(): string | undefined {
    return Client.MATCH(
      /\s*Login\s*(\w+)\n/g,
      this.input.retool_userInfo_mainInfo
    )?.[0]?.[1];
  }

  private get name(): string | undefined {
    const firstname: string | undefined = Client.MATCH(
      /\s*Firstname\s*(\w+)/g,
      this.input.retool_userInfo_mainInfo
    )?.[0]?.[1];

    const lastname: string | undefined = Client.MATCH(
      /\s*Lastname\s*(\w+)/g,
      this.input.retool_userInfo_mainInfo
    )?.[0]?.[1];

    if (isDefined(firstname)) {
      return isDefined(lastname) ? `${firstname} ${lastname}` : firstname;
    } else {
      return isDefined(lastname) ? lastname : undefined;
    }
  }

  private get ngr(): number | undefined {
    return toNumber(
      Client.MATCH(
        /\s*NGR Total USD\s*\$([\d\.]+)\n/g,
        this.input.retool_userInfo_statistics
      )?.[0]?.[1]
    );
  }

  private get phone(): string | undefined {
    return Client.MATCH(
      /\s*Contact phone\s*(\w+)\n/g,
      this.input.retool_userInfo_mainInfo
    )?.[0]?.[1];
  }

  private get status(): string | undefined {
    return Client.MATCH(
      /\s*Status\s*(\w+)\n/g,
      this.input.retool_userInfo_mainInfo
    )?.[0]?.[1];
  }

  private get tags(): string[] | undefined {
    const tags: string[] | undefined = Client.MATCH(
      /\s*block_suspend_reasons:([^\n]+)\n/g,
      this.input.retool_userInfo_statistics
    )?.map((match) => match[1]);
    return tags?.length !== 0 ? tags : undefined;
  }

  private get withdrawals(): number | undefined {
    return toNumber(
      Client.MATCH(
        /\s*Withdrawals USD\s*\$([\d\.]+)\n/g,
        this.input.retool_userInfo_statistics
      )?.[0]?.[1]
    );
  }
}
