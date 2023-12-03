import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTableComponent } from './data-table/data-table.component';
import { ReportAddFormComponent } from './report-add-form/report-add-form.component';
import { MapComponent } from './map/map.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ReportViewComponent } from './report-view/report-view.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    ReportAddFormComponent,
    MapComponent,
    MainPageComponent,
    ReportViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
