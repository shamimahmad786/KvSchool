import { Component, OnInit , ViewChild, Input, EventEmitter, Output} from '@angular/core';
import { ReportService } from 'src/app/service/report-service';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { MAT_OPTION_PARENT_COMPONENT, MatOptgroup, MatOption, MatOptionParentComponent,MatOptionSelectionChange } from '@angular/material/core';
import {
  ColDef,
  GridReadyEvent,
  RowGroupingDisplayType,
} from 'ag-grid-community';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import {FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

// import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
// import { MatSelect } from '@angular/material';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { takeUntil, take } from 'rxjs/operators';
// import { UntypedFormControl } from '@angular/forms';
 
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';

export interface Bank {
  id: string;
  name: string;
}








export interface StateGroup {
names:any;
}

// export const _filter = (opt: any, value: string): string[] => {
//   const filterValue = value.toLowerCase();
//   return opt.filter(item => item['regionName'].toString().toLowerCase().includes(filterValue));
// };

// export const _filterstation = (opt: any, value: string): string[] => {
//   const filterValue = value.toLowerCase();
//   return opt.filter(item => item['stationName'].toString().toLowerCase().includes(filterValue)===0);
// };

// export const _filterschool = (opt: any, value: string): string[] => {
//   const filterValue = value.toLowerCase();
//   return opt.filter(item => item['kvName'].toString().toLowerCase().includes(filterValue));
// };


@Component({
  selector: 'app-report-grid',
  templateUrl: './report-grid.component.html',
  styleUrls: ['./report-grid.component.css']
})
export class ReportGridComponent implements OnInit {

  reportId:any;
  reportType:any;
  reportValue:any;
  rowData:any;
  columnDefs:any=[];
  regionData:any=[];
  stationData:any=[];
  schoolData:any=[];
  menuHeader: any = [];
  regionName:any;
  stationName:any;
  schoolName:any;
  kvName:any;
  previousData:any;
  regionCode:any;
  stationCode:any;
  schoolCode:any;
  reportFullName:any;


    BANKS: Bank[] = [
    {name: 'Bank A (Switzerland)', id: 'A'},
    {name: 'Bank B (Switzerland)', id: 'B'},
    {name: 'Bank C (France)', id: 'C'},
    {name: 'Bank D (France)', id: 'D'},
    {name: 'Bank E (France)', id: 'E'},
    {name: 'Bank F (Italy)', id: 'F'},
    {name: 'Bank G (Italy)', id: 'G'},
    {name: 'Bank H (Italy)', id: 'H'},
    {name: 'Bank I (Italy)', id: 'I'},
    {name: 'Bank J (Italy)', id: 'J'},
    {name: 'Bank Kolombia (United States of America)', id: 'K'},
    {name: 'Bank L (Germany)', id: 'L'},
    {name: 'Bank M (Germany)', id: 'M'},
    {name: 'Bank N (Germany)', id: 'N'},
    {name: 'Bank O (Germany)', id: 'O'},
    {name: 'Bank P (Germany)', id: 'P'},
    {name: 'Bank Q (Germany)', id: 'Q'},
    {name: 'Bank R (Germany)', id: 'R'}
  ];
  



  public regionCtrl: FormControl = new FormControl();
  public regionFilterCtrl: FormControl = new FormControl();
  public filteredRegion: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('regionSelect', { static: true }) regionSelect: MatSelect;

  public stationCtrl: FormControl = new FormControl();
  public stationFilterCtrl: FormControl = new FormControl();
  public filteredStation: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('stationSelect', { static: true }) stationSelect: MatSelect;

  public schoolCtrl: FormControl = new FormControl();
  public schoolFilterCtrl: FormControl = new FormControl();
  public filteredSchool: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('schoolSelect', { static: true }) schoolSelect: MatSelect;






  protected _onDestroy = new Subject<void>();
  yPoint: any;
  allResData: any;

  ngAfterViewInit() {
    // this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  // protected setInitialValue() {
  //   this.filteredRegion
  //     .pipe(take(1), takeUntil(this._onDestroy))
  //     .subscribe(() => {
  //       this.regionSelect.compareWith = (a: Bank, b: Bank) => a && b && a.id === b.id;
  //     });
  // }

  protected filterRegion() {
    if (!this.regionData) {
      return;
    }
    let search = this.regionFilterCtrl.value;
    if (!search) {
      this.filteredRegion.next(this.regionData.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredRegion.next(
      this.regionData.filter(region => region.regionName.toLowerCase().indexOf(search) > -1)
    );
  }

  protected filterStation() {
    if (!this.stationData) {
      return;
    }
    let search = this.stationFilterCtrl.value;
    if (!search) {
      this.filteredStation.next(this.stationData.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredStation.next(
      this.stationData.filter(station => station.stationName.toLowerCase().indexOf(search) > -1)
    );
  }

  constructor(private reportService:ReportService,private _formBuilder: FormBuilder,private outsideServicesService:OutsideServicesService) { }

  ngOnInit(): void {
      this.reportId=JSON.parse(JSON.stringify(this.reportService.pullReportBasicData())).reportId;
      this.reportType=JSON.parse(JSON.stringify(this.reportService.pullReportBasicData())).reportType;
      this.reportValue=JSON.parse(JSON.stringify(this.reportService.pullReportBasicData())).reportValue;
      
      this.regionFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterRegion();
      });


      this.stationFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterStation();
      });



      setTimeout(()=>{   
        
        const data={"reportId":this.reportId,"reportType":"N","reportValue":"1234"};                       // <<<---using ()=> syntax
        this.getReportData(data);
        // this.regionChange(2);
        this. getRegionData();
        
    }, 1000);



    this.menuHeader = [
      { label: 'Region(All)', icon: 'keyboard_arrow_right' }
    ];
   

    // this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filterGroup(value || '')),
    // );
    this.getReportName(this.reportId);
  }

  getReportName(data){
    if(data=="1"){
      this.reportFullName="Detailed Kendriya Vidyalaya profile report";
    }else if(data=="2"){
      this.reportFullName="List of school";
    }else if(data=="3"){
      this.reportFullName="List of Region";
    }else if(data=="4"){
      this.reportFullName="List of Station";
    }else if(data=="5"){
      this.reportFullName="Sanctioned Post for Region";
    }
    
  }


  // columnDefs = [
  //   {headerName: 'Region Name', field: 'region_name'},
  //   {headerName: 'Total No. of Station', field: 'no_of_station'},
  //   {headerName: 'Total No. of School', field: 'no_of_school'},
  //   {headerName: 'Total No. of Staff ', field: 'total_staff_all' }, 
  // ];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    resizable: true,
  };
  public autoGroupColumnDef: ColDef = {
    // headerValueGetter: params => `${params.colDef.headerName} Group Column`,
    minWidth: 220,
    // cellRendererParams: {
    //     suppressCount: true,
    //     checkbox: true,
    // }
  };
  public groupDisplayType: RowGroupingDisplayType = 'multipleColumns';
   gridOptions = {
    defaultColDef: {
      sortable: true,
      resizable: true,
      filter: true,
    },
    // debug: true,
    columnDefs: this.columnDefs,
    suppressAggFuncInHeader: true,
    rowData: null,
  };

  onGridReady(params) {
   
  }

  getReportData(data){
  
    // alert(JSON.stringify(data));

    this.reportService.getReportData(data).subscribe((res) => { 

      // alert(JSON.stringify(res));
      this.allResData=res
      this.rowData=res.rowValue;
      this.rows=res.rowValue
      
      if(this.reportId=="1"){

      if(data.reportType=="N" || (data.reportType=="R" && data.reportValue=="999")){


        this.columnDefs = [
          {headerName: 'Region Name', field: 'region_name'},
          {headerName: 'Total No. of Station', field: 'no_of_station'},
          {headerName: 'Total No. of School', field: 'no_of_school'},
          {headerName: 'Total No. of Staff ', field: 'total_staff_all' }, 
        ];
      }else if(data.reportType=="R" || (data.reportType=="S" && data.reportValue=="999")){
        this.columnDefs = [
          {headerName: 'Region Name', field: 'region_name'},
          {headerName: 'Station Name', field: 'station_name'},
          {headerName: 'Total No. of School', field: 'no_of_school'},
          {headerName: 'Total No. of Staff ', field: 'total_staff_all' }, 
        ];
        // this.stationForm.controls.stationGroup.patchValue(this.stationData[0].stationName);
      }else if(data.reportType=="S" || (data.reportType=="SCH" && data.reportValue=="999")){
        
        this.columnDefs = [
          {headerName: 'Region Name', field: 'region_name'},
          {headerName: 'Station Name', field: 'station_name'},
          {headerName: 'School Name', field: 'kv_name'},
          {headerName: 'Total No. of Staff ', field: 'total_staff_all' }, 
        ];
        
        // this.schoolForm.controls.schoolGroup.patchValue(this.schoolData[0].kvName);
        
        
        // this.schoolForm.controls.schoolGroup.patchValue(this.schoolData[1].kvName);
        // this.schoolForm.controls.schoolGroup.patchValue(this.schoolData[1].kvName);
        // this.schoolForm.patchValue({'kvName': 'ALIGARH' });

        
        // this.schoolForm.controls.schoolGroup.patchValue("All");
      }else if(data.reportType=="SCH"){
        this.columnDefs = [
          {headerName: 'Region Name', field: 'region_name'},
          {headerName: 'Region Code', field: 'region_code'},
          {headerName: 'Station Name', field: 'station_name'},
          {headerName: 'Station Code', field: 'station_code'},
          {headerName: 'School Name', field: 'kv_name'},
          {headerName: 'School Code', field: 'kv_code'},
          {headerName: 'Staff Name', field: 'teacher_name'},
          {headerName: 'Staff Gender', field: 'teacher_gender'},
          {headerName: 'Teacher Status', field: 'verify_flag'},
          // {headerName: 'Total No. of Staff ', field: 'total_staff_all' }, 
        ];
      }

    }else if(this.reportId=="2"){
      this.columnDefs = [
        {headerName: 'Region Name', field: 'region_name'},
        {headerName: 'Region Code', field: 'region_code'},
        {headerName: 'Station Name', field: 'station_name'},
        {headerName: 'Station Code', field: 'station_code' },
        {headerName: 'Kv Name', field: 'kv_name' },
        {headerName: 'Kv Code', field: 'kv_code' }, 
        {headerName: 'Udise Code', field: 'udise_sch_code' },
        {headerName: 'State Name', field: 'state_name' },
        {headerName: 'District Name', field: 'district_name' },
      ];
    }else if(this.reportId=="3"){
      this.columnDefs = [
        {headerName: 'Region Name', field: 'region_name'},
        {headerName: 'Region Code', field: 'region_code'},
        {headerName: 'Total No. of School', field: 'no_of_school'},
        
      ];
    }else if(this.reportId=="4"){
      this.columnDefs = [
        {headerName: 'Region Name', field: 'region_name'},
        {headerName: 'Region Code', field: 'region_code'},
        {headerName: 'Station Name', field: 'station_name'},
        {headerName: 'Station Code', field: 'station_code'},
        {headerName: 'Total No. of School', field: 'no_of_school'},
        
      ];
    }else if(this.reportId=="5"){
      this.columnDefs = [
        {headerName: 'Region Name', field: 'region_name'},
        {headerName: 'Region Code', field: 'region_code'},
        {headerName: 'School Name', field: 'kv_name'},
        {headerName: 'School Code', field: 'school_code'},
        {headerName: 'Post Name', field: 'post_name'},
        {headerName: 'Post Code', field: 'post_code'},
        {headerName: 'Subject Name', field: 'subject_name'},
        {headerName: 'Subject Code', field: 'subject_code'},
        {headerName: 'Sanctioned Post', field: 'sanctioned_post'},
        {headerName: 'Occupied Post', field: 'occupied_post'},
      ];
    }

      this.columns=this.columnDefs;
      
    })
  }

  exportexcel(){
    console.log(this.rows)
  
    const workBook = new Workbook();
    const workSheet = workBook.addWorksheet('SanctionedPostforRegion');
    const excelData = [];
    const ws1 = workSheet.addRow(['','','','', 'SANCTIONED POST FOR '+this.regionName, '','','','','']);
    const dobCol = workSheet.getColumn(1);
    dobCol.width = 20;
    const dobCol1 = workSheet.getColumn(2);
    dobCol1.width = 10;
    const dobCol2 = workSheet.getColumn(3);
    dobCol2.width = 35;
    const dobCol34 = workSheet.getColumn(4);
    dobCol34.width =10;
    const dobCol3 = workSheet.getColumn(5);
    dobCol3.width =30;
    const dobCol4 = workSheet.getColumn(6);
    dobCol4.width =10;
    const dobCol5 = workSheet.getColumn(7);
    dobCol5.width =20;
    const dobCol6 = workSheet.getColumn(8);
    dobCol6.width =15;
    const dobCol7 = workSheet.getColumn(9);
    dobCol7.width =10;
    const dobCol8 = workSheet.getColumn(10);
    dobCol8.width =10;
    workSheet.getRow(1).font = { name: 'Arial', family: 4, size: 13, bold: true };
    for (let i = 1; i < 11; i++) {
      const col = ws1.getCell(i);
      col.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb:  '9c9b98' },   
      };
    }
   const ws = workSheet.addRow(['Region Name', 'Region Code', 'School Name','School Code','Post Name','Post Code','Subject name','Subject Code','Sanctioned post','occupied post']);
   workSheet.getRow(2).font = { name: 'Arial', family: 4, size: 10, bold: true };
      for (let i = 1; i < 11; i++) {
        const col = ws.getCell(i);
        col.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb:  'd6d6d4' },
        };
      }
      
      this.rows.forEach((item) => {
      const row = workSheet.addRow([item.region_name, item.region_code,item.kv_name,item.school_code,item.post_name,item.post_code,item.subject_name,item.subject_code,item.sanctioned_post,item.occupied_post]);
    });
    workBook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'SanctionedPostforRegion.xlsx');
    });
  }




  getRegionData(){
  
    this.reportService.fetchKvRegion(1).subscribe((res) => { 
      
      this.regionData=res.response.rowValue;

      // alert(JSON.stringify(this.regionData));

      // this.regionData.push({"regionCode":999,"regionName":"All","regionId":999});
      this.regionData.splice(0, 0, {"regionCode":999,"regionName":"All","regionId":999})
      this.stateGroups=[{
        names:this.regionData,
      }]

    

      // this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges.pipe(
      //     startWith(''),
      //     map(value => this._filterGroup(value || '')),
      //   );

      


        // Commented by shami  for set data
        this.regionCtrl.setValue(this.regionData[0]);
        this.filteredRegion.next(this.regionData.slice());



        // this.regionFilterCtrl.valueChanges
        //   .pipe(takeUntil(this._onDestroy))
        //   .subscribe(() => {
        //     this.filterBanks();
        //   });

        // this.stateForm.controls.stateGroup.patchValue(this.regionData[0].regionName);

      

      
    })
  }






  stateForm = this._formBuilder.group({
    stateGroup: '',
  });

  stationForm = this._formBuilder.group({
    stationGroup: '',
  });

  schoolForm = this._formBuilder.group({
    schoolGroup: '',
  });



  stateGroups: StateGroup[] = [
    {
      // letter: 'A',
      names:this.regionData,
      // names: [{"regionCode":26,"regionName":"AGRA","regionId":26},{"regionCode":1,"regionName":"AHMEDABAD","regionId":1},{"regionCode":2,"regionName":"BENGALURU","regionId":2},{"regionCode":3,"regionName":"BHOPAL","regionId":3},{"regionCode":4,"regionName":"BHUBANESWAR","regionId":4},{"regionCode":7,"regionName":"CHANDIGARH","regionId":7},{"regionCode":16,"regionName":"CHENNAI","regionId":16},{"regionCode":8,"regionName":"DEHRADUN","regionId":8},{"regionCode":9,"regionName":"DELHI","regionId":9},{"regionCode":27,"regionName":"ERNAKULAM","regionId":27},{"regionCode":32,"regionName":"GURUGRAM","regionId":32},{"regionCode":10,"regionName":"GUWAHATI","regionId":10},{"regionCode":11,"regionName":"HYDERABAD","regionId":11},{"regionCode":12,"regionName":"JABALPUR","regionId":12},{"regionCode":13,"regionName":"JAIPUR","regionId":13},{"regionCode":14,"regionName":"JAMMU","regionId":14},{"regionCode":6,"regionName":"KOLKATA","regionId":6},{"regionCode":19,"regionName":"KVS HQ","regionId":19},{"regionCode":15,"regionName":"LUCKNOW","regionId":15},{"regionCode":5,"regionName":"MUMBAI","regionId":5},{"regionCode":17,"regionName":"PATNA","regionId":17},{"regionCode":29,"regionName":"RAIPUR","regionId":29},{"regionCode":28,"regionName":"RANCHI","regionId":28},{"regionCode":18,"regionName":"SILCHAR","regionId":18},{"regionCode":31,"regionName":"TINSUKIA","regionId":31},{"regionCode":30,"regionName":"VARANASI","regionId":30},{"regionCode":25,"regionName":"ZIET BHUBANESHWAR","regionId":25},{"regionCode":23,"regionName":"ZIET CHANDIGARH","regionId":23},{"regionCode":20,"regionName":"ZIET GWALIOR","regionId":20},{"regionCode":22,"regionName":"ZIET KOLKATA","regionId":22},{"regionCode":21,"regionName":"ZIET MUMBAI","regionId":21},{"regionCode":24,"regionName":"ZIET MYSORE","regionId":24}]
      // id:['1','2','3','4']
      // names: [{id:1,value:'Alabama'}, {id:2,value:'Alaska'}],
    }
  
  ];

  stationGroups: StateGroup[] = [
    {
      names:this.stationData,
    }
  
  ];

  schoolGroups: StateGroup[] = [
    {
      names:this.schoolData,
    }
  
  ];
  

  stateGroupOptions: Observable<StateGroup[]>;
  stationGroupOptions: Observable<StateGroup[]>;
  schoolGroupOptions: Observable<StateGroup[]>;

  // constructor() {}

  // ngOnInit() {
   
  // }

//   private _filterGroup(value: string): StateGroup[] {
//     if (value) {
  
//       return this.stateGroups
//       // return this.stateGroups
//         .map(group => ({names: _filter(group.names, value)}))
//         .filter(group => group.names.length > 0);
//     }

//     return this.stateGroups;
//   }

//   private _stationfilterGroup(value: string): StateGroup[] {
//     if (value) {
//       return this.stationGroups

//         .map(group => ({names: _filterstation(group.names, value)}))
//         .filter(group => group.names.length > 0);
//     }

//     return this.stationGroups;
//   }

//   private _schoolfilterGroup(value: string): StateGroup[] {
//     if (value) {
//       return this.schoolGroups
//         .map(group => ({names: _filterschool(group.names, value)}))
//         .filter(group => group.names.length > 0);
//     }

//     return this.schoolGroups;
//   }


  regionChange(event){
    
    
this.regionName=event.region_name;
if(this.regionName=="All"){
this.menuHeader = [
  { label: 'Region('+event.region_name+')', icon: 'keyboard_arrow_right' }
];

 this.stationData=[];
 this.schoolData=[];
 this.filteredSchool.next(this.schoolData.slice());
 
}else {
  this.menuHeader = [
    { label: 'Region('+event.region_name+')', icon: 'keyboard_arrow_right' },
    { label: 'Station(All)', icon: 'keyboard_arrow_right' }
  ];
  
  // this.stationData[0]={"stationCode":999,"stationName":"All","stationId":999};
  // this.stationData.splice(0, 0, {"stationCode":999,"stationName":"All","stationId":999})
  
  
}
    this.reportService.getStationByRegion(event.regionCode).subscribe((res) => { 

      

      this.stationData=res.response;
      if(this.stationData.length>0){
      this.stationData.splice(0, 0, {"stationId":null,"statinCode":"999","stationName":"All","regionCode":"999"});
      }
      
      this.filteredStation.next(this.stationData.slice());
      this.stationGroups=[{
        names:this.stationData,
      }]
      this.stationCtrl.setValue(this.stationData[0]);
      // this.stationGroupOptions = this.stationForm.get('stationGroup')!.valueChanges.pipe(
      //     startWith(''),
      //     map(value => this._stationfilterGroup(value || '')),
      //   );

    })
this.regionCode=event.regionCode;
    const datas={"reportId":this.reportId,"reportType":"R","reportValue":event.region_code};
    this.getReportData(datas);

  }

  getSchoolByStation(event){
    

    
// this.stationForm.get('stationGroup')
    // this._stationfilterGroup("" || '')
    this.stationName=event.stationName;
if(this.stationName=="All"){
    this.menuHeader = [
      { label: 'Region('+this.regionName+')', icon: 'keyboard_arrow_right' },
      { label: 'Station('+event.stationName+')', icon: 'keyboard_arrow_right' }
    ];
  }else {
    this.menuHeader = [
      { label: 'Region('+this.regionName+')', icon: 'keyboard_arrow_right' },
      { label: 'Station('+event.stationName+')', icon: 'keyboard_arrow_right' },
      { label: 'School(All)', icon: 'keyboard_arrow_right' }
    ];
  }
    this.stationForm.get('stationGroup').valueChanges.pipe(
      startWith('')
     
    );
    // this.stationGroups.slice();
    

    this.reportService.getSchoolByStation(event.statinCode).subscribe((res) => { 

      

      this.schoolData=res.response;
      this.schoolData.splice(0, 0,{"kvName":"All","kvCode":"999","udiseSchCode":"999"});
      this.schoolData.splice(1, 0,{"kvName":"All-Teacher","kvCode":"9999","udiseSchCode":"9999"});
      this.filteredSchool.next(this.schoolData.slice());
      

      this.schoolGroups=[{
        names:this.schoolData,
      }]
      
      // this.schoolGroupOptions = this.schoolForm.get('schoolGroup')!.valueChanges.pipe(
      //     startWith(''),
      //     map(value => this._schoolfilterGroup(value || '')),
      //   );
        // this.schoolForm.controls.schoolGroup.patchValue(this.schoolData[0].kvName);
        this.stationCode=event.statinCode;

    
        const datas={"reportId":this.reportId,"reportType":"S","reportValue":event.statinCode,"previous":this.regionCode};
        this.getReportData(datas);
        
        
        

    })

    
  }

  getStaffBySchool(event){
    
    if(event.kvName=="All"){
      
      this.menuHeader = [
        { label: 'Region('+this.regionName+')', icon: 'keyboard_arrow_right' },
        { label: 'Station('+this.stationName+')', icon: 'keyboard_arrow_right' },
        { label: 'School(All)', icon: 'keyboard_arrow_right' }
      ];
    }else {
      this.menuHeader = [
        { label: 'Region('+this.regionName+')', icon: 'keyboard_arrow_right' },
        { label: 'Station('+this.stationName+')', icon: 'keyboard_arrow_right' },
        { label: 'School('+event.kvName+')', icon: 'keyboard_arrow_right' }
      ];
    }
    


const datas={"reportId":this.reportId,"reportType":"SCH","reportValue":event.udiseSchCode,"previous":this.stationCode};



this.getReportData(datas);

  }



rows:any;
columns:any;

  download(){
    
    

this.columns=JSON.parse(JSON.stringify(this.columnDefs).replace(/headerName/g,"title"));
this.columns=JSON.parse(JSON.stringify(this.columns).replace(/field/g,"dataKey"));



  //   var columns = [
  //     {title: "ID", dataKey: "id"},
  //     {title: "Name", dataKey: "name"}, 
  //     {title: "Country", dataKey: "address", displayProperty: "country"}
  // ];
  // var rows = [
  //     {id: 1, name: "Shaw", address: {country: "Tanzania"}},
  //     {id: 2, name: "Nelson", address: {country: "Kazakhstan"}},
  //     {id: 3, name: "Garcia", address: {country: "Madagascar"}}
  // ];

  

  var doc = new jsPDF('l', 'mm', 'a4');


  var yPoint:any;

  var reportName 
  // alert(this.reportId);
  if(this.reportId==5){
    reportName = this.reportFullName+" "+this.regionName;
  }
  
  
  (doc as any).autoTable({
    
    body: this.rows,
    columns: this.columns,
    startY: 45,
    didDrawPage: function (data) {
     
      
      const currentDate = new Date();
      const convtCurrentDate = "" + currentDate + ""

      // Header
      doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 10, 100, 20);
      

      doc.setTextColor(0, 128, 0);
      doc.setFontSize(14);
      doc.setFont('Times-Roman', 'bold');
      doc.text(reportName, 15, 35)

      doc.setDrawColor(0, 0, 0);
      doc.setTextColor(0, 0, 0);
      doc.setLineWidth(0.2);
      doc.line(15, 37, 281, 37);

      

      // Footer
      var str = "Page " + data.doc.internal.getNumberOfPages();

      doc.setFontSize(10);
      // jsPDF 1.4+ uses getWidth, <1.4 uses .width
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height
        ? pageSize.height
        : pageSize.getHeight();
      doc.text(str, data.settings.margin.left, pageHeight - 5);

      // doc.setTextColor(0, 0, 0);
      // doc.setFontSize(12);
      // doc.setFont('Times-Roman', 'bold');
      // doc.text('Report Generation Date & Time', data.settings.margin.left + 110, pageHeight - 10)

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.setFont('Times-Roman', 'normal');
      doc.text(convtCurrentDate, data.settings.margin.left + 180, pageHeight - 5)

    },
  //   didParseCell: function(data) {
  //    if (data.column.raw.displayProperty) {
  //        var prop = data.column.raw.displayProperty;
  //       var text = data.cell.raw[prop];
  //       if (text && text.length > 0) {
  //         data.cell.text = text;
  //       }
  //    }
  // },
  didDrawCell: data => {
    this.yPoint = data.cursor.y
  },

  headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
  alternateRowStyles: { fillColor: [255, 251, 245] },
  valign: 'top',
  margin: {
    top: 40,
    bottom: 15,
  },
  })
  
  // var doc = jsPDF();
  // doc.autoTable({
  //   body: rows,
  //   columns: columns,
  //   didParseCell: function(data) {
  //    if (data.column.raw.displayProperty) {
  //        var prop = data.column.raw.displayProperty;
  //       var text = data.cell.raw[prop];
  //       if (text && text.length > 0) {
  //         data.cell.text = text;
  //       }
  //    }
  // }
  // });
  doc.save(reportName+'.pdf');

    this.stationForm.get('stationGroup').setValue('');
    // this.stationGroups
    //     .map(
    //       group => ({names:group.names})
    //     )
    //     .filter(group => group.names.length > 0);
  }

  // menuHeader: any = [
  //   { label: 'Shamim', icon: 'keyboard_arrow_right' },
  //   { label: 'Shamim', icon: 'keyboard_arrow_right' },
  // ];

  breadCrumbMain(){

  }

  breadCrumb(){
    
  }

}
