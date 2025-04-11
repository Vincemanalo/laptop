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
  selector: "app-modal",
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
  ], changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./modaldesktop.component.html",
  styleUrls: ["./modaldesktop.component.css"],
  standalone: true,
})
export class ModalDesktopComponent {
  @Output() closeModalEvent = new EventEmitter<void>();

  employees: Employee[] = []; // Store employees data
  selectedEmployeeId: string = ""; // Store selected employee ID
  editDesktopForm: FormGroup;
  isModalOpen: boolean = true;
  isAddEmployeeOpen: boolean = false; // For Add Employee modal
  newEmployee: string = "";



  ngOnInit(): void {
    this.getEmployees();

    console.log("Form Initial Validity:", this.editDesktopForm.valid);
    this.editDesktopForm.statusChanges.subscribe(status => {
      console.log("Form Status Changed:", status);
    });  
  }

  // Fetch employees from backend
  getEmployees(): void {
    this.featuresService.getAllEmployee().subscribe({
      next: (response) => {
        console.log("Raw API Response:", response); // Debugging
        this.employees = response.employees ; 
        console.log("Employees after assignment:", this.employees);
      },
      error: (error) => console.error("Error fetching employees:", error),
    });
  }  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private featuresService: FeaturesService
  ) {
    this.editDesktopForm = this.fb.group({
      desktopName: ["", Validators.required],
      desktopSerialNumber: ["", Validators.required],
      desktopModel: ["", [Validators.maxLength(50)]],
      desktopProcessor: ["", Validators.required],
      desktopRam: ["", Validators.required],
      desktopStorage: ["", Validators.required],
      desktopPurchaseDate: ["", Validators.required],
      desktopLocation: ["", Validators.required],
      desktopAssignedTo: [null, Validators.required],
      desktopCondition: ["", Validators.required],
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
    if (this.editDesktopForm.valid) {
      const desktopData = this.editDesktopForm.value;
      console.log("Submitting:", desktopData);
  
      this.featuresService.addDesktop(desktopData).subscribe({
        next: (response) => {
          console.log("Desktop added successfully:", response);
          alert(response.message || 'Desktop added successfully.');
          this.closeModal();
        },
        error: (error) => {
          console.error("Error adding desktop:", error);
          // Show alert with message from backend
          alert(error.message || 'An unexpected error occurred.');
        },
      });
    }
  }  
}
