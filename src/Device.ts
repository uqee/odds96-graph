import { inspect } from './inspect';
import { Node, NodeData } from './Node';

export interface DeviceData extends NodeData {}

export class Device extends Node {
  public constructor(protected data: DeviceData) {
    super(data);
  }

  protected getContent(): string {
    const { data } = this;
    let content: string = '';

    // header
    content += `${Device.PAD(`👛${data.ID}`)}`;

    // footer
    const footer: string = inspect(data, Device.KEYS);
    if (footer !== '') {
      content += `\n${Device.LINE}`;
      content += footer;
    }

    return content;
  }
}
