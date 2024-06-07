import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { NewsService } from './Services/News.Services';
import { News } from './Entities/News.entities';
import { ImageRealStateAPIService } from './Services/image.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DragDropModule, CommonModule,EditorModule,FormsModule],
  templateUrl: './news.component.html',
  styleUrl: '../assets/css/news.css'
})
export class NewsComponent implements OnInit, AfterViewInit {
  constructor(private newssevice :NewsService,private imgservices :ImageRealStateAPIService, private router: Router){

  }
  news: any= {};
  text: string=""
  images: string[] = []
  files: File[]
  imagestr:string
  fileNames: string[]
tagname:string=""
title:string=""
  @ViewChild('editor', { static: true }) editorElement: ElementRef;
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
   
  }
btn() {
let x=confirm("are you sure")
if(x){
  console.log(this.text);
  console.log(this.files);
  console.log(this.imagestr);
  console.log(this.tagname);
  console.log(this.title);
 let newsv :News=new News
 newsv.title= this.title
 newsv.content=  this.text
 newsv.tag=this.tagname

  this.newssevice.Create(newsv).then(
    res=>{
      console.log(newsv)
      console.log(res)
      let news_idd=res['news_id'] as number;
      news_idd= news_idd;
      let  news_id= news_idd.toString();
      let formData = new FormData();//tao form data
      for (let i = 0; i < this.files.length; i++) {
        formData.append('files', this.files[i]);
        console.log(formData)

        formData.append('id', news_id)
        formData.append('dataname','news')
     
      }
    this.imgservices.uploads(formData).then(
res=>{
  this.router.navigate['blogupnews']
})
    }
  )
  
}else{
  alert("no")
}
    
}
selectFiles(event: any): void {
  this.images = [];
  this.imagestr = '';
  const files = event.target.files as FileList;
  if (files) {
    this.files = Array.from(files); // Chuyển đổi FileList thành một mảng các đối tượng File
    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.images.push(e.target.result as string); // Thêm dữ liệu hình ảnh vào mảng images
      };

      reader.readAsDataURL(file); // Đọc tệp hình ảnh

      // Cập nhật chuỗi tên tệp
      if (i > 0) {
        this.imagestr += ',' + file.name;
      } else {
        this.imagestr = file.name;
      }
    }
  }
}



removeImage(index: number): void {
  this.images.splice(index, 1);
  this.files.splice (index, 1);
}
onDrop(event: CdkDragDrop<string[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(this.images, event.previousIndex, event.currentIndex);
  }
}

}
