import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './index.component.html',
})
export class Indexcomponet {
  title = 'BatDongSanFE_AD';
}
