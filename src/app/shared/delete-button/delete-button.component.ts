import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent implements OnInit {

  canDelete: boolean = false;
  @Output() delete = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  deleteSomething() {
    this.delete.emit(true);
    this.canDelete = false;
  }

  prepareForDelete() {
    this.canDelete = true;
  }

  cancel() {
    this.canDelete = false;
  }

}
