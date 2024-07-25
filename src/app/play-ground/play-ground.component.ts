import { Component } from '@angular/core';
import { CouponIndexComponent } from '../coupon-index/coupon-index.component';

@Component({
  selector: 'app-play-ground',
  standalone: true,
  imports: [CouponIndexComponent],
  templateUrl: './play-ground.component.html',
  styleUrl: './play-ground.component.css'
})
export class PlayGroundComponent {

}
