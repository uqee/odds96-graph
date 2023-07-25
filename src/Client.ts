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
        root: this.input.root === true ? true : undefined,
        status: this.status,
        type: EntityType.CLIENT,
      },
    };
  }

  protected get content(): string {
    const {
      deposits,
      email,
      id,
      login,
      name,
      ngr,
      phone,
      status,
      withdrawals,
    } = this;
    let content: string = '';

    // header

    content += Client.content_PAD(`🙂${id}`);
    if (isDefined(status)) content += ` | ${status}`;

    // body

    {
      let body: string = '';

      if (isDefined(deposits) || isDefined(ngr) || isDefined(withdrawals)) {
        body += `\n${Client.content_PAD('$')}`;
        body += ` | ${Math.round(
          (deposits ?? 0) - (withdrawals ?? 0) - (ngr ?? 0)
        )}`;
        body += ` (↑${Math.round(deposits ?? 0)}`;
        body += ` ↓${Math.round(withdrawals ?? 0)}`;
        body += ` ${Math.round(ngr ?? 0) > 0 ? '-' : '+'}`;
        body += `${Math.round(ngr ?? 0)})`;
      }

      if (isDefined(email)) {
        body += `\n${Client.content_PAD('email')} | ${email}`;
      }

      if (isDefined(login)) {
        body += `\n${Client.content_PAD('login')} | ${login}`;
      }

      if (isDefined(name)) {
        body += `\n${Client.content_PAD('name')} | ${name}`;
      }

      if (isDefined(phone)) {
        body += `\n${Client.content_PAD('phone')} | ${phone}`;
      }

      if (isDefined(body)) {
        content += `\n${Client.content_LINE}`;
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
        content += `\n${Client.content_LINE}`;
        content += footer;
      }
    }

    //

    return content;
  }

  private get deposits(): number | undefined {
    return toNumber(
      Client.data_PARSE<string>(
        /\s*Deposits USD\s*\$([\d\.]+)\n/,
        this.input.retool_userInfo_statistics
      )
    );
  }

  private get email(): string | undefined {
    return Client.data_PARSE<string>(
      /\s*Contact email\s*(\w+)\n/,
      this.input.retool_userInfo_mainInfo
    );
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
          break;
        case 3:
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

  private get login(): string | undefined {
    return Client.data_PARSE<string>(
      /\s*Login\s*(\w+)\n/,
      this.input.retool_userInfo_mainInfo
    );
  }

  private get name(): string | undefined {
    const firstname: string | undefined = Client.data_PARSE<string>(
      /\s*Firstname\s*(\w+)/,
      this.input.retool_userInfo_mainInfo
    );

    const lastname: string | undefined = Client.data_PARSE<string>(
      /\s*Lastname\s*(\w+)/,
      this.input.retool_userInfo_mainInfo
    );

    if (isDefined(firstname)) {
      return isDefined(lastname) ? `${firstname} ${lastname}` : firstname;
    } else {
      return isDefined(lastname) ? lastname : undefined;
    }
  }

  private get ngr(): number | undefined {
    return toNumber(
      Client.data_PARSE<string>(
        /\s*NGR Total USD\s*\$([\d\.]+)\n/,
        this.input.retool_userInfo_statistics
      )
    );
  }

  private get phone(): string | undefined {
    return Client.data_PARSE<string>(
      /\s*Contact phone\s*(\w+)\n/,
      this.input.retool_userInfo_mainInfo
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
