import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoContraRelojComponent } from './juego-contra-reloj.component';

describe('JuegoContraRelojComponent', () => {
  let component: JuegoContraRelojComponent;
  let fixture: ComponentFixture<JuegoContraRelojComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegoContraRelojComponent]
    });
    fixture = TestBed.createComponent(JuegoContraRelojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
