import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { TaskItem } from './task-item';
import { TaskService, Task } from '../../services/task';

describe('TaskItem', () => {
  let component: TaskItem;
  let fixture: ComponentFixture<TaskItem>;
  let taskService: jasmine.SpyObj<TaskService>;

  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    isCompleted: false,
    createdAt: new Date()
  };

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['updateTask', 'deleteTask']);

    await TestBed.configureTestingModule({
      imports: [TaskItem, HttpClientTestingModule],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItem);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update task title and completion status on ngOnChanges', () => {
    component.task = mockTask;
    
    component.ngOnChanges();
    
    expect(component.taskTitle()).toBe(mockTask.title);
    expect(component.isCompleted()).toBe(mockTask.isCompleted);
  });

  it('should toggle task completion status', async () => {
    const updatedTask = { ...mockTask, isCompleted: true };
    taskService.updateTask.and.returnValue(of(updatedTask));
    component.task = { ...mockTask };
    spyOn(component.taskUpdated, 'emit');
    
    await component.toggleCompleted();
    
    expect(taskService.updateTask).toHaveBeenCalled();
    expect(component.isCompleted()).toBe(true);
    expect(component.taskUpdated.emit).toHaveBeenCalled();
  });

  it('should delete task', async () => {
    taskService.deleteTask.and.returnValue(of(undefined));
    component.task = { ...mockTask };
    spyOn(component.taskDeleted, 'emit');
    
    await component.deleteTask();
    
    expect(taskService.deleteTask).toHaveBeenCalledWith(mockTask.id);
    expect(component.taskDeleted.emit).toHaveBeenCalledWith(mockTask.id);
  });

  it('should open edit modal', () => {
    component.task = { ...mockTask };
    
    component.editTask();
    
    expect(component.showEditModal()).toBe(true);
  });

  it('should close edit modal', () => {
    component.showEditModal.set(true);
    
    component.onModalClosed();
    
    expect(component.showEditModal()).toBe(false);
  });
});
