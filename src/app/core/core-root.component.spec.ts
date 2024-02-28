import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreRootComponent } from './core-root.component';

describe('CoreRootComponent', () => {
  let component: CoreRootComponent;
  let fixture: ComponentFixture<CoreRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreRootComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoreRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
