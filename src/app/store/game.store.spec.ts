import { TestBed } from '@angular/core/testing';
import { GameStore } from './game.store';

describe('GameStore', () => {
  let store: InstanceType<typeof GameStore>;

  beforeEach(() => {
    store = TestBed.inject(GameStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should start with empty deck and hand', () => {
    expect(store.deckCount()).toBe(0);
    expect(store.handCards().length).toBe(0);
    expect(store.isDeckEmpty()).toBe(true);
  });

  it('should init deck with 52 cards', () => {
    store.initDeck();
    expect(store.deckCount()).toBe(52);
    expect(store.isDeckEmpty()).toBe(false);
  });

  it('should draw a card from deck to hand', () => {
    store.initDeck();
    const firstCard = store.deckEntities()[0];
    store.drawCard();
    expect(store.deckCount()).toBe(51);
    expect(store.handCards().length).toBe(1);
    expect(store.handCards()[0].id).toBe(firstCard.id);
  });

  it('should draw multiple cards', () => {
    store.initDeck();
    store.drawCard();
    store.drawCard();
    store.drawCard();
    expect(store.deckCount()).toBe(49);
    expect(store.handCards().length).toBe(3);
  });

  it('should not draw from empty deck', () => {
    store.drawCard();
    expect(store.handCards().length).toBe(0);
  });
});
