import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MemberDto } from 'src/app/_models/memberDto';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  member$!: Observable<MemberDto>;

  constructor(
    private _memberService: MemberService,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.member$ = this._route.params.pipe(
      switchMap((param: Params) => this._memberService.getMember(param['username']))
    )
  }

}
