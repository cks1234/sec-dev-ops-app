import { Component ,OnInit,ViewChild,inject,ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Car } from '../car';
import { DataService } from '../services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit{
  @ViewChild('editdialog') editdialog!:ElementRef;
  car:Car = <Car>{};
  make:string = "";
  model:string = "";
  year:number = 0;
  color:string = "";

  private dataservice = inject(DataService);
  private toastr = inject(ToastrService);
  ngOnInit(): void {
      this.dataservice.currentcar$.subscribe({
        next: (data)=>{
         this.car = data;
         this.make = this.car.make || ''; 
         this.model = this.car.model || '';  
         this.year = this.car.year || 0;
         this.color = this.car.color || '';    
         }
      })
      
  }
  opendialog(){
   
    if (Object.keys(this.car).length !==0){
      this.editdialog.nativeElement.showModal();
    }else{
      this.toastr.error('Select and Item', 'Select an item to edit first.');
    }
  }
  closedialog(){
    this.editdialog.nativeElement.close();
  }
}
