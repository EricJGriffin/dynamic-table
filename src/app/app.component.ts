import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomerTableComponent } from './customer-table/customer-table.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomerTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'customer-table';
}
