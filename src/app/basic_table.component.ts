import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './basic_table.component.html',
  styleUrl: './app.component.css'
})
export class Basictablecomponent {
  title = 'BatDongSanFE_AD';
}
