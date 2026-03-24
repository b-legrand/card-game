import { Injectable } from '@angular/core';
import { Card, RANKS, SUITS } from '../models/card.model';

@Injectable({ providedIn: 'root' })
export class DeckService {
  createDeck(): Card[] {
    const deck: Card[] = [];
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        deck.push({ id: `${rank}-${suit}`, suit, rank });
      }
    }
    return this.shuffle(deck);
  }

  shuffle(deck: Card[]): Card[] {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}
