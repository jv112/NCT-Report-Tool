import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReportAddFormComponent } from './report-add-form/report-add-form.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ReportViewComponent } from './report-view/report-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/reports', pathMatch: 'full'},
  { path: 'reports', component: MainPageComponent },
  { path: 'reports/create-report', component: ReportAddFormComponent },
  { path: 'reports/view-report', component: ReportViewComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
