import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
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
  selector: 'app-updatesemp',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './updateemp.component.html',
  styleUrls: ['./updateemp.component.css'],
  standalone: true,
})
export class UpdatesEmpComponent implements OnChanges {
  @Input() selectedEmployee: any = {}; // Receive data from parent component
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() refreshTableEvent = new EventEmitter<void>(); // Emit event to parent
  employees: Employee[] = []; // Store employees
  //  data
  selectedEmployeeId: string = ''; // Store selected employee ID
  editEmployeeForm!: FormGroup;
  isEditModalOpen: boolean = true;
  isAddEmployeeOpen: boolean = false; // For Add Employee modal
  newEmployee: string = '';

  locations: string[] = ['New Office', '1NK Center']; // Example locations
  ngOnInit(): void {
    this.getEmployees();
  }

  // Fetch employees from backend
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
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedEmployee'] && this.selectedEmployee) {
      this.updateForm();
    }
  }

  updateForm() {
    if (this.selectedEmployee) {
      this.editEmployeeForm.patchValue({
        employeeName: this.selectedEmployee.employeeName || '',
        employmentDate: this.selectedEmployee.employmentDate || '',
        });
    }
  }

  closeModal() {
    this.isEditModalOpen = false;
    this.closeModalEvent.emit();
  }

  openEditEmployeeModal() {
    this.isEditModalOpen = true;
  }

  closeEditEmployeeModal() {
    this.isEditModalOpen = false;
    this.closeModalEvent.emit();
    this.newEmployee = '';
  }

  addEmployee() {
    if (this.newEmployee) {
      console.log('New Employee:', this.newEmployee);
      this.closeEditEmployeeModal();
    }
  }

  onSubmit() {
    if (this.editEmployeeForm.valid) {
      const employeeData = this.editEmployeeForm.value;
      console.log('Submitting:', employeeData);

      this.featuresService
        .updateEmployee(this.selectedEmployee._id, employeeData)
        .subscribe({
          next: (response) => {
            console.log(this.selectedEmployee._id);
            console.log('Employee edited successfully:', response);
            this.refreshTableEvent.emit(); // Emit event to refresh table
            this.closeModal();
          },
          error: (error) => {
            console.error('Error editing employee:', error);
          },
        });
    }
  }
}
