import { Component, signal } from '@angular/core';
import { TaskItem } from './components/task-item/task-item';
import { NewTaskForm } from './components/new-task-form/new-task-form';

@Component({
  selector: 'app-root',
  imports: [TaskItem, NewTaskForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo-list-frontend');
}
