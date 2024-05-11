import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './mdi.component.html',
  styleUrl: './app.component.css'
})
export class MidComponent {
  title = 'BatDongSanFE_AD';
}
