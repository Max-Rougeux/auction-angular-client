import { computed, signal, WritableSignal } from '@angular/core';
import { usePresenceList } from '@scripttype/ng-motion';

export class NgmPresence<T extends { id?: number }> {
  private readonly _source: WritableSignal<T[]>;
  private readonly _removingIds = signal(new Set<number>());
  private readonly _limit: WritableSignal<number>;
  readonly exitDuration: number;

  readonly visibleItems = computed(() =>
    this._source().slice(0, this._limit())
  );

  readonly presence: ReturnType<typeof usePresenceList>;

  constructor(
    source: WritableSignal<T[]>,
    limit: WritableSignal<number> = signal(3),
    exitDuration = 200
  ) {
    this._source = source;
    this._limit = limit;
    this.exitDuration = exitDuration;

    this.presence = usePresenceList(this.visibleItems, {
      getId: (item) => item.id!,
      exitingIds: this._removingIds,
    });
  }

  public setLimit(limit: number): void {
    this._limit.set(limit);
  }

  public add(item: T): void {
    const current = this._source();

    if (current.length >= this._limit()) {
      const outgoing = current.at(-1)!;
      this._removingIds.update(set => new Set([...set, outgoing.id!]));

      setTimeout(() => {
        this._source.update(list => [item, ...list.filter(i => i.id !== outgoing.id)]);
        this._removingIds.update(set => {
          const next = new Set(set);
          next.delete(outgoing.id!);
          return next;
        });
      }, this.exitDuration);
    } else {
      this._source.update(list => [item, ...list]);
    }
  }
}
