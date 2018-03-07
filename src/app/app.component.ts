import {
  Component, OnInit
} from '@angular/core';

import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

// import * as NCMB from 'ncmb';
declare var NCMB: any;
// interface Window { NCMB: any; }
// declare var window: Window;
@Component({
  selector: 'mi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mi';
  constructor() {
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

    // Observable.fromEvent(document, 'deviceready')
    //   .subscribe(() => {
    document.addEventListener('deviceready', function() {
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
    console.log('NCMB.monaca: ', NCMB.monaca);
    // 登録されたinstallationのobjectIdを取得します。
    NCMB.monaca.getInstallationId(
        function(id) {
            alert('installationID is: ' + id);
        }
    );
  }
}
