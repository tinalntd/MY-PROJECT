import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionTipsComponent } from './adoption-tips.component';

describe('AdoptionTipsComponent', () => {
  let component: AdoptionTipsComponent;
  let fixture: ComponentFixture<AdoptionTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionTipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptionTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
