import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../core/modallaptop/modal.component';
import { CommonModule } from '@angular/common';
import { FeaturesService } from '../features.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { UpdatesComponent } from '../../core/updates/updates.component';
import { DeleteComponent } from '../../core/delete/delete.component';

interface Laptop {
  laptopName: string;
  laptopSerialNumber: string;
  laptopDescription: string;
  laptopPurchaseDate: Date;
  laptopLocation: string;
  assignedTo: string;
  laptopCondition: string;
}

@Component({
  selector: 'app-laptop',
  imports: [
    ModalComponent,
    UpdatesComponent,
    DeleteComponent,
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
  ],
  templateUrl: './laptop.component.html',
  styleUrl: './laptop.component.css',
  standalone: true,
})
export class LaptopComponent implements OnInit {
  displayedColumns: string[] = [
    'laptopName',
    'laptopSerialNumber',
    'laptopDescription',
    'laptopPurchaseDate',
    'laptopLocation',
    'assignedTo',
    'laptopCondition',
    'actions',
  ];

  laptops: Laptop[] = [];

  // laptops: Laptop[] = [
  //   {
  //     id: 1,
  //     name: "HP Inspiron 3501 Series",
  //     purchasedDate: "December 20, 2021",
  //     serialNumber: "7KJ2PH3",
  //     description: "New Laptop Dell (Mat Black)",
  //     location: "1NK Center",
  //     assignedPersonnel: "Sir Benjie",
  //     condition: "Working",
  //     inspectionFrequency: "Quarterly",
  //     inspectedBy: "Pogi si Kim Carl Buban",
  //   },
  //   {
  //     id: 2,
  //     name: "Acer Inspiron 3501 Series",
  //     purchasedDate: "December 20, 2021",
  //     serialNumber: "7KJ2PH3",
  //     description: "New Laptop Dell (Mat Black)",
  //     location: "1NK Center",
  //     assignedPersonnel: "Sir Benjie",
  //     condition: "Working",
  //     inspectionFrequency: "Quarterly",
  //     inspectedBy: "Bolbi Cedric Lunar",
  //   },
  //   {
  //     id: 3,
  //     name: "Lenovo Inspiron 3501 Series",
  //     purchasedDate: "December 20, 2021",
  //     serialNumber: "7KJ2PH3",
  //     description: "New Laptop Dell (Mat Black)",
  //     location: "1NK Center",
  //     assignedPersonnel: "Sir Benjie",
  //     condition: "Working",
  //     inspectionFrequency: "Quarterly",
  //     inspectedBy: "Bolbi Cedric Lunar",
  //   },
  // ];
  isModalOpen = false;
  isEditModalOpen = false;
  isDeleteModalOpen = false;
  searchKeyword = '';
  pageNo = 1;
  pageSize = 10;
  isEditMode: any;
  selectedLaptop: any = {}; // Ensure it's never undefined

  employees: any[] = []; // Store employee data
  employeeMap: { [key: string]: string } = {}; // Map for quick lookup

  constructor(private FeaturesService: FeaturesService) {}

  ngOnInit(): void {
    this.getEmployees(); // Fetch employees first
    this.getLaptops();
  }

  getLaptops(): void {
    this.FeaturesService.getAllLaptop().subscribe({
      next: (response) => {
        console.log('API Response:', response);
  
        // Ensure we are accessing the "laptops" array
        if (response && response.laptops) {
          this.laptops = response.laptops.filter((laptop: Laptop) =>
            this.filterLaptops(laptop)
          );
        } else {
          this.laptops = []; // Handle case where there are no laptops
        }
  
        console.log('Filtered Laptops:', this.laptops);
      },
      error: (error) => console.error('Error fetching laptops:', error),
    });
  }
  

  // Fetch all employees and create a map of ID -> Name
  getEmployees(): void {
    this.FeaturesService.getAllEmployee().subscribe({
      next: (response: { _id: string; employeeName: string }[] | { data: { _id: string; employeeName: string }[] }) => {
        console.log('Employees response:', response);
        
        // Determine if response is an array or an object with a data property.
        const employeeArray = Array.isArray(response) ? response : response?.data ?? [];
  
        // Optionally, log employeeArray to verify its contents.
        console.log('Employee Array:', employeeArray);
  
        // Use an empty array if employeeArray is undefined or null
        this.employees = employeeArray;
  
        // Only call reduce if employeeArray is defined, otherwise default to an empty object.
        this.employeeMap = (employeeArray || []).reduce(
          (map: { [key: string]: string }, employee: { _id: string; employeeName: string }) => {
            map[employee._id] = employee.employeeName;
            return map;
          },
          {}
        );
        console.log('Employee Map:', this.employeeMap);
      },
      error: (error) => console.error('Error fetching employees:', error),
    });
  }
    
  // Helper method to get Employee Name from ID
  getEmployeeName(_id: string): string {
    return this.employeeMap[_id] || 'Unknown';
  }

  // Search filter function
  filterLaptops(laptop: Laptop): boolean {
    if (!this.searchKeyword.trim()) {
      return true; // If no search keyword, return all laptops
    }
    
    const keyword = this.searchKeyword.trim().toLowerCase();
    return (
      laptop.laptopName.toLowerCase().includes(keyword) ||
      laptop.laptopSerialNumber.toLowerCase().includes(keyword) ||
      laptop.laptopDescription.toLowerCase().includes(keyword) ||
      laptop.laptopLocation.toLowerCase().includes(keyword) ||
      laptop.assignedTo.toLowerCase().includes(keyword) ||
      laptop.laptopCondition.toLowerCase().includes(keyword)
    );
  }

  // getLaptops(): void {
  //   const keyword = this.searchKeyword.trim().toLowerCase();

  //   if (keyword) {
  //     // Filter the laptops based on the search keyword
  //     this.laptops = this.laptops.filter(
  //       (laptop) =>
  //         laptop.name.toLowerCase().includes(keyword) ||
  //         laptop.serialNumber.toLowerCase().includes(keyword) ||
  //         laptop.description.toLowerCase().includes(keyword) ||
  //         laptop.location.toLowerCase().includes(keyword) ||
  //         laptop.assignedPersonnel.toLowerCase().includes(keyword) ||
  //         laptop.condition.toLowerCase().includes(keyword) ||
  //         laptop.inspectionFrequency.toLowerCase().includes(keyword) ||
  //         laptop.inspectedBy.toLowerCase().includes(keyword)
  //     );
  //   } else {
  //     // If no search keyword, reset to mock data
  //     this.laptops = [
  //       {
  //         id: 1,
  //         name: "HP Inspiron 3501 Series",
  //         purchasedDate: "December 20, 2021",
  //         serialNumber: "7KJ2PH3",
  //         description: "New Laptop Dell (Mat Black)",
  //         location: "1NK Center",
  //         assignedPersonnel: "Sir Benjie",
  //         condition: "Working",
  //         inspectionFrequency: "Quarterly",
  //         inspectedBy: "Pogi si Kim Carl Buban",
  //       },
  //       {
  //         id: 2,
  //         name: "Acer Inspiron 3501 Series",
  //         purchasedDate: "December 20, 2021",
  //         serialNumber: "7KJ2PH3",
  //         description: "New Laptop Dell (Mat Black)",
  //         location: "1NK Center",
  //         assignedPersonnel: "Sir Benjie",
  //         condition: "Working",
  //         inspectionFrequency: "Quarterly",
  //         inspectedBy: "Bolbi Cedric Lunar",
  //       },
  //       {
  //         id: 3,
  //         name: "Lenovo Inspiron 3501 Series",
  //         purchasedDate: "December 20, 2021",
  //         serialNumber: "7KJ2PH3",
  //         description: "New Laptop Dell (Mat Black)",
  //         location: "1NK Center",
  //         assignedPersonnel: "Sir Benjie",
  //         condition: "Working",
  //         inspectionFrequency: "Quarterly",
  //         inspectedBy: "Bolbi Cedric Lunar",
  //       },
  //     ];
  //   }
  // }

  openModal(laptop?: any) {
    this.isModalOpen = true;
    if (laptop) {
      // handle the laptop data
    }
  }
  closeModal(): void {
    this.isModalOpen = false;
    this.getLaptops();
  }

  openEditModal(laptop?: any) {
    console.log('Edit button clicked'); // Check if function is triggered
    this.isEditModalOpen = true;
    this.selectedLaptop = laptop; // Store the selected laptop
    console.log('Selected Laptop:', this.selectedLaptop);
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  openDeleteModal(laptop?: any) {
    console.log('Delete button clicked'); // Check if function is triggered
    this.isDeleteModalOpen = true;
    this.selectedLaptop = laptop; // Store the selected laptop
    console.log('Selected Laptop:', this.selectedLaptop);
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
  }

  onSearch(): void {
    this.pageNo = 1; // Reset to first page on search
    this.getLaptops();
  }

  clearSearch(): void {
    this.searchKeyword = '';
    // this.getLaptops();
  }
}
