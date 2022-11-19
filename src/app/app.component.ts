import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('bodyLeft') leftDisplay:any;
  toggleHide = false;

  onToggle(){
    if(this.toggleHide==false){
      this.leftDisplay.nativeElement.style.display="block";
      this.leftDisplay.nativeElement.style.position = "absolute";
      this.leftDisplay.nativeElement.style.background = "white";
      this.leftDisplay.nativeElement.style.zIndex = 1;
      // hide.style.display = "none";
      this.toggleHide = true;
    }
    else{
      this.leftDisplay.nativeElement.style.display = "none";
      //hide.style.display = "flex";
      this.toggleHide = false;
    }
  }

  onResize(e:any){
    if(e.target.screen.width>1173){
      this.leftDisplay.nativeElement.style.display="block";
      this.leftDisplay.nativeElement.style.position = "static";
      this.toggleHide=false;
    }
    else{
      this.leftDisplay.nativeElement.style.display = "none";
    }
  }
}
