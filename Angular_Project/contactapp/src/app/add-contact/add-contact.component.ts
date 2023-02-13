import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public loading:boolean = false;
  public contact:MyContact = {} as MyContact
  public errorMessage:string | null = null;
  public groups:MyGroup[] = [] as MyGroup[];


  constructor(private contService:ContactService, private router:Router) { }



  ngOnInit(): void {
    this.contService.getAllGroups().subscribe((data:MyGroup[])=>{
      this.groups = data;
    },(error)=>{
      this.errorMessage = error;
    })
  }
  public addSubmit(){
    this.contService.CreateContacts(this.contact).subscribe((data:MyContact)=>{
      this.router.navigate(['/']).then();
    },(error)=>{
      this.errorMessage = error;
      this.router.navigate(['/contacts/add']).then();
    })
  }
}
