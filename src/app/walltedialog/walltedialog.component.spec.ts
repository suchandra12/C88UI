import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalltedialogComponent } from './walltedialog.component';

describe('WalltedialogComponent', () => {
  let component: WalltedialogComponent;
  let fixture: ComponentFixture<WalltedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalltedialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalltedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
