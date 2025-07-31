import { Routes } from '@angular/router';
import { ImageConverterComponent } from './components/image-converter/image-converter';
import { SummarizerComponent } from './components/summarizer/summarizer';
import { CsvConverterComponent } from './components/csv-converter/csv-converter';

export const routes: Routes = [
  { path: '', redirectTo: '/convert', pathMatch: 'full' },
  { path: 'convert', component: ImageConverterComponent },
  { path: 'summarize', component: SummarizerComponent },
  { path: 'csv', component: CsvConverterComponent }
];