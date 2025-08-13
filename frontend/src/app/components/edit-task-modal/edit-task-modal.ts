import { Component, EventEmitter, Input, Output, signal, computed, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task, TaskService } from '../../services/task';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-task-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-task-modal.html',
  styleUrl: './edit-task-modal.css'
})
export class EditTaskModal implements OnDestroy {
  @Input() task: Task | null = null;
  @Input() set isVisible(value: boolean) {
    this._isVisible = value;
    this.handleBodyScrollLock(value);
  }
  get isVisible() {
    return this._isVisible;
  }
  
  private _isVisible = false;
  
  @Output() taskUpdated = new EventEmitter<void>();
  @Output() modalClosed = new EventEmitter<void>();
  
  private taskService = inject(TaskService);
  
  // Signals para controle do modal
  editedTitle = signal('');
  isSubmitting = signal(false);
  showValidationTooltip = signal(false);
  
  // Computed para verificar se houve mudança
  hasChanges = computed(() => {
    if (!this.task) return false;
    return this.editedTitle().trim() !== this.task.title.trim();
  });
  
  // Computed para verificar se o formulário é válido
  isFormValid = computed(() => {
    const title = this.editedTitle().trim();
    return title.length >= 3;
  });
  
  // Computed para verificar se o botão de confirmar deve estar habilitado
  canConfirm = computed(() => {
    return this.hasChanges() && this.isFormValid() && !this.isSubmitting();
  });
  
  // Inicializa o modal quando a task muda
  ngOnChanges() {
    if (this.task && this.isVisible) {
      this.editedTitle.set(this.task.title);
      this.showValidationTooltip.set(false);
    }
  }
  
  // Atualiza o título conforme usuário digita
  updateTitle(event: Event) {
    const target = event.target as HTMLInputElement;
    this.editedTitle.set(target.value);
    
    // Esconde tooltip quando usuário começa a digitar
    if (this.showValidationTooltip()) {
      this.showValidationTooltip.set(false);
    }
  }
  
  // Confirma a edição
  async onConfirm() {
    if (!this.canConfirm() || !this.task) return;
    
    const title = this.editedTitle().trim();
    
    // Validação final
    if (title.length < 3) {
      this.showValidationTooltip.set(true);
      setTimeout(() => this.showValidationTooltip.set(false), 3000);
      return;
    }
    
    this.isSubmitting.set(true);
    this.showValidationTooltip.set(false);
    
    try {
      const updatedTask = await firstValueFrom(
        this.taskService.updateTask(this.task.id, {
          title: title,
          isCompleted: this.task.isCompleted
        })
      );
      
      if (updatedTask) {
        // Atualiza a task local
        this.task.title = updatedTask.title;
        
        // Notifica o componente pai
        this.taskUpdated.emit();
        
        // Fecha o modal
        this.closeModal();
        
        console.log('Tarefa editada com sucesso:', updatedTask);
      }
      
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
      this.showValidationTooltip.set(true);
      setTimeout(() => this.showValidationTooltip.set(false), 3000);
    }
    
    this.isSubmitting.set(false);
  }
  
  // Cancela a edição
  onCancel() {
    this.closeModal();
  }
  
  // Fecha o modal
  closeModal() {
    this.showValidationTooltip.set(false);
    this.modalClosed.emit();
  }
  
  // Gerencia o scroll do body quando modal abre/fecha
  private handleBodyScrollLock(isOpen: boolean) {
    if (typeof document !== 'undefined') {
      if (isOpen) {
        document.body.classList.add('modal-open');
      } else {
        document.body.classList.remove('modal-open');
      }
    }
  }
  
  // Cleanup quando componente é destruído
  ngOnDestroy() {
    this.handleBodyScrollLock(false);
  }
  
  // Fecha modal ao clicar no overlay
  onOverlayClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
  
  // Submit com Enter
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.canConfirm()) {
      event.preventDefault();
      this.onConfirm();
    }
    
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeModal();
    }
  }
  
  // Getter para mensagem de validação
  get validationMessage(): string {
    const title = this.editedTitle().trim();
    
    if (title.length === 0) {
      return 'O título da tarefa não pode estar vazio';
    }
    
    if (title.length < 3) {
      return 'O título deve ter pelo menos 3 caracteres';
    }
    
    return '';
  }
}
