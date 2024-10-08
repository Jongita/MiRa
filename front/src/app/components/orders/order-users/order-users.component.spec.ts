import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUsersComponent } from './order-users.component';

describe('OrderUsersComponent', () => {
  let component: OrderUsersComponent;
  let fixture: ComponentFixture<OrderUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
