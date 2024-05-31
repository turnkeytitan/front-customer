import { Component } from '@angular/core';
import { Customer } from '../shared/customer.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent {
  customer: Customer | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    const customer = localStorage.getItem('customer');
    console.log(JSON.parse(customer!));

    if (customer) {
      this.customer = JSON.parse(customer);
    }
  }

  goBack() {
    this.router.navigate(['/search']);
  }
}
