import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { Pagination } from './pagination';

describe('Pagination', () => {
  let component: Pagination;
  let fixture: ComponentFixture<Pagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pagination]
    }).compileComponents();

    fixture = TestBed.createComponent(Pagination);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update internal signals when inputs change', () => {
    component.totalItems = 50;
    component.itemsPerPage = 10;
    component.currentPage = 3;

    component.ngOnChanges({
      totalItems: new SimpleChange(null, 50, true),
      itemsPerPage: new SimpleChange(null, 10, true),
      currentPage: new SimpleChange(null, 3, true)
    });

    expect(component.totalItemsInternal).toBe(50);
    expect(component.itemsPerPageInternal).toBe(10);
    expect(component.currentPageInternal).toBe(3);
  });

  it('should calculate total pages correctly', () => {
    component.totalItems = 50;
    component.itemsPerPage = 10;
    component.ngOnChanges({
      totalItems: new SimpleChange(null, 50, true),
      itemsPerPage: new SimpleChange(null, 10, true)
    });

    expect(component.totalPages()).toBe(5);
  });

  it('should determine if has previous page', () => {
    component.currentPage = 3;
    component.ngOnChanges({
      currentPage: new SimpleChange(null, 3, true)
    });

    expect(component.hasPrevious()).toBe(true);

    component.currentPage = 1;
    component.ngOnChanges({
      currentPage: new SimpleChange(3, 1, false)
    });
    
    expect(component.hasPrevious()).toBe(false);
  });

  it('should determine if has next page', () => {
    component.totalItems = 50;
    component.itemsPerPage = 10;
    component.currentPage = 3;
    component.ngOnChanges({
      totalItems: new SimpleChange(null, 50, true),
      itemsPerPage: new SimpleChange(null, 10, true),
      currentPage: new SimpleChange(null, 3, true)
    });

    expect(component.hasNext()).toBe(true);

    component.currentPage = 5;
    component.ngOnChanges({
      currentPage: new SimpleChange(3, 5, false)
    });
    
    expect(component.hasNext()).toBe(false);
  });
});
