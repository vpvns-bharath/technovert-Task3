import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  viewMore = false;
  displayText = "View More.."
  para:any;

  constructor(private dbService:DatabaseService) { }

  ngOnInit(): void {
    this.dbService.countEmpParameters();
    this.para = this.dbService.paraCount;
  }

  optViewMore(){

    if(this.viewMore==true){
      this.displayText="View More.."
    }
    else{
      this.displayText="View Less.."
    }
    this.viewMore = !this.viewMore;
  }

  filterCilcked(e:any){
    this.dbService.updateFilters(e.target);
  }

}
