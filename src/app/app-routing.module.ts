import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReportAddFormComponent } from './components/report-add-form/report-add-form.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ReportViewComponent } from './components/report-view/report-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/reports', pathMatch: 'full'},
  { path: 'reports', component: DataTableComponent },
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
