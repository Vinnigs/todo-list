import { Component, Input, Output, EventEmitter, computed, signal, effect, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css'
})
export class Pagination implements OnChanges {
  @Input() totalItems = 0;
  @Input() itemsPerPage = 15;
  @Input() currentPage = 1;
  
  @Output() pageChanged = new EventEmitter<number>();
  
  private _totalItems = signal(0);
  private _itemsPerPage = signal(15);
  private _currentPage = signal(1);
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalItems']) {
      this._totalItems.set(this.totalItems);
    }
    if (changes['itemsPerPage']) {
      this._itemsPerPage.set(this.itemsPerPage);
    }
    if (changes['currentPage']) {
      this._currentPage.set(this.currentPage);
    }
  }
  
  constructor() {
    effect(() => {
      console.log('Pagination signals changed:', {
        currentPage: this._currentPage(),
        totalItems: this._totalItems(),
        itemsPerPage: this._itemsPerPage(),
        totalPages: this.totalPages(),
        hasPrevious: this.hasPrevious(),
        hasNext: this.hasNext()
      });
    });
  }
  
  get totalItemsInternal() { return this._totalItems(); }
  get itemsPerPageInternal() { return this._itemsPerPage(); }
  get currentPageInternal() { return this._currentPage(); }
  
  get currentPageSignal() { return this._currentPage; }
  
  totalPages = computed(() => {
    const total = Math.ceil(this._totalItems() / this._itemsPerPage());
    console.log('Total pages calculated:', total, 'from', this._totalItems(), 'items');
    return total;
  });
  
  hasPrevious = computed(() => {
    const result = this._currentPage() > 1;
    console.log('Has previous:', result, 'current page:', this._currentPage());
    return result;
  });
  
  hasNext = computed(() => {
    const result = this._currentPage() < this.totalPages();
    console.log('Has next:', result, 'current page:', this._currentPage(), 'total pages:', this.totalPages());
    return result;
  });
  
  visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this._currentPage();
    const pages: number[] = [];
    
    console.log('Calculating visible pages for total:', total, 'current:', current);
    
    if (total <= 1) {
      return pages;
    }
    
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 4) {
        for (let i = 1; i <= Math.min(5, total); i++) {
          pages.push(i);
        }
        if (total > 6) {
          pages.push(-1);
          pages.push(total);
        }
      } else if (current >= total - 3) {
        pages.push(1);
        if (total > 6) {
          pages.push(-1);
        }
        for (let i = Math.max(total - 4, 2); i <= total; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1);
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push(-1);
        pages.push(total);
      }
    }
    
    console.log('Visible pages:', pages);
    return pages;
  });
  
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages() && page !== this._currentPage()) {
      console.log('Going to page:', page);
      this.pageChanged.emit(page);
    }
  }
  
  previousPage() {
    if (this.hasPrevious()) {
      this.goToPage(this._currentPage() - 1);
    }
  }
  
  nextPage() {
    if (this.hasNext()) {
      this.goToPage(this._currentPage() + 1);
    }
  }
  
  firstPage() {
    this.goToPage(1);
  }
  
  lastPage() {
    this.goToPage(this.totalPages());
  }
}
