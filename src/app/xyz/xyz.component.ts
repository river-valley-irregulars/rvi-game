import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare function createUnityInstance(x: any, y: any, z: any): Promise<void>;

@Component({
  selector: 'app-xyz',
  templateUrl: './xyz.component.html',
  styleUrls: ['./xyz.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class XyzComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    var buildUrl = 'assets/webgl/Build';
    var config = {
      dataUrl: buildUrl + '/webgl.data',
      frameworkUrl: buildUrl + '/webgl.framework.js',
      codeUrl: buildUrl + '/webgl.wasm',
      streamingAssetsUrl: 'StreamingAssets',
      // companyName: 'RVI',
      // productName: 'webgl',
      // productVersion: '0.1',
      devicePixelRatio: 0,
    };
    let container = document.querySelector('#unity-container') || new Element();
    var canvas: HTMLElement =
      document.querySelector('#unity-canvas') || new HTMLElement();
    var loadingBar: HTMLElement =
      document.querySelector('#unity-loading-bar') || new HTMLElement();
    var progressBarFull: HTMLElement =
      document.querySelector('#unity-progress-bar-full') || new HTMLElement();
    var fullscreenButton: HTMLElement =
      document.querySelector('#unity-fullscreen-button') || new HTMLElement();

    canvas.style.width = '960px';
    canvas.style.height = '600px';

    loadingBar.style.display = 'block';
    createUnityInstance(canvas, config, (progress: any) => {
      progressBarFull.style.width = 100 * progress + '%';
    })
      .then((unityInstance: any) => {
        loadingBar.style.display = 'none';
        fullscreenButton.onclick = () => {
          unityInstance.SetFullscreen(1);
        };
      })
      .catch((message: any) => {
        alert(message);
      });
  }
}
