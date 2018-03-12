import { Component, OnInit } from '@angular/core';

declare var NCMB: any;
@Component({
  selector: 'mi-push-edit',
  templateUrl: './push-edit.component.html',
  styleUrls: ['./push-edit.component.scss']
})
export class PushEditComponent implements OnInit {
  ncmb = new NCMB('6bd8058cbda8e2aa448c573d4e4e99e720043297687f3e809965040d12a1a42e',
      'df5ed64b51406dd6d254abece09f56e685f38862dbdc5c2ebefdfeec7588ac98');
  push = new this.ncmb.Push();
  user = new this.ncmb.User();
  push_title = '';
  push_message = '';

  constructor() { }

  ngOnInit() {
  }

  newPush() {
    this.push.set('immediateDeliveryFlag', true)
        .set('title', this.push_title)
        .set('message', this.push_message)
        .set('sound', 'default')
        .set('target', ['ios']);
    this.push.send()
        .then((push) => {
          // 送信後処理
          alert('新規プッシュ通知が作成されました。');
        })
        .catch((err) => {
          // エラー処理
          alert(err);
          alert('プッシュ通知作成時にエラーが発生しました。');
        });
  }

}
