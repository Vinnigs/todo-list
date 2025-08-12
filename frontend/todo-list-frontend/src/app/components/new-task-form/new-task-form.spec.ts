import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskForm } from './new-task-form';

describe('NewTaskForm', () => {
  let component: NewTaskForm;
  let fixture: ComponentFixture<NewTaskForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTaskForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTaskForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
