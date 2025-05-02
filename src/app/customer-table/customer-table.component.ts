import { CommonModule } from "@angular/common";
import { Component, DestroyRef, inject } from "@angular/core";
import { TableModule } from "primeng/table";
import { DialogService } from "primeng/dynamicdialog";
import { ButtonModule } from "primeng/button";
import { of, shareReplay, switchMap, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CustomerDialogComponent } from "../customer-dialog/customer-dialog.component";
import { CustomerService } from "../customer.service";

export interface Customer {
    id: number;
    name: string;
    email: string;
  }

@Component({
    selector: 'app-customer-table',
    templateUrl: './customer-table.component.html',
    standalone: true,
    providers: [DialogService],
    imports: [
      CommonModule,
      TableModule,
      ButtonModule,
    ],
  })
  export class CustomerTableComponent {
    private customerService = inject(CustomerService);
    private destroyRef = inject(DestroyRef);
    private dialogService = inject(DialogService);
  

    customers$ = this.customerService.getCustomers().pipe(
      shareReplay(1),
      tap((customers) => {
        console.log('Fetched customers:', customers);
      })
    );
  
    onRowSelect(event: any) {
      console.log('Row selected:', event.data);
      const dialogRef = this.dialogService.open(CustomerDialogComponent, {
        header: 'Edit Customer',
        inputValues: { customer: event.data },
        width: '400px',
      });
  
      dialogRef.onClose.pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((updatedCustomer: Customer) => {
          if (updatedCustomer) {
            return this.customerService.updateCustomer(updatedCustomer).pipe(
              tap(() => {
                console.log('Customer updated:', updatedCustomer);
              })
            );
          } else {
            return of(null);
          }
        }
      )).subscribe();


    }
  }
  