import { EventEmitter } from "@angular/core";

export class DatabaseService{
//emp database
empList:any = [
    {
      image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2016%2F08%2Fgettyimages-138426899.jpg",
      firstName: "Chandler",
      lastName: "Bing",
      preferredName: "Chandler",
      email: "cbing@gmail.com",
      jobtitle: "SharePoint Practice Head",
      office: "Seattle",
      dept: "IT",
      phone: "4444444444",
      skype: "bing@skype.in"
    },

    {
      image: "https://media.glamourmagazine.co.uk/photos/6138cab73335302f7261d22f/4:3/w_1280,h_960,c_limit/ross-geller_glamour_10aug17_cbs-sky_p.jpg",
      firstName: "Ross",
      lastName: "Geller",
      preferredName: "Ross",
      email: "ross@gmail.com",
      jobtitle: ".Net Developer Lead",
      office: "India",
      dept: "IT",
      phone: "5555812357",
      skype: "ross@skype.in"
    },

    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcU0hLxCTOw1IJdJ3vTpIZ4gI9FVuskV9BYQ&usqp=CAU",
      firstName: "Rachel",
      lastName: "Green",
      preferredName: "Rachel",
      email: "rgreen@gmail.com",
      jobtitle: "BI Developer",
      office: "Seattle",
      dept: "Sales",
      phone: "5644456897",
      skype: "rachel@skype.in"
    },

    {
      image: "https://www.pinkvilla.com/files/styles/amp_metadata_content_image/public/monica_geller_1.jpg",
      firstName: "Monica",
      lastName: "Geller",
      preferredName: "Monica",
      email: "mon@gmail.com",
      jobtitle: "Business Analyst",
      office: "India",
      dept: "Sales",
      phone: "5787791247",
      skype: "monica@skype.in"
    },

    {
      image: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2018_26/1349761/matt-leblanc-joey-friends-today-180629-tease.jpg",
      firstName: "Joey",
      lastName: "Tribiaani",
      preferredName: "Joey",
      email: "joey@gmail.com",
      jobtitle: "Recruiting Expert",
      office: "Seattle",
      dept: "Human Resources",
      phone: "9999988888",
      skype: "joey@skype.in"
    },

    {
      image: "https://media1.popsugar-assets.com/files/thumbor/Jag4QheIiSRDyPige1c7d6J7X68/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2017/07/25/859/n/1922398/1bb1be5259779df9303e84.02388163_edit_img_image_43785815_1500923262/i/Phoebe-Buffay-Quotes-From-Friends.jpg",
      firstName: "Pheobe",
      lastName: "Buffay",
      preferredName: "Phoebe",
      email: "pheobe@gmail.com",
      jobtitle: "Recruiting Expert",
      office: "India",
      dept: "Human Resources",
      phone: "4747475454",
      skype: "buffay@skype.in"
    }
]

//add employee functionality
addEmployee(employee:any){
  this.empList.push(employee);
  this.countEmpParameters();
}
//parameter count list
paraCount:any = {
  dept:{
    'IT':0,
    'Human Resources':0,
    'MD':0,
    'Sales':0
  },
  office:{
    'Seattle':0,
    'India':0
  },
  jobtitle:{
    'SharePoint Practice Head':0,
    '.Net Developer Lead':0,
    'Recruiting Expert':0,
    'BI Developer':0,
    'Business Analyst':0
  }

}
//function to update counts
countEmpParameters(){
  for(let key in this.paraCount){
    for(let skey in this.paraCount[key]){
      var c=0;
      for(let emp of this.empList){
        if(emp[key]==skey){
          c=c+1;
        }
      }

      this.paraCount[key][skey]=c;
    }
  }
}

//populate filters arrays to be applied

dept_filter:any=[];
office_filter:any=[];
jobtitle_filter:any=[];
letter_filter:any=[];

updateFilters(target:any){
  var key = target.name;
  var value = target.value;
  // console.log(key,value);
  target.style.color = "black";
  target.style.fontWeight = "700";
  // var dummy_employee_list = { employees: new Set() };
  if (key == "dept") {
      if (this.dept_filter.includes(value)) {
          let idx = this.dept_filter.indexOf(value);
          this.dept_filter.splice(idx, 1);
          target.style.color = "black";
          target.style.fontWeight = "100";
      }
      else {
          this.dept_filter.push(value);
      }
  }

  if (key == "office") {
      if (this.office_filter.includes(value)) {
          let idx = this.office_filter.indexOf(value);
          this.office_filter.splice(idx, 1);
          target.style.color = "black";
          target.style.fontWeight = "100";
      }
      else {
          this.office_filter.push(value);
      }
  }

  if (key == "jobtitle") {
      if (this.jobtitle_filter.includes(value)) {
          let idx = this.jobtitle_filter.indexOf(value);
          this.jobtitle_filter.splice(idx, 1);
          target.style.color = "black";
          target.style.fontWeight = "100";
      }
      else {
          this.jobtitle_filter.push(value);
      }
  }

  if (key == "letter") {
    if (this.letter_filter.includes(value)) {
        let idx = this.letter_filter.indexOf(value);
        this.letter_filter.splice(idx, 1);
        target.style.color = "white";
        target.style.fontWeight = "100";
        target.style.background = "#00b1fc";
    }
    else {
        target.style.background = "blue"
        target.style.color = "white";
        this.letter_filter.push(value);
    }
}
}

//emp search function

searchEmp = new EventEmitter<{searchText:string,dropDownValue:string}>();

}
