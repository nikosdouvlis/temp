import { Channel } from './channel';
import type { ChannelOptions, ChannelMap, EventMap, QueryMap } from './channel';

export interface EventBusOptions extends ChannelOptions {}

export class EventBus<
  CM extends ChannelMap,
  EM extends EventMap = EventMap,
  RM extends QueryMap = QueryMap,
> extends Channel<'eventBus', EM, RM> {
  readonly #channels = {} as CM;
  readonly #options: EventBusOptions = {};

  constructor(options: EventBusOptions = {}) {
    super('eventBus', options);
    this.#options = options;
  }

  channel<C extends keyof CM & string>(name: C): CM[C] {
    this.#channels[name] = this.#channels[name] || new Channel(name, this.#options);
    return this.#channels[name] as CM[C];
  }

  registerChannel<C extends Channel<any, any>>() {
    return this as unknown as EventBus<CM & ChannelMap<C>, EM, RM>;
  }

  registerEvents<E extends EventMap>() {
    return this as unknown as EventBus<CM, EM & E, RM>;
  }

  registerQueries<R extends QueryMap>() {
    return this as unknown as EventBus<CM, EM, RM & R>;
  }
}
