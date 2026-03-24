import { Component, computed, input } from '@angular/core';
import { Card, SUIT_COLORS, SUIT_SYMBOLS } from '../../models/card.model';

@Component({
  selector: 'app-card',
  template: `
    <div class="card" [style.color]="color()">
      <span class="rank top-left">{{ card().rank }}</span>
      <span class="suit center">{{ symbol() }}</span>
      <span class="rank bottom-right">{{ card().rank }}</span>
    </div>
  `,
  styles: `
    .card {
      width: 80px;
      height: 120px;
      background: white;
      border: 2px solid #ccc;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      font-family: 'Georgia', serif;
      box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
      user-select: none;
    }

    .rank {
      position: absolute;
      font-size: 14px;
      font-weight: bold;
    }

    .top-left {
      top: 6px;
      left: 8px;
    }

    .bottom-right {
      bottom: 6px;
      right: 8px;
      transform: rotate(180deg);
    }

    .center {
      font-size: 32px;
    }
  `,
})
export class CardComponent {
  card = input.required<Card>();

  symbol = computed(() => SUIT_SYMBOLS[this.card().suit]);
  color = computed(() => SUIT_COLORS[this.card().suit]);
}
