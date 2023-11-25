import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarMemePropioComponent } from './generar-meme-propio.component';

describe('GenerarMemePropioComponent', () => {
  let component: GenerarMemePropioComponent;
  let fixture: ComponentFixture<GenerarMemePropioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerarMemePropioComponent]
    });
    fixture = TestBed.createComponent(GenerarMemePropioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
