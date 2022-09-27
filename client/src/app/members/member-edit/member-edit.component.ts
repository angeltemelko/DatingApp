import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  @ViewChild("editForm") editForm!: NgForm;
  member$!: Observable<MemberDto>;

  @HostListener('window:beforeunload', ['$event']) onBeforeUnload($event: Event) {
    if(this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private _accountService: AccountService,
              private _memberService: MemberService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.member$ = this._accountService.currentUser$.pipe(
      tap((user: User | null) => console.log(user!.userName)),
      switchMap((user) => this._memberService.getMember(user!.userName))
    );
  }

  updateMember(member: MemberDto) {
    this._memberService.updateMember(member).subscribe(() => {
      this.editForm.reset(member);
      this.toastr.success('Profile updated successfully')
    })
  }
}
