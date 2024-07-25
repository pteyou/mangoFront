import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CouponService } from '../services/coupon.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-coupon-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './coupon-create.component.html',
  styleUrl: './coupon-create.component.css'
})
export class CouponCreateComponent {
  activeModal = inject(NgbActiveModal);
  @Output() creationEvent = new EventEmitter<void>();

  createForm = this.fb.nonNullable.group({
    couponCode: ['', [Validators.required, Validators.pattern("\\w+")]],
    discount: [NaN, [Validators.required, Validators.pattern("^\\d+\.?\\d*$")]],
    minimum: [NaN, [Validators.required, Validators.pattern("^\\d+\.?\\d*$")]]
  })

  constructor(private fb: FormBuilder, private couponService: CouponService, private toastr: ToastrService) {
  }

  onSubmit(): void {
    if(this.createForm.valid) {
      this.couponService.CreateCouponAsync({
        CouponCode: this.createForm.controls.couponCode.value,
        DiscountAmount: this.createForm.controls.discount.value,
        MinAmount: this.createForm.controls.minimum.value,
      }).pipe(
        map(c => {
          if(c.isSuccess === true) {
            var couponResult = (c.result as any);
            this.toastr.success(`Successfully created coupon code with Code ${couponResult.couponCode}`,
              'Success'
            );
          }
          return;
        })).subscribe(() => this.creationEvent.emit() );
    }
    else {
      this.toastr.error("Please make sure params are good",
        'Error'
      )
    }
  }
}
