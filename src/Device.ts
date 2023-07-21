import { inspect } from './inspect';
import { Node, NodeData } from './Node';
import { NodeType } from './NodeType';

export interface DeviceData extends NodeData {
  type: NodeType.DEVICE;
}

export class Device extends Node {
  public constructor(protected data: DeviceData) {
    super(data);
  }

  protected getContent(): string {
    const { data } = this;
    let content: string = '';

    // header
    content += `${Device.PAD(`👛${data.id}`)}`;

    // footer
    const footer: string = inspect(data, Device.KEYS);
    if (footer !== '') {
      content += `\n${Device.LINE}`;
      content += footer;
    }

    return content;
  }
}
