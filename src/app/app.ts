import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent],
  template: `
    <app-navigation></app-navigation>
    <div class="container mt-4">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.css',
  standalone: true
})
export class App {
  protected readonly title = signal('micro-services');
}