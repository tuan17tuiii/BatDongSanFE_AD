import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './basic_elements.component.html',
  styleUrl: './app.component.css'
})
export class Basic_elementscomponent {
  title = 'BatDongSanFE_AD';
}
