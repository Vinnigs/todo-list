import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NewTaskForm } from './new-task-form';
import { TaskService, Task } from '../../services/task';

describe('NewTaskForm', () => {
  let component: NewTaskForm;
  let fixture: ComponentFixture<NewTaskForm>;
  let taskService: jasmine.SpyObj<TaskService>;

  const mockTask: Task = {
    id: 1,
    title: 'New Task',
    isCompleted: false,
    createdAt: new Date()
  };

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['createTask']);

    await TestBed.configureTestingModule({
      imports: [NewTaskForm, HttpClientTestingModule],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NewTaskForm);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create task with valid title', async () => {
    component.taskTitle.set('Valid Task Title');
    taskService.createTask.and.returnValue(of(mockTask));
    spyOn(component.taskCreated, 'emit');
    
    await component.onSubmit();
    
    expect(taskService.createTask).toHaveBeenCalledWith({
      title: 'Valid Task Title',
      isCompleted: false
    });
    expect(component.taskCreated.emit).toHaveBeenCalledWith(mockTask);
    expect(component.taskTitle()).toBe('');
  });

  it('should show validation error for empty title', async () => {
    component.taskTitle.set('');
    
    await component.onSubmit();
    
    expect(component.showValidationTooltip()).toBe(true);
    expect(taskService.createTask).not.toHaveBeenCalled();
  });

  it('should show validation error for short title', async () => {
    component.taskTitle.set('ab');
    
    await component.onSubmit();
    
    expect(component.showValidationTooltip()).toBe(true);
    expect(taskService.createTask).not.toHaveBeenCalled();
  });

  it('should update title from input event', () => {
    const mockEvent = {
      target: { value: 'New Title' }
    } as any;
    
    component.updateTitle(mockEvent);
    
    expect(component.taskTitle()).toBe('New Title');
  });

  it('should submit on Enter key press', () => {
    spyOn(component, 'onSubmit');
    const mockEvent = {
      key: 'Enter',
      preventDefault: jasmine.createSpy('preventDefault')
    } as any;
    
    component.onKeyPress(mockEvent);
    
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(component.onSubmit).toHaveBeenCalled();
  });
});
