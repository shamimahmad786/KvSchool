import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const moduleMate=[CommonModule,  BrowserAnimationsModule,  MatCheckboxModule,  MatCheckboxModule,  MatButtonModule,  MatInputModule,
  MatAutocompleteModule,  MatDatepickerModule,  MatFormFieldModule,  MatRadioModule,  MatSelectModule, 
  MatSlideToggleModule,  MatMenuModule,  MatSidenavModule,    MatToolbarModule,  MatListModule,  
  MatCardModule,  MatStepperModule,    MatExpansionModule,   MatIconModule,
  MatProgressSpinnerModule,   MatDialogModule,  MatTooltipModule,   MatTableModule, 
  MatSortModule,  MatPaginatorModule];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    moduleMate
  ],

  exports:[moduleMate]
})
export class MaterialModule { }
