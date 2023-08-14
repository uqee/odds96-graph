import { NodeDefinition } from 'cytoscape';

import { assertDefined } from './assertDefined';
import { EntityId } from './EntityId';
import { EntityType } from './EntityType';
import { isDefined } from './isDefined';
import { Node, NodeInput } from './Node';
import { toDefined } from './toDefined';
import { toNumber } from './toNumber';

export interface ClientInput extends NodeInput {
  redash_fraudControl?: string;
  redash_fraudControl_account?: string;
  redash_fraudControl_device?: string;
  redash_fraudControl_email?: string;
  redash_fraudControl_name?: string;
  redash_fraudControl_password?: string;
  redash_fraudControl_phone?: string;
  retool_userInfo?: string;
}

interface ClientLink {
  clientId: EntityId;
  parameter?: string;
  section?: string;
  tags?: string;
  type?: EntityType;
}

export class Client extends Node {
  private static getLinks(
    text: string | undefined,
    type: EntityType
  ): ClientLink[] {
    const links: ClientLink[] = [];

    const lines: string[] =
      text
        ?.split('\n')
        .map((line) => line.trim())
        .filter((line) => line !== '') ?? [];

    let icell: number = 0;
    let link: ClientLink | undefined;

    for (let irow = 0; irow < lines.length; irow++) {
      const line: string = lines[irow];

      if (line.match(/^\d{1,7}$/)) icell = 0;
      else icell++;

      switch (icell) {
        case 0:
          if (link !== undefined) links.push(link);
          link = { clientId: line, type };
          break;
        case 1:
          assertDefined(link);
          link.parameter = line;
          break;
        case 2:
          assertDefined(link);
          link.section = line;
          break;
        case 3:
          assertDefined(link);
          link.tags = line;
          break;
        default:
          throw new Error(`Unknown icell = ${icell}`);
      }
    }

    if (link !== undefined) links.push(link);

    return links;
  }

  public constructor(protected input: ClientInput) {
    super(input);
  }

  private get balance(): number | undefined {
    return toNumber(
      Client.match(
        /\s*Balance USD\t(-?\$[^\s]+)/g,
        this.input.retool_userInfo
      )?.[0]?.[1]
    );
  }

  public build(): NodeDefinition {
    return {
      data: {
        content: this.content,
        id: this.id,
        root: this.input.root,
        status: this.status,
        type: EntityType.CLIENT,
      },
    };
  }

  protected get content(): string {
    const { email, id, login, name, phone, reg, status, tags, text, verif } =
      this;
    let { balance, deposits, ngr, withdrawals } = this;
    let content: string = '';

    // header

    content += Client.pad(id);
    if (isDefined(status)) content += ` | ${status}`;

    // body

    {
      let body: string = '';

      if (
        isDefined(balance) ||
        isDefined(deposits) ||
        isDefined(ngr) ||
        isDefined(withdrawals)
      ) {
        balance = balance ?? 0;
        deposits = Math.round(deposits ?? 0);
        ngr = Math.round(ngr ?? 0);
        withdrawals = Math.round(withdrawals ?? 0);

        body += `\n${Client.pad('$')}`;
        body += ` | ${balance}`;
        body += ` = ↑${deposits} ↓${withdrawals} ${
          ngr > 0 ? `-${ngr}` : `+${-ngr}`
        }`;
      }

      if (isDefined(email)) {
        body += `\n${Client.pad('email')} | ${email}`;
      }

      if (isDefined(login)) {
        body += `\n${Client.pad('login')} | ${login}`;
      }

      if (isDefined(name)) {
        body += `\n${Client.pad('name')} | ${name}`;
      }

      if (isDefined(phone)) {
        body += `\n${Client.pad('phone')} | ${phone}`;
      }

      if (isDefined(reg)) {
        body += `\n${Client.pad('reg')} | ${reg}`;
      }

      if (tags !== undefined) {
        for (const tag of tags) {
          body += `\n${Client.pad('tag')} | ${tag}`;
        }
      }

      if (isDefined(verif)) {
        body += `\n${Client.pad('verif')} | ${verif}`;
      }

      if (isDefined(body)) {
        content += `\n${Client.line}`;
        content += body;
      }
    }

    // footer

    {
      let footer: string = '';

      if (isDefined(text)) {
        footer += text;
      }

      if (isDefined(footer)) {
        content += `\n${Client.line}`;
        content += footer;
      }
    }

    //

    return content;
  }

  private get deposits(): number | undefined {
    return toNumber(
      Client.match(
        /\s*Deposits USD\t(-?\$[^\s]+)/g,
        this.input.retool_userInfo
      )?.[0]?.[1]
    );
  }

  private get email(): string | undefined {
    return Client.match(
      /\s*Contact email\t([^\s]+)/g,
      this.input.retool_userInfo
    )?.[0]?.[1];
  }

  public get id(): EntityId {
    return (
      this.input.id ??
      toDefined(
        Client.match(
          /\s*Client ID\t([^\s]+)/g,
          this.input.retool_userInfo
        )?.[0]?.[1]
      )
    );
  }

  public get links(): ClientLink[] {
    return [
      ...Client.getLinks(
        this.input.redash_fraudControl, //
        EntityType.NODE
      ),

      ...Client.getLinks(
        this.input.redash_fraudControl_account,
        EntityType.ACCOUNT
      ),
      ...Client.getLinks(
        this.input.redash_fraudControl_device,
        EntityType.DEVICE
      ),
      ...Client.getLinks(
        this.input.redash_fraudControl_email,
        EntityType.EMAIL
      ),
      ...Client.getLinks(
        this.input.redash_fraudControl_name, //
        EntityType.NAME
      ),
      ...Client.getLinks(
        this.input.redash_fraudControl_password,
        EntityType.PASSWORD
      ),
      ...Client.getLinks(
        this.input.redash_fraudControl_phone,
        EntityType.PHONE
      ),
    ];
  }

  private get login(): string | undefined {
    return Client.match(
      /\s*Login\t([^\s]+)/g,
      this.input.retool_userInfo
    )?.[0]?.[1];
  }

  private get name(): string | undefined {
    const firstname: string | undefined = Client.match(
      /\s*Firstname\t([^\s]+)/g,
      this.input.retool_userInfo
    )?.[0]?.[1];

    const lastname: string | undefined = Client.match(
      /\s*Lastname\t([^\s]+)/g,
      this.input.retool_userInfo
    )?.[0]?.[1];

    if (isDefined(firstname)) {
      return isDefined(lastname) ? `${firstname} ${lastname}` : firstname;
    } else {
      return isDefined(lastname) ? lastname : undefined;
    }
  }

  private get ngr(): number | undefined {
    return toNumber(
      Client.match(
        /\s*NGR Total USD\t(-?\$[^\s]+)/g,
        this.input.retool_userInfo
      )?.[0]?.[1]
    );
  }

  private get phone(): string | undefined {
    return Client.match(
      /\s*Contact phone\t([^\s]+)/g,
      this.input.retool_userInfo
    )?.[0]?.[1];
  }

  private get reg(): string | undefined {
    return Client.match(
      /\s*Registration date\(UTC\)\t([^\s]{5} [^\s]{8})/g,
      this.input.retool_userInfo
    )?.[0]?.[1];
  }

  private get status(): string | undefined {
    return Client.match(
      /\s*Status\t([^\s]+)/g,
      this.input.retool_userInfo
    )?.[0]?.[1];
  }

  private get tags(): string[] | undefined {
    const tags: string[] | undefined = Client.match(
      /\s*block_suspend_reasons:([^\s]+)/g,
      this.input.retool_userInfo
    )?.map((match) => match[1]);
    return tags?.length !== 0 ? tags : undefined;
  }

  private get text(): string | undefined {
    return this.input.text?.trim();
  }

  private get verif(): string | undefined {
    return Client.match(
      /\s*Verification status\t([^\s]+)/g,
      this.input.retool_userInfo
    )?.[0]?.[1];
  }

  private get withdrawals(): number | undefined {
    return toNumber(
      Client.match(
        /\s*Withdrawals USD\t(-?\$[^\s]+)/g,
        this.input.retool_userInfo
      )?.[0]?.[1]
    );
  }
}
