import { Component, OnInit,Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-comp',
  templateUrl: './modal-comp.component.html',
  styleUrls: ['./modal-comp.component.css']
})
export class ModalCompComponent implements OnInit {

  @Input('dataFromParent') public modalRef!: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

}