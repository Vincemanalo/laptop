import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FeaturesService } from '../../features/features.service';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

interface Employee {
  _id: string;
  employeeName: string;
  employmentDate: Date;
  employmentPeriod: string;
  status: string;
}

@Component({
  selector: 'app-addemp',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    FormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ], changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './addemp.component.html',
  styleUrls: ['./addemp.component.css'],
  standalone: true,
})
export class AddempComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  employees: Employee[] = [];
  selectedEmployeeId: string = '';

  editEmployeeForm: FormGroup;
  isModalOpen: boolean = true;
  isAddEmployeeOpen: boolean = false;
  newEmployee: string = '';

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.featuresService.getAllEmployee().subscribe({
      next: (response) => {
        this.employees = response;
        console.log('Employees fetched:', this.employees);
      },
      error: (error) => console.error('Error fetching employees:', error),
    });
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private featuresService: FeaturesService
  ) {
    this.editEmployeeForm = this.fb.group({
      employeeName: ['', Validators.required],
      employmentDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      position: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  closeModal() {
    this.isModalOpen = false;
    this.closeModalEvent.emit();
  }

  onAssignedChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === 'add') {
      this.openAddEmployeeModal();
    }
  }

  openAddEmployeeModal() {
    this.isAddEmployeeOpen = true;
  }

  closeAddEmployeeModal() {
    this.isAddEmployeeOpen = false;
    this.newEmployee = '';
  }

  onSubmit() {
    if (this.editEmployeeForm.valid) {
      const laptopData = this.editEmployeeForm.value;
      console.log('Submitting:', laptopData);

      this.featuresService.addLaptop(laptopData).subscribe({
        next: (response) => {
          console.log('Laptop added successfully:', response);
          this.closeModal();
        },
        error: (error) => {
          console.error('Error adding laptop:', error);
        },
      });
    }
  }
}
