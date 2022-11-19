import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  alphabets:string[]=[];
  tmpUrl:any="";
  searchText:string="";
  dropDownValue:string="FirstName";
  @ViewChild('form')submittedForm!: NgForm;
  constructor(private dbService:DatabaseService,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {


    for(let i=0;i<26;i++){
      let code = 'A'.charCodeAt(0) + i;
      let text = String.fromCharCode(code);
      this.alphabets.push(text);
    }

  }

  letterClick(e:any){
    this.dbService.updateFilters(e.target);
  }

  createUrl(e:any){
    this.tmpUrl="";
    this.tmpUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(e.target.files[0]));
  }

  submitAddEmployeeForm(){
    var formData= this.submittedForm.value;
    if(this.tmpUrl!=""){
      formData['image'] = this.tmpUrl;
      this.tmpUrl="";
    }
    this.dbService.addEmployee(formData);
    this.submittedForm.reset();
  }

  searchEmp(e:any){
    if(e.key=="Enter"){
      this.dbService.searchEmp.emit({searchText:this.searchText,dropDownValue:this.dropDownValue});
    }

  }

  clearText(){
    this.searchText="";
    this.dbService.searchEmp.emit({searchText:"",dropDownValue:this.dropDownValue});
  }

}
