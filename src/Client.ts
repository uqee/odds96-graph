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
    const { email, id, login, name, phone, reg, status, tags } = this;
    let { deposits, ngr, withdrawals } = this;
    let content: string = '';

    // header

    content += Client.PAD(id);
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
        body += ` = ↑${deposits} ↓${withdrawals} ${ngr > 0 ? '-' : '+'}${ngr}`;
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

      if (isDefined(reg)) {
        body += `\n${Client.PAD('reg')} | ${reg}`;
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
        /\s*Deposits USD\s*\$([^\s]+)\n/g,
        this.input.retool_userInfo
      )?.[0]?.[1]?.replace(',', '')
    );
  }

  private get email(): string | undefined {
    return Client.MATCH(
      /\s*Contact email\s*([^\s]+)\n/g,
      this.input.retool_userInfo
    )?.[0]?.[1];
  }

  public get id(): EntityId {
    return (
      this.input.id ??
      toDefined(
        Client.MATCH(
          /\s*Client ID\s*([^\s]+)\n/g,
          this.input.retool_userInfo
        )?.[0]?.[1]
      )
    );
  }

  public get links(): ClientLink[] {
    const links: ClientLink[] = [
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
        this.input.redash_fraudControl_phone,
        EntityType.PHONE
      ),

      ...Client.getLinks(
        this.input.redash_fraudControl, //
        EntityType.NODE
      ),
    ];
    return links;
  }

  private get login(): string | undefined {
    return Client.MATCH(
      /\s*Login\s*([^\s]+)\n/g,
      this.input.retool_userInfo
    )?.[0]?.[1];
  }

  private get name(): string | undefined {
    const firstname: string | undefined = Client.MATCH(
      /\s*Firstname\s*([^\s]+)/g,
      this.input.retool_userInfo
    )?.[0]?.[1];

    const lastname: string | undefined = Client.MATCH(
      /\s*Lastname\s*([^\s]+)/g,
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
      Client.MATCH(
        /\s*NGR Total USD\s*\$([^\s]+)\n/g,
        this.input.retool_userInfo
      )?.[0]?.[1]?.replace(',', '')
    );
  }

  private get phone(): string | undefined {
    return Client.MATCH(
      /\s*Contact phone\s*([^\s]+)\n/g,
      this.input.retool_userInfo
    )?.[0]?.[1];
  }

  private get reg(): string | undefined {
    return Client.MATCH(
      /\s*Registration date\(UTC\)\s*([^\s]+)\n/g,
      this.input.retool_userInfo
    )?.[0]?.[1];
  }

  private get status(): string | undefined {
    return Client.MATCH(
      /\s*Status\s*([^\n]+)\s/g,
      this.input.retool_userInfo
    )?.[0]?.[1];
  }

  private get tags(): string[] | undefined {
    const tags: string[] | undefined = Client.MATCH(
      /\s*block_suspend_reasons:([^\s]+)\n/g,
      this.input.retool_userInfo
    )?.map((match) => match[1]);
    return tags?.length !== 0 ? tags : undefined;
  }

  private get withdrawals(): number | undefined {
    return toNumber(
      Client.MATCH(
        /\s*Withdrawals USD\s*\$([^\s]+)\n/g,
        this.input.retool_userInfo
      )?.[0]?.[1]?.replace(',', '')
    );
  }
}
