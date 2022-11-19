import { Component, ElementRef, OnInit,QueryList,ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-displaybox',
  templateUrl: './displaybox.component.html',
  styleUrls: ['./displaybox.component.scss']
})
export class DisplayboxComponent implements OnInit {
  empList:any=[];
  dept_filter:any=[];
  office_filter:any=[];
  jobtitle_filter:any=[];
  letter_filter:any=[];
  tmpUrl:any="";
  imgChange=false;
  @ViewChildren('empDetailsForm') submittedForm = new QueryList<NgForm>;

  constructor(private dbservice:DatabaseService,private elRef:ElementRef,private sanitizer:DomSanitizer) {
    this.dbservice.searchEmp.subscribe(
      (searchObj)=>this.showSerchedEmployee(searchObj)
    );
  }

  ngOnInit(): void {
    this.empList = this.dbservice.empList;
    this.dept_filter = this.dbservice.dept_filter;
    this.office_filter = this.dbservice.office_filter;
    this.jobtitle_filter = this.dbservice.jobtitle_filter;
    this.letter_filter = this.dbservice.letter_filter;
  }


  createUrl(e:any){
    this.tmpUrl="";
    this.tmpUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(e.target.files[0]));
    this.imgChange=true;
  }

  editButtonClicked(i:number){
    const targetInputs=this.elRef.nativeElement.querySelectorAll("#emp-data-inp"+i);
    for(let j=0;j<targetInputs.length;j++){
      targetInputs[j].disabled = false;
    }
  }

  saveDetails(i:number){
    const newEmpData =this.submittedForm.toArray()[i].value;
    if(this.imgChange){
      newEmpData['image'] = this.tmpUrl;
      this.imgChange=false;
    }
    for(let key in newEmpData){
      if(newEmpData[key]=== ""){

        if(key == 'image'){
         var pholder = this.elRef.nativeElement.querySelector("."+key+i).getAttribute('placeholder');
         var oldImg;

         if(pholder.substr(1,2)=="af"){

          oldImg=this.sanitizer.bypassSecurityTrustResourceUrl(pholder.substr(39,64));
         }
         else{
          oldImg=this.sanitizer.bypassSecurityTrustResourceUrl(pholder);
         }
         newEmpData['image']=oldImg;
        }
        else{
        newEmpData[key] = this.elRef.nativeElement.querySelector("."+key+i).getAttribute('placeholder');
        }
      }
    }

    this.empList[i]=newEmpData;
    this.submittedForm.toArray()[i].reset();
    this.dbservice.countEmpParameters();
  }

  showSerchedEmployee(searchObj:any){
    let emps = this.elRef.nativeElement.querySelectorAll(".emp-card");
    for(let i=0;i<emps.length;i++){
      let empMatch = emps[i].querySelector(".emp-text").querySelector("."+searchObj.dropDownValue).innerHTML.toUpperCase();
      if(!empMatch.startsWith(searchObj.searchText.toUpperCase()))
      {
        emps[i].style.display = "none";
      }
      else
      {
        emps[i].style.display = "initial";
      }
    }
  }

}


