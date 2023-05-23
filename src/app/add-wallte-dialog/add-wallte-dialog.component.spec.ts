import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWallteDialogComponent } from './add-wallte-dialog.component';

describe('AddWallteDialogComponent', () => {
  let component: AddWallteDialogComponent;
  let fixture: ComponentFixture<AddWallteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWallteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWallteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
