import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.html',
  styleUrls: ['./navigation.css'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive]
})
export class NavigationComponent {
}