import { Component, OnInit, inject } from '@angular/core';
import { CouponDto } from '../Model/CouponDto';
import { Observable, map } from 'rxjs';
import { CouponService } from '../services/coupon.service';
import { CommonModule } from '@angular/common';
import { CouponCreateComponent } from '../coupon-create/coupon-create.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CouponDeleteComponent } from '../coupon-delete/coupon-delete.component';

@Component({
  selector: 'app-coupon-index',
  standalone: true,
  imports: [CommonModule, CouponCreateComponent],
  templateUrl: './coupon-index.component.html',
  styleUrl: './coupon-index.component.css'
})
export class CouponIndexComponent implements OnInit {
  coupons$!: Observable<CouponDto[]>;
  private modalService = inject(NgbModal);

  constructor(private couponService: CouponService) {
  }

  ngOnInit(): void {
   this.getCouponList();
  }

  getCouponList() {
    this.coupons$ = this.couponService.GetAllCouponsAsync().pipe(
      map(c => {
        var coupons: CouponDto[] = [];
        if(c.isSuccess === true) {
          coupons = (c.result as any[])?.map(r => {
            return {
              CouponId: r.couponId,
              CouponCode: r.couponCode,
              DiscountAmount: r.discountAmount,
              MinAmount: r.minAmount
          } as CouponDto });
          return coupons;
        }
        else return coupons;
      }));
  }

  openCreationModal() {
    const modalRef = this.modalService.open(CouponCreateComponent);
    modalRef.componentInstance.creationEvent.subscribe(()=> {
      modalRef.close();
      this.getCouponList();
    })
  }

  openDeletionModal(coupon: CouponDto) {
    const modalRef = this.modalService.open(CouponDeleteComponent);
    modalRef.componentInstance.coupon = coupon;
    modalRef.componentInstance.deletionEvent.subscribe(()=> {
      modalRef.close();
      this.getCouponList();
    })
  }
}
