import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods } from '@ngrx/signals';
import { addEntity, removeEntity, setAllEntities, withEntities } from '@ngrx/signals/entities';
import { Card } from '../models/card.model';
import { DeckService } from '../services/deck.service';

type DeckCard = Card & { _collection: 'deck' };
type HandCard = Card & { _collection: 'hand' };

export const GameStore = signalStore(
  { providedIn: 'root' },
  withEntities({ entity: type<DeckCard>(), collection: 'deck' }),
  withEntities({ entity: type<HandCard>(), collection: 'hand' }),
  withComputed((store) => ({
    deckCount: computed(() => store.deckEntities().length),
    handCards: computed(() => store.handEntities()),
    isDeckEmpty: computed(() => store.deckEntities().length === 0),
  })),
  withMethods((store, deckService = inject(DeckService)) => ({
    initDeck() {
      const deck = deckService.createDeck();
      patchState(store, setAllEntities(deck as DeckCard[], { collection: 'deck' }));
    },
    drawCard() {
      const deckCards = store.deckEntities();
      if (deckCards.length === 0) return;
      const card = deckCards[0];
      patchState(
        store,
        removeEntity(card.id, { collection: 'deck' }),
        addEntity(card as unknown as HandCard, { collection: 'hand' }),
      );
    },
  })),
);

function type<T>(): T {
  return undefined as unknown as T;
}
