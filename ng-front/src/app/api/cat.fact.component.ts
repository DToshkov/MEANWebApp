import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf
import { Subscription } from 'rxjs';
import { Cat } from './cat.fact.model';
import { CatService } from './cat.fact.service';

@Component({
  selector: 'app-api',
  templateUrl: './cat.fact.component.html',
  styleUrls: ['./cat.fact.component.css'],
  standalone: true,
  imports: [CommonModule], // Add CommonModule here
})
export class CatComponent implements OnInit, OnDestroy {
  cat: Cat = { fact: '', length: 0 };
  private catSub: Subscription;

  constructor(private catService: CatService) {
    this.catSub = new Subscription();
  }

  ngOnInit() {
    this.catService.getCat(); // Fetch initial cat fact
    this.catSub = this.catService.getUpdatedCat().subscribe((cat: Cat) => {
      console.log('Updated Cat:', cat); // Debugging
      this.cat = cat; // Update the component's cat object
    });
  }

  ngOnDestroy() {
    this.catSub.unsubscribe(); // Prevent memory leaks
  }
}
