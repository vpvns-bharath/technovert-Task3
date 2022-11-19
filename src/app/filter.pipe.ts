import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(value:any,dept_filter:any,office_filter:any,jobtitle_filter:any,letter_filter:any){

    var matched:any=new Set();

    var dept_matches:any = this.checkMatches(value,"dept",dept_filter);
    var office_matches :any= this.checkMatches(value,"office",office_filter);
    var jobtitle_matches:any = this.checkMatches(value,"jobtitle",jobtitle_filter);
    var letter_matches:any = this.checkMatches(value,"letter",letter_filter);

    //combine dept_matches and office_matches
    var dept_office_matches = new Set();
    if(dept_matches.size==0 && dept_filter.length==0){
      dept_office_matches = office_matches;
    }
    else if(office_matches.size==0){
      dept_office_matches = dept_matches;
    }
    else{
      dept_office_matches = new Set([...dept_matches].filter(e=>office_matches.has(e)));
    }

    //combine jobtitle_matches and letter matches
    var jobtitles_letter_matches = new Set();
    if(jobtitle_matches.size==0){
      jobtitles_letter_matches = letter_matches;
    }
    else if(letter_matches.size==0){
      jobtitles_letter_matches = jobtitle_matches;
    }
    else{
      jobtitles_letter_matches = new Set([...jobtitle_matches].filter(e=>letter_matches.has(e)));
    }

    // combining all matches
    if(dept_office_matches.size==0 && dept_filter.length==0){
      matched = jobtitles_letter_matches;
    }
    else if(jobtitles_letter_matches.size==0 && letter_filter.length==0){
      matched = dept_office_matches;
    }
    else{
      matched = new Set([...dept_office_matches].filter(e=>jobtitles_letter_matches.has(e)));
    }

    if((dept_matches.size==0 && dept_filter.length==0) && (office_matches.size==0 && office_filter.length==0) &&
      (jobtitle_matches.size==0 && jobtitle_filter.length==0) && (letter_matches.size==0 && letter_filter.length==0)){
      return value;
    }

    return matched;

  }

  checkMatches(empList:any,key:any,filter:any){
    var matched=new Set();
    if(key!="letter"){
      for(let i=0 ; i<=filter.length;i++){
        for(let emp of empList){
          if(emp[key]==filter[i]){
            matched.add(emp);
          }
        }
      }
    }
    else{
      for (let i = 0; i < filter.length; i++) {
        var val = filter[i];
        var letter_matched = new Set();
        for (let j = 0; j < empList.length; j++) {
            if (empList[j].firstName.toUpperCase().startsWith(val)) {
                letter_matched.add(empList[j]);
            }
        }

        if(letter_matched.size!=0){
            matched = new Set([...matched].concat([...letter_matched]))
        }
        else{
            matched = new Set();
        }
    }
    }
    return matched;
  }

}

