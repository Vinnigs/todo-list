import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { App } from './app';
import { TaskService, Task } from './services/task';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let taskService: jasmine.SpyObj<TaskService>;

  const mockTasks: Task[] = [
    { id: 1, title: 'Task 1', isCompleted: false, createdAt: new Date() },
    { id: 2, title: 'Task 2', isCompleted: true, createdAt: new Date() }
  ];

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['getTasks']);

    await TestBed.configureTestingModule({
      imports: [App, HttpClientTestingModule],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on initialization', () => {
    taskService.getTasks.and.returnValue(of(mockTasks));
    
    component.ngOnInit();
    
    expect(taskService.getTasks).toHaveBeenCalled();
    expect(component.tasks()).toEqual(mockTasks);
    expect(component.isLoading()).toBeFalse();
  });

  it('should add new task to the list', () => {
    const newTask: Task = { 
      id: 3, 
      title: 'New Task', 
      isCompleted: false, 
      createdAt: new Date() 
    };
    component.tasks.set(mockTasks);
    
    component.onTaskCreated(newTask);
    
    expect(component.tasks().length).toBe(3);
    expect(component.tasks()).toContain(newTask);
  });

  it('should remove task from list when deleted', () => {
    component.tasks.set(mockTasks);
    
    component.onTaskDeleted(1);
    
    expect(component.tasks().length).toBe(1);
    expect(component.tasks().find(t => t.id === 1)).toBeUndefined();
  });

  it('should calculate total items correctly', () => {
    component.tasks.set(mockTasks);
    
    expect(component.totalItems()).toBe(2);
  });
});
