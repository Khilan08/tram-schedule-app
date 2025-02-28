import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramListComponent } from './tram-list.component';

describe('TramListComponent', () => {
  let component: TramListComponent;
  let fixture: ComponentFixture<TramListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TramListComponent]
    });
    fixture = TestBed.createComponent(TramListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
