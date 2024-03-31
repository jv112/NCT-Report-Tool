import { Injectable } from '@angular/core';
import { NuisanceReport } from '../models/ReportClass';
import { EventEmitter } from '@angular/core';
import axios from 'axios';

@Injectable({
    providedIn: 'root'
})

export class ReportService {

    constructor() {}

    async getReportByRid(rid: number): Promise<NuisanceReport> {
        return await axios.get(`http://localhost:3000/reports/${rid}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async getAllReports(): Promise<NuisanceReport[]> {
        return axios.get('http://localhost:3000/reports')
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async addReport(report: NuisanceReport): Promise<void> {
        return axios.post('http://localhost:3000/reports', report)
            .then(() => {
                return;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async deleteReport(rid: number): Promise<void> {
        return axios.delete(`http://localhost:3000/reports/${rid}`)
            .then(() => {
                return;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async closeReport(rid: number): Promise<void> {
        return axios.put(`http://localhost:3000/reports/close/${rid}`)
            .then(() => {
                return;
            })
            .catch((error) => {
                console.log(error);
            });
    }

}
