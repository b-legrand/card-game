import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { GameStore } from './store/game.store';

@Component({
  selector: 'app-root',
  imports: [CardComponent],
  template: `
    <div class="table">
      <h1>Card Game</h1>

      <section class="deck-area">
        <button class="card-back" (click)="store.drawCard()" [disabled]="store.isDeckEmpty()">
          <span class="card-back-pattern">🂠</span>
        </button>
        <span class="deck-count">{{ store.deckCount() }} cards left</span>
      </section>

      <section class="hand-area">
        <h2>Your Hand</h2>
        <div class="hand">
          @for (card of store.handCards(); track card.id) {
            <app-card [card]="card" />
          } @empty {
            <p class="empty-hand">Click the deck to draw a card</p>
          }
        </div>
      </section>
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100vh;
      background: #2d6a30;
      background-image: radial-gradient(ellipse at center, #357a38 0%, #1b4d1e 100%);
      color: #f0f0f0;
      font-family: 'Georgia', serif;
      padding: 32px;
    }

    .table {
      max-width: 900px;
      margin: 0 auto;
    }

    h1 {
      text-align: center;
      font-size: 2rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      margin-bottom: 32px;
    }

    h2 {
      font-size: 1.2rem;
      margin-bottom: 16px;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
    }

    .deck-area {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 48px;
    }

    .card-back {
      width: 80px;
      height: 120px;
      background: linear-gradient(135deg, #1a3a8a, #2a5ac8);
      border: 3px solid #0d2266;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }

    .card-back:hover:not(:disabled) {
      transform: translateY(-4px);
      box-shadow: 2px 6px 12px rgba(0, 0, 0, 0.5);
    }

    .card-back:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .card-back-pattern {
      font-size: 48px;
      color: rgba(255, 255, 255, 0.8);
    }

    .deck-count {
      font-size: 1rem;
      opacity: 0.8;
    }

    .hand-area {
      border-top: 2px solid rgba(255, 255, 255, 0.15);
      padding-top: 24px;
    }

    .hand {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .empty-hand {
      opacity: 0.6;
      font-style: italic;
    }
  `,
})
export class AppComponent implements OnInit {
  readonly store = inject(GameStore);

  ngOnInit() {
    this.store.initDeck();
  }
}
