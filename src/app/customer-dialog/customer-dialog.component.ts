import { Component, effect, inject, input, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { Customer } from "../customer-table/customer-table.component";


@Component({
    selector: 'app-customer-dialog',
    templateUrl: './customer-dialog.component.html',
    standalone: true,
    imports: [CommonModule, InputTextModule, ButtonModule],
    providers: [ReactiveFormsModule],
  })
  export class CustomerDialogComponent implements OnInit {
    dialogRef = inject(DynamicDialogRef);

    $customer = input<Customer>({ id: 0, name: '', email: '' }, { alias: 'customer' });
  
    customerForm = new FormGroup({
      name: new FormControl(this.$customer().name, [Validators.required]),
      email: new FormControl(this.$customer().email, [Validators.required, Validators.email]),
    });
    constructor() {
      effect(() => {
        if (this.$customer()) {
          this.customerForm.patchValue({
            name: this.$customer().name,
            email: this.$customer().email,
          });
        } 
      }
      )}
  
    ngOnInit() {
      const customer = this.$customer();

  
    }
  
    save() {
      if (this.customerForm.valid) {
        console.log('Form is valid:', this.customerForm.value);
        const updated = { ...this.$customer(), ...this.customerForm.value };
        this.dialogRef.close(updated);
      } else {
        console.log('Form is invalid:', this.customerForm.errors);
      }
    }
    onHide() {
      this.dialogRef.close(null);
    }
  

  }
  