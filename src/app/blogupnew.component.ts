import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { EditorModule } from 'primeng/editor';
import { FormArray, FormsModule } from '@angular/forms';
import { NewsService } from './Services/News.Services';
import { News } from './Entities/News.entities';
import { ImageRealStateAPIService } from './Services/image.services';
import { BaseUrlService } from './Services/BaseUrlServices.services';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DragDropModule, CommonModule, EditorModule, FormsModule],
  templateUrl: './blogupnew.component.html',
  styleUrl: '../assets/css/news.css'
})
export class BlogupnewsComponent implements OnInit {
  news: News[]
  imgsurl: string
  constructor(private newsSv: NewsService, private router: Router,
    private imgsv: BaseUrlService,
    private imgsvv: ImageRealStateAPIService,
    private activatedRoute: ActivatedRoute,
  ) {

  }
  ngOnInit(): void {
    this.imgsurl = this.imgsv.ImageUrl

    this.Renderr()


  }
  async Renderr(): Promise<void> {
    try {
      this.news = await this.newsSv.FindAllNews() as News[];
      let a = Array.from(this.news)
      console.log(this.newsSv.FindAllNews())
    } catch (error) {
      console.error('Error fetching all news:', error);
      // Handle error (e.g., show a message to the user)
    }
  }


  remove(id: string): void {
    let a = confirm("are you sure")
    if (a) {
      this.newsSv.Delete(Number(id)).then(
        res => {
          alert(res)
          this.newsSv.FindAllNews().then(
            res => { this.news = res as News[]; }
          )

        },
        err => {
          alert("errrrrrr")
        }
      )
    }

  }


}
