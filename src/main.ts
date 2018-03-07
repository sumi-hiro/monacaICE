import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { NCMB } from '../node_modules/ncmb';
import { NCMB_PUSH } from '../node_modules/ncmb-push-monaca-plugin/www/nifty';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

// APIキーの設定とSDK初期化
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
        .then(function(object) {
            // 保存に成功した場合の処理

        })
        .catch(function(err) {
            // 保存に失敗した場合の処理

        });
interface Window { NCMB_PUSH: any; }
declare var window: Window;
// PhoneGap event handler
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

window.NCMB_PUSH.monaca.setHandler
(
        function(jsonData) {
          alert('callback :::' + JSON.stringify(jsonData));
        }
    );
    window.NCMB_PUSH.monaca.setDeviceToken(
                                '6bd8058cbda8e2aa448c573d4e4e99e720043297687f3e809965040d12a1a42e',
                                'df5ed64b51406dd6d254abece09f56e685f38862dbdc5c2ebefdfeec7588ac98',
                                'sender_id'
                                );
}
function getInstallationId() {
    window.NCMB_PUSH.monaca.getInstallationId(
    function(id) {
      alert('installationID is: ' + id);
    }
  );
}
