import { Component, computed, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { Task, TaskService } from '../../services/task';
import { EditTaskModal } from '../edit-task-modal/edit-task-modal';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-task-item',
  imports: [EditTaskModal],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css'
})
export class TaskItem {
  @Input() task: Task | null = null;

  @Output() taskUpdated = new EventEmitter<void>();
  @Output() taskDeleted = new EventEmitter<number>();

  private taskService = inject(TaskService);

  taskTitle = signal("Sem título");
  isCompleted = signal(false);
  isProcessing = signal(false);
  showEditModal = signal(false);

  ngOnChanges() {
    if (this.task) {
      this.taskTitle.set(this.task.title);
      this.isCompleted.set(this.task.isCompleted);
    }
  }

  async toggleCompleted() {
    if (this.isProcessing() || !this.task) return;

    this.isProcessing.set(true);

    try {
      const updatedTask = await firstValueFrom(
        this.taskService.updateTask(this.task.id, {
          title: this.task.title,
          isCompleted: !this.task.isCompleted
        })
      )

      if (updatedTask) {
        this.task = updatedTask;
        this.isCompleted.set(updatedTask.isCompleted);
        this.taskTitle.set(updatedTask.title);
      }

      this.taskUpdated.emit();

    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
    
    setTimeout(() => {
      this.isProcessing.set(false);
    }, 400);
  }

  async deleteTask() {
    if (!this.task) return;

    try {
      await firstValueFrom(
        this.taskService.deleteTask(this.task.id)
      );
      
      this.taskDeleted.emit(this.task.id);
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  }

  editTask() {
    if (!this.task) return;
    this.showEditModal.set(true);
    console.log('Abrindo modal de edição para:', this.task.title);
  }

  onModalClosed() {
    this.showEditModal.set(false);
  }

  onTaskEdited() {
    this.showEditModal.set(false);
    this.taskUpdated.emit();
  }
}
