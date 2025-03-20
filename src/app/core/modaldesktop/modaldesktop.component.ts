import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FeaturesService } from "../../features/features.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";

interface Employee {
  _id: string;
  employeeName: string;
  employmentDate: Date;
  employmentPeriod: string;
  status: string;
}

@Component({
  selector: "app-modal-desktop",
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ], 
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./modaldesktop.component.html",
  styleUrls: ["./modaldesktop.component.css"],
  standalone: true,
})
export class ModalDesktopComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  employees: Employee[] = []; // Store employees data
  selectedEmployeeId: string = ""; // Store selected employee ID

  editDesktopForm: FormGroup; // Corrected form name
  isModalOpen: boolean = true;
  isAddEmployeeOpen: boolean = false; // For Add Employee modal
  newEmployee: string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private featuresService: FeaturesService
  ) {
    // Fixed form initialization
    this.editDesktopForm = this.fb.group({
      desktopName: ["", Validators.required],
      desktopSerialNumber: ["", Validators.required],
      desktopDescription: ["", [Validators.maxLength(50)]],
      desktopPurchaseDate: ["", Validators.required],
      desktopLocation: ["", Validators.required],
      assignedTo: [""],
      desktopCondition: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  // Fetch employees from backend
  getEmployees(): void {
    this.featuresService.getAllEmployee().subscribe({
      next: (response) => {
        this.employees = response;
        console.log("Employees fetched:", this.employees);
      },
      error: (error) => console.error("Error fetching employees:", error),
    });
  }

  // Close main modal
  closeModal() {
    this.isModalOpen = false;
    this.closeModalEvent.emit();
  }

  onAssignedChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === "add") {
      this.openAddEmployeeModal();
    }
  }

  openAddEmployeeModal() {
    this.isAddEmployeeOpen = true;
  }

  closeAddEmployeeModal() {
    this.isAddEmployeeOpen = false;
    this.newEmployee = "";
  }

  onSubmit() {
    if (this.editDesktopForm.valid) {
      const desktopData = this.editDesktopForm.value;
      console.log("Submitting:", desktopData);

      this.featuresService.addLaptop(desktopData).subscribe({
        next: (response) => {
          console.log("Desktop added successfully:", response);
          this.closeModal();
        },
        error: (error) => {
          console.error("Error adding desktop:", error);
        },
      });
    }
  }
}
