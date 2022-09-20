import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberDto } from 'src/app/_models/memberDto';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  members$: Observable<MemberDto[]> | undefined;

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.members$ = this.memberService.getMembers();
  }

}
