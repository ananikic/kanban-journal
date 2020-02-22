import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-group',
  templateUrl: './home-group.component.html',
  styleUrls: ['./home-group.component.scss']
})
export class HomeGroupComponent implements OnInit {

  groupId: string;

  constructor( private route: ActivatedRoute) { }

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('id');
    if (!this.groupId) {
      this.groupId === '#first'
    }
  }

}
