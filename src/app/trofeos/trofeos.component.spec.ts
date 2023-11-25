import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrofeosComponent } from './trofeos.component';

describe('TrofeosComponent', () => {
  let component: TrofeosComponent;
  let fixture: ComponentFixture<TrofeosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrofeosComponent]
    });
    fixture = TestBed.createComponent(TrofeosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
