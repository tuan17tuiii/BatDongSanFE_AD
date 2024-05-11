import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './login.component.html',
})
export class Logincomponet {
  title = 'BatDongSanFE_AD';
}
