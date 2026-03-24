import { TestBed } from '@angular/core/testing';
import { DeckService } from './deck.service';
import { SUITS, RANKS } from '../models/card.model';

describe('DeckService', () => {
  let service: DeckService;

  beforeEach(() => {
    service = TestBed.inject(DeckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a deck of 52 cards', () => {
    const deck = service.createDeck();
    expect(deck.length).toBe(52);
  });

  it('should contain all suits and ranks', () => {
    const deck = service.createDeck();
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        expect(deck.find((c) => c.suit === suit && c.rank === rank)).toBeTruthy();
      }
    }
  });

  it('should have unique ids for each card', () => {
    const deck = service.createDeck();
    const ids = new Set(deck.map((c) => c.id));
    expect(ids.size).toBe(52);
  });

  it('should shuffle the deck', () => {
    const ordered = SUITS.flatMap((suit) => RANKS.map((rank) => ({ id: `${rank}-${suit}`, suit, rank })));
    const deck = service.createDeck();
    const isSameOrder = deck.every((card, i) => card.id === ordered[i].id);
    // Statistically near-impossible for a shuffled deck to match the original order
    expect(isSameOrder).toBe(false);
  });

  it('shuffle should not mutate the original array', () => {
    const deck = service.createDeck();
    const copy = [...deck];
    service.shuffle(deck);
    expect(deck).toEqual(copy);
  });
});
