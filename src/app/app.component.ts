import { Component, OnDestroy } from '@angular/core';
import { LoadingService } from './core/services/loading.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  title = 'HackHub';

  isLoading = false;

  loadingSubscription?: Subscription;

  constructor(private loadingService: LoadingService){
    this.loadingSubscription = this.loadingService.isLoading$.subscribe({
      next: (value) => {
        setTimeout(() => this.isLoading = value);
      }
    })
  }

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe();
  }
}
