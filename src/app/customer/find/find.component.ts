import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../shared/customer.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-find',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './find.component.html',
  styleUrl: './find.component.scss',
})
export class FindComponent {
  searchForm: FormGroup;
  isButtonDisabled = true;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService
  ) {
    this.searchForm = this.fb.group({
      documentType: ['', Validators.required],
      documentNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(11),
        ],
      ],
    });
  }

  onInputChange() {
    console.log(this.searchForm.controls['documentNumber'].errors);

    this.isButtonDisabled = !this.searchForm.valid;
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const { documentType, documentNumber } = this.searchForm.value;
      this.customerService
        .getCustomer(documentType, documentNumber)
        .subscribe((customer) => {
          console.log(customer);
          localStorage.setItem('customer', JSON.stringify(customer));
          this.router.navigate(['/results']);
        });
    }
  }
}
