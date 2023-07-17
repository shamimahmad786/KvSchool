import { Component, OnInit, ViewChild } from '@angular/core';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-school-reset-password',
  templateUrl: './school-reset-password.component.html',
  styleUrls: ['./school-reset-password.component.css']
})
export class SchoolResetPasswordComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  businessTypeId: any;
  businessTypeCode: any;
  modeselect: number;
  appllicatioDetails: any;
  regionCodeData: any;
  allSchoolList:any;
  listSchool: any=[];
  constructor(private outSideService: OutsideServicesService) { }
  displayedColumns:any = ['sno', 'schoolName','action'];
  testData = {sno: '', schoolName: '',schoolCode:''};
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
 
    this.businessTypeId=JSON.parse(sessionStorage.getItem('authTeacherDetails')).applicationDetails[0].business_unit_type_id;
    this.businessTypeCode=JSON.parse(sessionStorage.getItem('authTeacherDetails')).applicationDetails[0].business_unit_type_code;
    if(this.businessTypeId==3){
      this.getStationList(this.businessTypeCode);
    }else if(this.businessTypeId==2){
      this.getStationList(1);
    }
   
  }
      getStationList(regionCode:any)
      {
        debugger
        this.modeselect =+regionCode;
        this.appllicatioDetails= JSON.parse(sessionStorage.getItem('authTeacherDetails'))
        if(this.appllicatioDetails.applicationDetails['0'].business_unit_type_code==null){
        this.regionCodeData=regionCode;
        }
        else{
        this.regionCodeData=regionCode;
        }
  
          const data={
            "businessUnitTypeId":this.appllicatioDetails.applicationDetails['0'].business_unit_type_id,
            "regionCode": this.regionCodeData
            }
          console.log(data)
          this.outSideService.fetchAllSactionedPostMapping(data).subscribe((res)=>{
            console.log("list")
            console.log(res)
     
            this.allSchoolList=res['rowValue'];
            console.log(this.allSchoolList)
            for (let i = 0; i < this.allSchoolList.length; i++) {   
            this.testData.sno = '' + (i + 1) + '';
          
            this.testData.schoolName =this.allSchoolList[i].kv_name;
            this.testData.schoolCode ='kv_'+this.allSchoolList[i].school_code;
            this.listSchool.push(this.testData);
            this.testData = { "sno": "", "schoolName": "","schoolCode":"" };
           }
           console.log("school  list")
           console.log(this.listSchool)
          setTimeout(() => {
            this.dataSource = new MatTableDataSource(this.listSchool);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }, 100)
          })
     }
     resetPassword(empCode){
      debugger
      this.outSideService.schoolResetPassword(empCode).subscribe((res)=>{
        if(res.status == '1'){
          Swal.fire(
            'Password reset successfully !',
            '',
            'success'
          )
        }else if(res.status == '0'){
          Swal.fire(
            'Try again !',
            '',
            'error'
          )
        }
      })
    }
     applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); 
      filterValue = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
    }
   }
