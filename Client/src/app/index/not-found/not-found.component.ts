import { Component, OnInit } from '@angular/core';
import { SwalService } from 'src/app/shared/swal.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  constructor(private toast:SwalService) { }

  ngOnInit(): void {
  }


}
