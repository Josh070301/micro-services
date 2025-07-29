import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../../services/environment.service';

@Component({
  selector: 'app-summarizer',
  templateUrl: './summarizer.html',
  styleUrls: ['./summarizer.css'],
  standalone: true,
  imports: [NgIf, FormsModule]
})
export class SummarizerComponent {
  private http = inject(HttpClient);
  private environmentService = inject(EnvironmentService);
  
  inputText = '';
  summaryLength = 'medium';
  summaryResult: string | null = null;
  errorMessage: string | null = null;
  isProcessing = false;

  summarizeText(): void {
    if (!this.inputText || this.inputText.length < 100) {
      this.errorMessage = 'Please enter at least 100 characters for a meaningful summary.';
      return;
    }
    
    this.isProcessing = true;
    this.errorMessage = null;
    this.summaryResult = null;
    
    // Determine max length based on summary length preference
    let maxLength = Math.floor(this.inputText.length * 0.5); // default medium
    if (this.summaryLength === 'short') maxLength = Math.floor(this.inputText.length * 0.25);
    else if (this.summaryLength === 'long') maxLength = Math.floor(this.inputText.length * 0.75);
    
    // Ensure maxLength is at least 30
    maxLength = Math.max(maxLength, 30);
    
    // Get API URL from environment variables
    const domain = this.environmentService.apiUrl;
    const apiUrl = `${domain}/documents/summarize`;
    
    // Prepare request payload
    const payload = {
      text: this.inputText,
      max_length: maxLength,
      min_length: 30
    };
    console.log("PayLoad: ", payload)
    
    // Make API call
    this.http.post<any>(apiUrl, payload).subscribe({
      next: (response) => {
        this.isProcessing = false;
        if (response && response.summary) {
          this.summaryResult = response.summary;
        } else {
          this.errorMessage = 'Received an invalid response from the server.';
        }
      },
      error: (error) => {
        this.isProcessing = false;
        this.errorMessage = 'Error generating summary. Please try again.';
        console.error('Summary generation error:', error);
      }
    });
  }

  copyToClipboard(): void {
    if (!this.summaryResult) return;
    
    navigator.clipboard.writeText(this.summaryResult)
      .then(() => {
        alert('Summary copied to clipboard!');
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  }
}