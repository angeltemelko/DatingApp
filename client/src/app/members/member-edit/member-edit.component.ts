import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { MemberDto } from 'src/app/_models/memberDto';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  member$!: Observable<MemberDto>;

  constructor(private _accountService: AccountService, private _memberService: MemberService) { }

  ngOnInit(): void {
    this.member$ = this._accountService.currentUser$.pipe(
      tap((user: User | null) => console.log(user!.userName)),
      switchMap((user) => this._memberService.getMember(user!.userName))
    );
  }

}
