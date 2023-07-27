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
  redash_fraudControl?: string;
  retool_userInfo?: string;
}

interface ClientLink {
  clientId: EntityId;
  parameter?: string;
  section?: string;
  tags?: string;
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
        root: this.input.root,
        status: this.status,
        type: EntityType.CLIENT,
      },
    };
  }

  protected get content(): string {
    const { email, id, login, name, phone, regdate, status, tags } = this;
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

      if (isDefined(regdate)) {
        body += `\n${Client.PAD('regdate')} | ${regdate}`;
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
        /\s*Deposits USD\s*\$([^\n]+)\n/g,
        this.input.retool_userInfo
      )?.[0]?.[1]?.replace(',', '')
    );
  }

  private get email(): string | undefined {
    return Client.MATCH(
      /\s*Contact email\s*([^\n]+)\n/g,
      this.input.retool_userInfo
    )?.[0]?.[1];
  }

  public get id(): EntityId {
    return (
      this.input.id ??
      toDefined(
        Client.MATCH(
          /\s*Client ID\s*([^\n]+)\n/g,
          this.input.retool_userInfo
        )?.[0]?.[1]
      )
    );
  }

  public get links(): ClientLink[] {
    const links: ClientLink[] = [];

    const lines: string[] =
      this.input.redash_fraudControl
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
          link = { clientId: line };
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

  private get login(): string | undefined {
    return Client.MATCH(
      /\s*Login\s*([^\n]+)\n/g,
      this.input.retool_userInfo
    )?.[0]?.[1];
  }

  private get name(): string | undefined {
    const firstname: string | undefined = Client.MATCH(
      /\s*Firstname\s*([^\n]+)/g,
      this.input.retool_userInfo
    )?.[0]?.[1];

    const lastname: string | undefined = Client.MATCH(
      /\s*Lastname\s*([^\n]+)/g,
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
        /\s*NGR Total USD\s*\$([^\n]+)\n/g,
        this.input.retool_userInfo
      )?.[0]?.[1]?.replace(',', '')
    );
  }

  private get phone(): string | undefined {
    return Client.MATCH(
      /\s*Contact phone\s*([^\n]+)\n/g,
      this.input.retool_userInfo
    )?.[0]?.[1];
  }

  private get regdate(): string | undefined {
    return Client.MATCH(
      /\s*Registration date\(UTC\)\s*([^\n]+)\n/g,
      this.input.retool_userInfo
    )?.[0]?.[1];
  }

  private get status(): string | undefined {
    return Client.MATCH(
      /\s*Status\s*([^\n]+)\n/g,
      this.input.retool_userInfo
    )?.[0]?.[1];
  }

  private get tags(): string[] | undefined {
    const tags: string[] | undefined = Client.MATCH(
      /\s*block_suspend_reasons:([^\n]+)\n/g,
      this.input.retool_userInfo
    )?.map((match) => match[1]);
    return tags?.length !== 0 ? tags : undefined;
  }

  private get withdrawals(): number | undefined {
    return toNumber(
      Client.MATCH(
        /\s*Withdrawals USD\s*\$([^\n]+)\n/g,
        this.input.retool_userInfo
      )?.[0]?.[1]?.replace(',', '')
    );
  }
}
