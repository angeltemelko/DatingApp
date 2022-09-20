import { Component, Input, OnInit } from '@angular/core';
import { MemberDto } from 'src/app/_models/memberDto';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {
  @Input() member!: MemberDto;

  constructor() { }

  ngOnInit(): void {
  }

}
