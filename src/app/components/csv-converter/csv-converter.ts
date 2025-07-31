import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { EnvironmentService } from '../../services/environment.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-csv-converter',
  templateUrl: './csv-converter.html',
  styleUrls: ['./csv-converter.css'],
  standalone: true,
  imports: [NgIf, FormsModule, NgFor]
})
export class CsvConverterComponent {
  private http = inject(HttpClient);
  private environmentService = inject(EnvironmentService);
  
  selectedFile: File | null = null;
  outputFormat = 'json';
  delimiter = ',';
  hasHeader = true;
  errorMessage: string | null = null;
  isConverting = false;
  conversionResult: Blob | null = null;
  fileName = '';
  
  // Available output formats
  outputFormats = [
    { value: 'json', label: 'JSON' },
    { value: 'excel', label: 'Excel' },
    { value: 'html', label: 'HTML' },
    { value: 'xml', label: 'XML' }
  ];
  
  // Common delimiters
  delimiters = [
    { value: ',', label: 'Comma (,)' },
    { value: ';', label: 'Semicolon (;)' },
    { value: '\t', label: 'Tab' },
    { value: '|', label: 'Pipe (|)' },
    { value: ' ', label: 'Space' }
  ];
  
  onFileSelected(event: Event): void {
    this.errorMessage = null;
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Check if file is a CSV
      if (!file.name.toLowerCase().endsWith('.csv')) {
        this.errorMessage = 'Please select a CSV file.';
        return;
      }
      
      this.selectedFile = file;
      this.fileName = file.name.split('.')[0]; // Save the file name without extension
      this.conversionResult = null;
    }
  }
  
  convertCsv(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a CSV file.';
      return;
    }
    
    this.isConverting = true;
    this.errorMessage = null;
    this.conversionResult = null;
    
    // Get API URL from environment variables
    const domain = this.environmentService.apiUrl;
    const apiUrl = `${domain}/csv/convert`;
    
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('output_format', this.outputFormat);
    formData.append('delimiter', this.delimiter);
    formData.append('has_header', this.hasHeader.toString());
    
    // Make API call
    this.http.post(apiUrl, formData, {
      responseType: 'blob',
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          this.isConverting = false;
          if (event.body) {
            this.conversionResult = event.body;
          }
        }
      },
      error: (error) => {
        this.isConverting = false;
        this.errorMessage = 'Error converting CSV. Please try again.';
        console.error('CSV conversion error:', error);
      }
    });
  }
  
  downloadFile(): void {
    if (!this.conversionResult) return;
    
    let extension = this.outputFormat;
    // Adjust extension for certain formats
    if (this.outputFormat === 'excel') extension = 'xlsx';
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(this.conversionResult);
    link.download = `${this.fileName}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}