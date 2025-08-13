import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { TaskItem } from './components/task-item/task-item';
import { NewTaskForm } from './components/new-task-form/new-task-form';
import { Pagination } from './components/pagination/pagination';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from './services/task';

@Component({
  selector: 'app-root',
  imports: [TaskItem, NewTaskForm, Pagination, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  
  private taskService = inject(TaskService)

  tasks = signal<Task[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  
  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(15);
  
  paginatedTasks = computed(() => {
    const allTasks = this.tasks();
    const page = this.currentPage();
    const perPage = this.itemsPerPage();
    
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    
    return allTasks.slice(startIndex, endIndex);
  });
  
  totalItems = computed(() => {
    const total = this.tasks().length;
    console.log('App - Total items computed:', total);
    return total;
  });
  
  shouldShowPagination = computed(() => {
    const should = this.totalItems() > this.itemsPerPage();
    console.log('App - Should show pagination:', should, 'total:', this.totalItems(), 'per page:', this.itemsPerPage());
    return should;
  });

  ngOnInit() {
    this.loadTasks();
  }

  async loadTasks() {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      this.taskService.getTasks().subscribe({
        next: (tasks) => {
          this.tasks.set(tasks);
          this.isLoading.set(false);
        },
        error: (error) => {
          this.error.set("Erro ao carregar tarefas");
          this.isLoading.set(false);
          console.error("Erro:", error);
        }
      });
    } catch (error) {
      this.error.set("Erro ao carregar tarefas");
      this.isLoading.set(false);
    }
  }

  onTaskCreated(newTask: Task) {
    this.tasks.update(currentTasks => [...currentTasks, newTask])
    this.adjustPageAfterAdd();
  }

  onTaskUpdated() {
    this.loadTasks();
  }

  onTaskDeleted(taskId: number) {
    this.tasks.update(currentTasks => 
      currentTasks.filter(task => task.id !== taskId)
    );
    this.adjustPageAfterDelete();
  }
  
  onPageChanged(page: number) {
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  private adjustPageAfterAdd() {
    const totalItems = this.totalItems();
    const itemsPerPage = this.itemsPerPage();
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    if (totalItems % itemsPerPage === 1 && totalPages > 1) {
      this.currentPage.set(totalPages);
    }
  }
  
  private adjustPageAfterDelete() {
    const totalItems = this.totalItems();
    const itemsPerPage = this.itemsPerPage();
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentPage = this.currentPage();
    
    if (currentPage > totalPages && totalPages > 0) {
      this.currentPage.set(totalPages);
    }
    
    if (totalItems === 0) {
      this.currentPage.set(1);
    }
  }

  trackByTaskId(_index: number, task: Task): number {
    return task.id;
  }
}
