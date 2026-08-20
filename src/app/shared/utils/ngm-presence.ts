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
    exitDuration = 300
  ) {
    this._source = source;
    this._limit = limit;
    this.exitDuration = exitDuration;

    this.presence = usePresenceList(this.visibleItems, {
      getId: (item) => item.id!,
      exitingIds: this._removingIds,
    });
  }

  markExiting(id: number) {
    this._removingIds.update(set => new Set([...set, id]));
  }
}
