import { Component, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { EnvironmentService } from '../../services/environment.service';

@Component({
  selector: 'app-image-converter',
  templateUrl: './image-converter.html',
  styleUrls: ['./image-converter.css'],
  standalone: true,
  imports: [NgIf, NgFor, FormsModule]
})
export class ImageConverterComponent {
  private http = inject(HttpClient);
  private environmentService = inject(EnvironmentService);

  selectedFiles: File[] = [];
  selectedFormat = 'webp';
  quality = 80;
  previewUrl: string | null = null;
  errorMessage: string | null = null;
  isConverting = false;
  conversionResult: Blob | null = null;
  
  // Supported file extensions
  private supportedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff', 'tif', 'svg', 'heic'];
  
  onFilesSelected(event: Event): void {
    this.errorMessage = null;
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      // Check if all files have valid extensions
      const files = Array.from(input.files);
      const invalidFiles = files.filter(file => !this.hasValidExtension(file.name));
      
      if (invalidFiles.length > 0) {
        this.errorMessage = `Invalid file format(s): ${invalidFiles.map(f => f.name).join(', ')}. 
          Supported formats: ${this.supportedExtensions.join(', ')}`;
        return;
      }
      
      this.selectedFiles = files;
      this.conversionResult = null;
    }
  }
  
  private hasValidExtension(filename: string): boolean {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    return this.supportedExtensions.includes(extension);
  }
  
  removeFile(index: number): void {
    this.selectedFiles = this.selectedFiles.filter((_, i) => i !== index);
    if (this.selectedFiles.length === 0) {
      this.conversionResult = null;
    }
  }
  
  convertImages(): void {
    if (!this.selectedFiles.length) {
      this.errorMessage = 'Please select at least one image file.';
      return;
    }
    
    this.isConverting = true;
    this.errorMessage = null;
    this.conversionResult = null;
    
    // Get API URL from environment variables
    const domain = this.environmentService.apiUrl
    const apiUrl = `${domain}/images/convert-format`;
    console.log('Calling: ', apiUrl)
    const formData = new FormData();
    
    // Append each file to formData
    this.selectedFiles.forEach(file => {
      formData.append('images', file);
    });
    
    // Add target format and quality
    formData.append('target_format', this.selectedFormat);
    formData.append('quality', this.quality.toString());
    
    // Make API call
    this.http.post(apiUrl, formData, {
      responseType: 'blob',
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          console.log('Response: ', event)
          this.isConverting = false;
          if (event.body) {
            this.conversionResult = event.body;
          }
        }
      },
      error: (error) => {
        this.isConverting = false;
        this.errorMessage = 'Error converting images. Please try again.';
        console.error('Image conversion error:', error);
      }
    });
  }
  
  downloadZip(): void {
    if (!this.conversionResult) return;
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(this.conversionResult);
    link.download = `converted-images-${this.selectedFormat}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}