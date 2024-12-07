import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cat } from './cat.fact.model';

@Injectable({ providedIn: 'root' })
export class CatService {
  private cat: Cat = { fact: '', length: 0 }; // Default cat object
  private catUpdated = new Subject<Cat>();

  constructor(private http: HttpClient) {}

  // Fetch a random cat fact
  getCat() {
    this.http.get<{ fact: string; length: number }>('https://catfact.ninja/fact').subscribe(
      (response) => {
        this.cat = { fact: response.fact, length: response.length }; // Create Cat object
        this.catUpdated.next(this.cat); // Notify observers with the updated cat
      },
      (error) => console.error('API Error:', error) // Log errors
    );
  }

  // Observable for updated cat data
  getUpdatedCat() {
    return this.catUpdated.asObservable();
  }
}
