import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CouponDto } from '../Model/CouponDto';
import { CouponService } from '../services/coupon.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { ResponseDto } from '../Model/ResponseDto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coupon-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coupon-delete.component.html',
  styleUrl: './coupon-delete.component.css'
})
export class CouponDeleteComponent {
  @Input() coupon!: CouponDto;
  @Output() deletionEvent = new EventEmitter<void>();
  activeModal = inject(NgbActiveModal);

  constructor(private couponService: CouponService, private toastr: ToastrService) {}

  onSubmit() {
    this.couponService.DeleteCouponAsync(this.coupon.CouponId).pipe(
      map((r: ResponseDto) => {
        if(r.isSuccess === true) {
          this.toastr.success(`Successfully deleted coupon with code ${this.coupon.CouponCode}`, 'Success');
          this.deletionEvent.emit();
        }
        else {
          this.toastr.error(`Error while deleting coupon with code ${this.coupon.CouponId} : ${r.message}`, 'Error');
        }
        return;
    })).subscribe(() => {});
  }
}
