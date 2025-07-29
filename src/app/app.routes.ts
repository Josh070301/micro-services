import { Routes } from '@angular/router';
import { ImageConverterComponent } from './components/image-converter/image-converter';
import { SummarizerComponent } from './components/summarizer/summarizer';

export const routes: Routes = [
  { path: '', redirectTo: '/convert', pathMatch: 'full' },
  { path: 'convert', component: ImageConverterComponent },
  { path: 'summarize', component: SummarizerComponent }
];