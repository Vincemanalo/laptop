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
import { AddempComponent } from '../../core/addemp/addemp.component';
import { UpdatesEmpComponent } from '../../core/updateemp/updateemp.component';
import { DeleteEmpComponent } from '../../core/deleteemp/deleteemp.component';
import { MatPaginatorModule } from '@angular/material/paginator';

interface Employee {
  employee: string;
  email: string;
  contact: string;
  employmentDate: Date;
  position: string;
  address: string;
  teamcolor: string;
}

@Component({
  selector: 'app-usermanagement',
  imports: [
    UpdatesEmpComponent,
    DeleteEmpComponent,
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    AddempComponent,
    MatPaginatorModule,
  ],
  templateUrl: './usermanagement.component.html',
  styleUrl: './usermanagement.component.css',
  standalone: true,
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = [
    'employee',
    'employmentDate',
    'email',
    'contact',
    'position',
    'address',
    'teamcolor',
    'actions',
  ];

  employees: Employee[] = [
    {
      employee: 'John Doe',
      email: 'johndoe@example.com',
      contact: '123-456-7890',
      employmentDate: new Date('2022-05-15'),
      position: 'Software Engineer',
      address: '123 Main St, New York, NY',
      teamcolor: 'Blue',
    },
    {
      employee: 'Jane Smith',
      email: 'janesmith@example.com',
      contact: '987-654-3210',
      employmentDate: new Date('2021-08-22'),
      position: 'Product Manager',
      address: '456 Oak St, San Francisco, CA',
      teamcolor: 'Green',
    },
    {
      employee: 'Michael Johnson',
      email: 'michaelj@example.com',
      contact: '555-123-4567',
      employmentDate: new Date('2020-11-10'),
      position: 'UX Designer',
      address: '789 Pine St, Chicago, IL',
      teamcolor: 'Red',
    },
    {
      employee: 'Emily Davis',
      email: 'emilyd@example.com',
      contact: '444-987-6543',
      employmentDate: new Date('2019-06-05'),
      position: 'Data Scientist',
      address: '321 Maple St, Seattle, WA',
      teamcolor: 'Yellow',
    },
    {
      employee: 'Robert Brown',
      email: 'robertb@example.com',
      contact: '222-333-4444',
      employmentDate: new Date('2023-01-17'),
      position: 'Cybersecurity Analyst',
      address: '654 Elm St, Austin, TX',
      teamcolor: 'Purple',
    },
    {
      employee: 'Robert Brown',
      email: 'robertb@example.com',
      contact: '222-333-4444',
      employmentDate: new Date('2023-01-17'),
      position: 'Cybersecurity Analyst',
      address: '654 Elm St, Austin, TX',
      teamcolor: 'Purple',
    },

    {
      employee: 'Robert Brown',
      email: 'robertb@example.com',
      contact: '222-333-4444',
      employmentDate: new Date('2023-01-17'),
      position: 'Cybersecurity Analyst',
      address: '654 Elm St, Austin, TX',
      teamcolor: 'Purple',
    },
    {
      employee: 'Robert Brown',
      email: 'robertb@example.com',
      contact: '222-333-4444',
      employmentDate: new Date('2023-01-17'),
      position: 'Cybersecurity Analyst',
      address: '654 Elm St, Austin, TX',
      teamcolor: 'Purple',
    },
    {
      employee: 'Robert Brown',
      email: 'robertb@example.com',
      contact: '222-333-4444',
      employmentDate: new Date('2023-01-17'),
      position: 'Cybersecurity Analyst',
      address: '654 Elm St, Austin, TX',
      teamcolor: 'Purple',
    },
    {
      employee: 'Robert Brown',
      email: 'robertb@example.com',
      contact: '222-333-4444',
      employmentDate: new Date('2023-01-17'),
      position: 'Cybersecurity Analyst',
      address: '654 Elm St, Austin, TX',
      teamcolor: 'Purple',
    },
    {
      employee: 'Robert Brown',
      email: 'robertb@example.com',
      contact: '222-333-4444',
      employmentDate: new Date('2023-01-17'),
      position: 'Cybersecurity Analyst',
      address: '654 Elm St, Austin, TX',
      teamcolor: 'Purple',
    },
    {
      employee: 'Robert Brown',
      email: 'robertb@example.com',
      contact: '222-333-4444',
      employmentDate: new Date('2023-01-17'),
      position: 'Cybersecurity Analyst',
      address: '654 Elm St, Austin, TX',
      teamcolor: 'Purple',
    },
    {
      employee: 'Robert Brown',
      email: 'robertb@example.com',
      contact: '222-333-4444',
      employmentDate: new Date('2023-01-17'),
      position: 'Cybersecurity Analyst',
      address: '654 Elm St, Austin, TX',
      teamcolor: 'Purple',
    },

  ];

  isModalOpen = false;
  isaddempModalOpen = false;
  iseditempModalOpen = false;
  isDeleteModalOpen = false;
  searchKeyword = '';
  pageNo = 1;
  pageSize = 10;
  isEditMode: any;
  selectedemployee: any = {};

  employee: any[] = [];
  employeeMap: { [key: string]: string } = {};

  constructor(private FeaturesService: FeaturesService) {}

  ngOnInit(): void {
    this.employees = this.getEmployees();
  }

  getEmployees(): Employee[] {
    return [
      {
        employee: 'John Doe',
        email: 'johndoe@example.com',
        contact: '123-456-7890',
        employmentDate: new Date('2022-05-15'),
        position: 'Software Engineer',
        address: '123 Main St, New York, NY',
        teamcolor: 'Blue',
      },
      {
        employee: 'Jane Smith',
        email: 'janesmith@example.com',
        contact: '987-654-3210',
        employmentDate: new Date('2021-08-22'),
        position: 'Product Manager',
        address: '456 Oak St, San Francisco, CA',
        teamcolor: 'Green',
      },
      {
        employee: 'Michael Johnson',
        email: 'michaelj@example.com',
        contact: '555-123-4567',
        employmentDate: new Date('2020-11-10'),
        position: 'UX Designer',
        address: '789 Pine St, Chicago, IL',
        teamcolor: 'Red',
      },
      {
        employee: 'Emily Davis',
        email: 'emilyd@example.com',
        contact: '444-987-6543',
        employmentDate: new Date('2019-06-05'),
        position: 'Data Scientist',
        address: '321 Maple St, Seattle, WA',
        teamcolor: 'Yellow',
      },
      {
        employee: 'Robert Brown',
        email: 'robertb@example.com',
        contact: '222-333-4444',
        employmentDate: new Date('2023-01-17'),
        position: 'Cybersecurity Analyst',
        address: '654 Elm St, Austin, TX',
        teamcolor: 'Purple',
      },
    ];
  }

    getEmployeeid(): void {
      this.FeaturesService.getAllEmployee().subscribe({
        next: (response: { _id: string; employeeName: string }[]) => {
          console.log('Employees response:', response);

          this.employee = response;
          this.employeeMap = response.reduce(
            (
              map: { [key: string]: string },
              employee: { _id: string; employeeName: string }
            ) => {
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

  getEmployeeName(_id: string): string {
    return this.employeeMap[_id] || 'Unknown';
  }

  filterEmployees(Employee: Employee): boolean {
    if (!this.searchKeyword.trim()) {
      return true; // If no search keyword, return all laptops
    }

    const keyword = this.searchKeyword.trim().toLowerCase();
    return (
      Employee.employee.toLowerCase().includes(keyword) ||
      Employee.email.toLowerCase().includes(keyword) ||
      Employee.contact.toLowerCase().includes(keyword) ||
      Employee.position.toLowerCase().includes(keyword) ||
      Employee.address.toLowerCase().includes(keyword) ||
      Employee.teamcolor.toLowerCase().includes(keyword)
    );
  }

  openModal(Employee?: any) {
    this.isModalOpen = true;
    if (Employee) {
    }
  }
  closeModal(): void {
    this.isModalOpen = false;
    this.getEmployees();
  }

  openeditempModal(employee?: any) {
    console.log('Edit button clicked'); // Check if function is triggered
    this.iseditempModalOpen = true;
    this.selectedemployee = employee; // Store the selected laptop
    console.log('Selected employee:', this.selectedemployee);
  }

  closeaddempModal(): void {
    this.isaddempModalOpen = false;
  }

  closeeditempModal(): void {
    this.iseditempModalOpen = false;
  }

  openDeleteEmpModal(employee?: any) {
    console.log('Delete button clicked'); // Check if function is triggered
    this.isDeleteModalOpen = true;
    this.selectedemployee = employee; // Store the selected laptop
    console.log('Selected Laptop:', this.selectedemployee);
  }

  closeDeleteEmpModal(): void {
    this.isDeleteModalOpen = false;
  }

  onSearch(): void {
    this.pageNo = 1; // Reset to first page on search
    this.getEmployees();
  }

  clearSearch(): void {
    this.searchKeyword = '';
  }
}
