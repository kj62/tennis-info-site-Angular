import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class RestapiService {
    constructor(public httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    getRanking<T>(url) {
        return this.httpClient.get<Array<T>>(url);
    }

    getPlayers<T>(url) {
        return this.httpClient.get<Array<T>>(url);
    }

    getTournaments<T>(url) {
        return this.httpClient.get<Array<T>>(url);
    }

    getTechnique<T>(url) {
        return this.httpClient.get<Array<T>>(url);
    }
}