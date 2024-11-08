import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentServiceService } from '../service/data/department-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { departmentdata } from 'src/models/department';
import { DataBindingDirective, PageChangeEvent } from '@progress/kendo-angular-grid';
import { filterBy } from '@progress/kendo-data-query';
import { exportIcon, SVGIcon, trashIcon } from '@progress/kendo-svg-icons';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;
  public gridData: departmentdata[] = [];
  public gridView: departmentdata[]=[];
  
  public department: departmentdata [] = [];
  // public searchControl = new FormControl('');
  errorMessage: string='';
  selectedIds: number[] = [];
 
  public exporticon = { exportIcon: exportIcon };
  public trashIcon: SVGIcon = trashIcon;

  constructor(
    private service: DepartmentServiceService,
  
    private route: ActivatedRoute,
    private router: Router,
    
    private cdRef: ChangeDetectorRef,
    
    
  ) {}

  // pageChange(): void {
  //   // this.skip = event.skip;
  //   this.loadDepartmentData();
  // }




  ngOnInit(): void {
    this.loadDepartmentData();
    
  }

  export(): void {
    
  };
  trash(): void {
    console.log("Remove Rows");
                                                                                                                                                                               
  };

onSelectionChange(event: any): void {
  // Add new selected IDs
  event.selectedRows.forEach((row: any) => {
    const id = row.dataItem.id;
    if (!this.selectedIds.includes(id)) {
      this.selectedIds.push(id);
    }
  });

  event.deselectedRows.forEach((row: any) => {
    const id = row.dataItem.id;
    this.selectedIds = this.selectedIds.filter(selectedId => selectedId !== id);
  });

  console.log(this.selectedIds, 'Updated selectedIds after selection change');
}

// Method to delete selected rows
deleteSelectedRows(): void {
  if (this.selectedIds.length > 0) {
    console.log("Attempting to delete selected rows with IDs:", this.selectedIds);
    this.service.deleteSelectedRows(this.selectedIds).subscribe({
      next: () => {
        alert('Selected departments deleted');
        this.selectedIds = []; 
        this.loadDepartmentData();  
      },
      error: (err) => {
        alert(`Error: ${err}`);
      }
    });
  } else {
    alert('No rows selected');
  }
}

  loadDepartmentData(): void {
    this.service.getDepartmentData().subscribe((data: departmentdata[]) => {
      console.log("service: ",this.service);
      this.department = data;
      console.log("Data: ",this.department);

      this.gridData = data;
      this.gridView = data; 
    });
  }
  //------------------------------------------------------------------------
  
  onFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const inputValue = input?.value || '';
    console.log("Input Value:", inputValue);

    if (!inputValue) {
        this.gridView = [...this.gridData];
    } else {
        this.gridView = filterBy(this.gridData, {
            logic: 'or',
            filters: [
                { field: 'departmentName', operator: 'contains', value: inputValue },
                { field: 'rolesandWorkTypes', operator: 'contains', value: inputValue },
                { field: 'phoneNumber', operator: 'contains', value: inputValue },
            ],
        }) as departmentdata[];

        console.log("Filtered Data:", this.gridView);
    }

    // Reset the dataBinding skip
    this.dataBinding.skip = 0;

    // Manually trigger change detection
    this.cdRef.detectChanges();
}
  //--------------------------------------------------------------------------

  viewEmplyooes(){
  this.router.navigate(['/employees'],{relativeTo:this.route})
  };
 


  

  AddNewEmployee(): void{
    console.log("successfuly navigating");
  //   console.log("Add new department");
    this.router.navigate(['add'], { relativeTo: this.route });
    // this.router.navigate(['department/add']);
     
  }
  // AddNewEmployee() {
  //   console.log('Navigating to /add');
  //   this.router.navigate(['/add']).then(success => {
  //     if (success) {
  //       console.log('Successfully navigating to /add');
  //     } else {
  //       console.error('Navigation to /add failed');
  //     }
  //   }).catch(error => {
  //     console.error('Navigation error:', error);
  //   });
  // }
  


  editDepartment(id: number): void{
    console.log("Edit Department");
    this.router.navigate(['edit/',id], { relativeTo: this.route });
  }
 
  
  removeRow(id:number): void{
    console.log("Remove Row");
    this.service.deleteDepartmentData(id).subscribe({
    })
    window.location.reload();
    }
  
  
// onlogout(){
//   this.authservice.logout();
// }




}
