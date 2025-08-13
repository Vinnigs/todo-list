import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task, TaskService } from '../../services/task';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-new-task-form',
  imports: [
    FormsModule, 
    CommonModule
  ],
  templateUrl: './new-task-form.html',
  styleUrl: './new-task-form.css'
})
export class NewTaskForm {
  @Output() taskCreated = new EventEmitter<Task>();
  
  private taskService = inject(TaskService);
  
  taskTitle = signal('');
  isSubmitting = signal(false);
  showValidationTooltip = signal(false);
  
  async onSubmit() {
    const title = this.taskTitle().trim();
    
    console.log('onSubmit chamado:', { title, length: title.length });
    
    if (!title) {
      console.log('Título vazio - mostrando tooltip');
      this.showValidationTooltip.set(true);
      setTimeout(() => this.showValidationTooltip.set(false), 3000);
      return;
    }
    
    if (title.length < 3) {
      console.log('Título muito curto - mostrando tooltip');
      this.showValidationTooltip.set(true);
      setTimeout(() => this.showValidationTooltip.set(false), 3000);
      return;
    }
    
    if (this.isSubmitting()) return;
    
    this.showValidationTooltip.set(false);
    this.isSubmitting.set(true);
    
    try {
      const newTask = await firstValueFrom(
        this.taskService.createTask({
          title: title,
          isCompleted: false
        })
      );
      
      if (newTask) {
        this.taskCreated.emit(newTask);
        this.taskTitle.set('');
        console.log('Nova tarefa criada:', newTask);
      }
      
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      this.showValidationTooltip.set(true);
      setTimeout(() => this.showValidationTooltip.set(false), 3000);
    }
    
    this.isSubmitting.set(false);
  }
  
  updateTitle(event: Event) {
    const target = event.target as HTMLInputElement;
    this.taskTitle.set(target.value);
    
    if (this.showValidationTooltip()) {
      this.showValidationTooltip.set(false);
    }
  }
  
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onSubmit();
    }
  }
  
  get validationMessage(): string {
    const title = this.taskTitle().trim();
    
    if (!title) {
      return 'O título da tarefa não pode estar vazio';
    }
    
    if (title.length < 3) {
      return 'O título deve ter pelo menos 3 caracteres';
    }
    
    return '';
  }
}