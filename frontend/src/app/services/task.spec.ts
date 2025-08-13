import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService, Task } from './task';
import { environment } from '../../environments/environment';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    isCompleted: false,
    createdAt: new Date('2023-01-01')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tasks', () => {
    const mockTasks = [mockTask];

    service.getTasks().subscribe(tasks => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/task`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should create a task', () => {
    const newTask = { title: 'New Task', isCompleted: false };

    service.createTask(newTask).subscribe(task => {
      expect(task).toEqual(mockTask);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/task`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTask);
    req.flush(mockTask);
  });

  it('should update a task', () => {
    const updatedTask = { ...mockTask, title: 'Updated Task' };

    service.updateTask(1, updatedTask).subscribe(task => {
      expect(task).toEqual(updatedTask);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/task/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTask);
  });

  it('should delete a task', () => {
    service.deleteTask(1).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/task/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
