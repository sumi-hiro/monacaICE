import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Router } from '@angular/router';

declare var NCMB: any;

@Component({
  selector: 'mi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mi';
  deviceReady = false;
  ncmb: any;
  push: any;
  push_message = '';
  user: any;
  loginUser = '';
  userName = '';
  passWord = '';
  newUserName = '';
  newPassWord = '';

  constructor(
    private router: Router
  ) {
    // APIキーの設定とSDK初期化
    console.log('NCMB: ', NCMB);
    const ncmb = new NCMB('6bd8058cbda8e2aa448c573d4e4e99e720043297687f3e809965040d12a1a42e',
      'df5ed64b51406dd6d254abece09f56e685f38862dbdc5c2ebefdfeec7588ac98');
    // ↓　ここにサンプルコードを実装　↓
    // 保存先クラスの作成
    const TestClass = ncmb.DataStore('TestClass');

    // 保存先クラスのインスタンスを生成
    const testClass = new TestClass();

    // 値を設定と保存
    testClass.set('message', 'Hello, NCMB!')
      .save()
      .then(function (object) {
        // 保存に成功した場合の処理

      })
      .catch(function (err) {
        // 保存に失敗した場合の処理

      });

    Observable.fromEvent(document, 'deviceready')
      .subscribe(() => {
    // document.addEventListener('deviceready', () => {
      this.deviceReady = true;
      console.log('deviceready!!');
      alert('deviceready!!');
      // ここから---------------プラグインの README.md を参考に--------------
      NCMB.monaca.setDeviceToken(
        '6bd8058cbda8e2aa448c573d4e4e99e720043297687f3e809965040d12a1a42e',
        'df5ed64b51406dd6d254abece09f56e685f38862dbdc5c2ebefdfeec7588ac98',
        '#####sender_id#####'
      );

      // Set callback for push notification data.
      NCMB.monaca.setHandler(function(jsonData) {
          alert('callback :::' + JSON.stringify(jsonData));
      });

      // Get installation ID.
      NCMB.monaca.getInstallationId(function(installationId) {
          // something
      });

      // Get receipt status
      NCMB.monaca.getReceiptStatus(function(status) {
          // status = true or false
      });

      // Set receipt status
      NCMB.monaca.setReceiptStatus(true);
      // ここまで---------------プラグインの README.md を参考に--------------
        // // プッシュ通知受信時のコールバックを登録します
        // window.NCMB.monaca.setHandler
        // (
        //     function(jsonData) {
        //         // 送信時に指定したJSONが引数として渡されます
        //         alert('callback :::' + JSON.stringify(jsonData));
        //     }
        // );

        // const successCallback = function () {
        //     // 端末登録後の処理
        // };
        // const errorCallback = function (err) {
        //     // 端末登録でエラーが発生した場合の処理
        // };
        // // デバイストークンを取得してinstallation登録が行われます
        // // ※ YOUR_APPLICATION_KEY,YOUR_CLIENT_KEYはニフクラ mobile backendから発行されたAPIキーに書き換えてください
        // // ※ YOUR_SENDER_IDはFCMでプロジェクト作成時に発行されたSender ID(送信者ID)に書き換えてください
        // window.NCMB.monaca.setDeviceToken(
        //     '6bd8058cbda8e2aa448c573d4e4e99e720043297687f3e809965040d12a1a42e',
        //     'df5ed64b51406dd6d254abece09f56e685f38862dbdc5c2ebefdfeec7588ac98',
        //     'YOUR_SENDER_ID',
        //     successCallback,
        //     errorCallback
        // );

        // // 開封通知登録の設定
        // // trueを設定すると、開封通知を行う
        // window.NCMB.monaca.setReceiptStatus(true);
        // alert('DeviceToken is registed');
    });
  }

  getInstallationId() {
    // 登録されたinstallationのobjectIdを取得します。
    NCMB.monaca.getInstallationId((id) => {
          alert('installationID is: ' + id);
        }
    );
  }
  buttonVlicked() {
    this.deviceReady = !this.deviceReady;
  }

  ngOnInit() {
    this.ncmb = new NCMB('6bd8058cbda8e2aa448c573d4e4e99e720043297687f3e809965040d12a1a42e',
      'df5ed64b51406dd6d254abece09f56e685f38862dbdc5c2ebefdfeec7588ac98');
    this.push = new this.ncmb.Push();
    this.user = new this.ncmb.User();
  }
  // newPush() {
  //   this.push.set('immediateDeliveryFlag', true)
  //       .set('message', this.push_message)
  //       .set('target', ['ios']);
  //   this.push.send()
  //       .then((push) => {
  //         // 送信後処理
  //         alert('新規プッシュ通知が作成されました。');
  //       })
  //       .catch((err) => {
  //         // エラー処理
  //         alert(err);
  //         alert('プッシュ通知作成時にエラーが発生しました。');
  //       });
  // }

  newUser() {
    // ユーザー名・パスワードを設定
    this.user.set('userName', this.newUserName) /* ユーザー名 */
      .set('password', this.newPassWord); /* パスワード */
      // .set("phone_number", "090-1234-5678"); /* 任意フィールドも追加可能 */
      // ユーザーの新規登録処理
    this.user.signUpByAccount()
      .then(() => {
        // 登録後処理
        alert('登録成功');
      })
      .catch((err) => {
        // エラー処理
        alert(err);
        alert('登録失敗');
      });
  }

  login() {
    // ユーザー名とパスワードでログイン
    // this.user.login('Yamada Tarou', 'password')
    this.ncmb.User.login(this.userName, this.passWord)
      .then((data) => {
        // ログイン後処理
        alert('ログイン成功');
        const currentUser = this.ncmb.User.getCurrentUser();
        if (currentUser) {
          this.loginUser = currentUser.get('userName');
            // console.log("ログイン中のユーザー: " + currentUser.get("userName"));
        } else {
          alert('ユーザ情報の取得に失敗');
            // console.log("未ログインまたは取得に失敗");
        }
        this.router.navigate(['/push-edit']);
      })
      .catch((err) => {
        // エラー処理
        alert(err);
        alert('ログイン失敗');
      });
  }
}
