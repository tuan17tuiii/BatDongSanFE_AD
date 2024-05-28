import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './news.component.html',
  styleUrl: './app.component.css'
})
export class NewsComponent {
  title = 'BatDongSanFE_AD';
}
