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
  selector: "app-modal-server",
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
  templateUrl: "./modalserver.component.html",
  styleUrls: ["./modalserver.component.css"],
  standalone: true,
})
export class ModalserverComponent {
  @Output() closeModalEvent = new EventEmitter<void>();

  employees: Employee[] = []; // Store employees data
  server: any = {};
  selectedEmployeeId: string = ""; // Store selected employee ID
  // Changed the form group name from editLaptopForm to editServerForm
  editServerForm: FormGroup;
  isModalOpen: boolean = true;
  isAddEmployeeOpen: boolean = false; // For Add Employee modal
  newEmployee: string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private featuresService: FeaturesService
  ) {
    // Updated form group with new control names matching the HTML ids and formControlName values
    this.editServerForm = this.fb.group({
      serverSerialNumber: ["", Validators.required],
      serverPurchaseDate: ["", Validators.required],
      serverLocation: ["", Validators.required],
      serverassignedTo: [null, Validators.required],
      serverStatus: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.getEmployees();

    console.log("Form Initial Validity:", this.editServerForm.valid);
    this.editServerForm.statusChanges.subscribe(status => {
      console.log("Form Status Changed:", status);
    });
  }

  // Fetch employees from backend
  getEmployees(): void {
    this.featuresService.getAllEmployee().subscribe({
      next: (response) => {
        console.log("Raw API Response:", response); // Debugging
        this.employees = response.employees;
        console.log("Employees after assignment:", this.employees);
      },
      error: (error) => console.error("Error fetching employees:", error),
    });
  }

  isOpen = false;

  openModal() {
    this.isOpen = true;
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
    if (this.editServerForm.valid) {
      const serverData = this.editServerForm.value;
      console.log("Submitting:", serverData);

      // Assuming a service method exists for adding a server.
      this.featuresService.addLaptop(serverData).subscribe({
        next: (response) => {
          console.log("Server added successfully:", response);
          this.closeModal();
        },
        error: (error) => {
          console.error("Error adding server:", error);
        },
      });
    }
  }
}
