import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './news.component.html',
  styleUrl: './app.component.css'
})
export class NewsComponent implements OnInit {
  private images :string[]
  private files :string[]
  private fileNames :string[]
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  title = 'BatDongSanFE_AD';
  removeImage(index: number) {
    this.images.splice(index, 1);
    this.files.splice(index, 1);
    this.fileNames.splice(index, 1);
    console.log(this.files);
  }
  onDrop(event: CdkDragDrop<string[]>) {

    if (!event.isPointerOverContainer) {
      // Người dùng chưa thả chuột, không cần cập nhật
      return;
    }

    // Kéo và thả từ vùng khác vào, cần cập nhật vị trí của các files, images và fileNames
    const filesCopy = [...this.files];
    moveItemInArray(filesCopy, event.previousIndex, event.currentIndex);
    this.files = filesCopy;

    const imagesCopy = [...this.images];
    moveItemInArray(imagesCopy, event.previousIndex, event.currentIndex);
    this.images = imagesCopy;

    const fileNamesCopy = [...this.fileNames];
    moveItemInArray(fileNamesCopy, event.previousIndex, event.currentIndex);
    this.fileNames = fileNamesCopy;

    console.log(this.files);
  }
}
