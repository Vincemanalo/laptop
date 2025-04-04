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
  desktopSerialNumber: string;
  desktopPurchaseDate: Date;
  assignedTo: string;
  desktopCondition: string;
  employeeName: string;
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
      desktopSerialNumber: ["", Validators.required],
      desktopPurchaseDate: ["", Validators.required],
      assignedTo: ["", [Validators.maxLength(50)]],
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
      const DesktopData = this.editDesktopForm.value;
      console.log("Submitting:", DesktopData);

      this.featuresService.addLaptop(DesktopData).subscribe({
        next: (response) => {
          console.log("Desktop added successfully:", response);
          this.closeModal();
        },
        error: (error) => {
          console.error("Error adding Desktop:", error);
        },
      });
    }
  }
}
