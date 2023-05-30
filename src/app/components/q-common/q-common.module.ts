import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { QCommonRoutingModule } from './q-common-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
// import { DialogModule } from 'primeng/dialog';
// import { RadioButtonModule } from 'primeng/radiobutton';
// import { TableModule } from 'primeng/table';
// import { PaginatorModule } from 'primeng/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import 'boxicons'
import { MatNativeDateModule } from '@angular/material/core';
// import { CarouselModule } from 'primeng/carousel';
// import { ButtonModule } from 'primeng/button';
// import { GalleriaModule } from 'primeng/galleria';
// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { CountdownModule } from 'ngx-countdown';
import {MatTreeModule} from '@angular/material/tree';
// import {ConfirmDialogModule} from 'primeng/confirmdialog';
// import { SidebarModule } from 'primeng/sidebar';
// import { AutoCompleteModule } from 'primeng/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
// import {TreeModule} from 'primeng/tree'; 
// import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import {MatTooltipModule} from '@angular/material/tooltip';
// import { TooltipModule } from 'primeng/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    QCommonRoutingModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatRadioModule,
    MatStepperModule,
    // TableModule,
    // PaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    // DialogModule,
    // RadioButtonModule,
    RouterModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // CarouselModule,
    // ButtonModule,
    // GalleriaModule,
    // PerfectScrollbarModule,
    // CountdownModule,
    // SidebarModule,
    // MatAutocompleteModule,
    MatTreeModule,
    MatDialogModule,
    // TreeModule,
    // ConfirmDialogModule,
    MatTooltipModule,
    // TooltipModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    NgxMatSelectSearchModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  exports: [
    MatExpansionModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatRadioModule,
    MatStepperModule,
    // TableModule,
    // PaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    // DialogModule,
    // RadioButtonModule,
    RouterModule,
    MatToolbarModule,
    MatDatepickerModule,
    // CarouselModule,
    // ButtonModule,
    // GalleriaModule,
    // CountdownModule,
    // PerfectScrollbarModule,
    // SidebarModule,
    // AutoCompleteModule,
    MatTreeModule,
    MatDialogModule,
    // TreeModule,
    // ConfirmDialogModule,
    MatTooltipModule,
    // TooltipModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    NgxMatSelectSearchModule,
    NgMultiSelectDropDownModule
  ],

})
export class QCommonModule { }
