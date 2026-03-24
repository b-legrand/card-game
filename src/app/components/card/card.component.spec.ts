import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CardComponent } from './card.component';
import { Card } from '../../models/card.model';

@Component({
  imports: [CardComponent],
  template: `<app-card [card]="card" />`,
})
class TestHostComponent {
  card: Card = { id: 'A-hearts', suit: 'hearts', rank: 'A' };
}

describe('CardComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.nativeElement.querySelector('app-card')).toBeTruthy();
  });

  it('should display the rank', () => {
    const ranks = fixture.nativeElement.querySelectorAll('.rank');
    expect(ranks[0].textContent.trim()).toBe('A');
    expect(ranks[1].textContent.trim()).toBe('A');
  });

  it('should display the suit symbol', () => {
    const symbol = fixture.nativeElement.querySelector('.center');
    expect(symbol.textContent.trim()).toBe('♥');
  });

  it('should use red color for hearts', () => {
    const card = fixture.nativeElement.querySelector('.card') as HTMLElement;
    expect(card.style.color).toBe('rgb(231, 76, 60)');
  });

  it('should use black color for spades', () => {
    host.card = { id: 'K-spades', suit: 'spades', rank: 'K' };
    fixture.detectChanges();
    const card = fixture.nativeElement.querySelector('.card') as HTMLElement;
    expect(card.style.color).toBe('rgb(44, 62, 80)');
  });

  it('should display diamond symbol for diamonds', () => {
    host.card = { id: '10-diamonds', suit: 'diamonds', rank: '10' };
    fixture.detectChanges();
    const symbol = fixture.nativeElement.querySelector('.center');
    expect(symbol.textContent.trim()).toBe('♦');
  });
});
