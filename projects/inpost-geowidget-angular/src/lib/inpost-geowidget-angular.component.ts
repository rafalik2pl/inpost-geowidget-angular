import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-inpost-geowidget-angular',
  template: `
    <inpost-geowidget [id]="identifier" [token]="token" [language]="language" [config]="config"></inpost-geowidget>
  `,
  styles: [
  ]
})
export class InpostGeowidgetAngularComponent implements OnInit, AfterViewInit {

  @Input() token = '';
  @Input() identifier = 'Geo1';
  @Input() language = 'pl';
  @Input() config = 'parcelcollect';
  @Input() sandbox = false;
  @Output() pointSelect = new EventEmitter<any>();
  @Output() apiReady = new EventEmitter<any>();

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    if (!this.token) {
      console.warn('Geowidget token is missing. See documentation: https://dokumentacja-inpost.atlassian.net/wiki/spaces/PL/pages/50069505/Geowidget+v5.');
    }

    this._loadScript(
      this._getScriptUrl(),
      () => { console.log('Geowidget js library was loaded successfuly.'); },
      () => { console.warn('There was a problem adding the Geowidget js library.'); }
    );

    this._loadStylesheet(
      this._getStylesheetUrl(),
      () => { console.log('Geowidget css library was loaded successfuly.'); },
      () => { console.warn('There was a problem adding the Geowidget css library.'); }
    );
  }

  ngAfterViewInit(): void {
    const geowidget = this.el.nativeElement.querySelector('#' + this.identifier);
    geowidget.addEventListener('inpost.geowidget.init', (event: any) => {
      const api = event.detail.api;
      this.apiReady.emit(api);
      api.addPointSelectedCallback((point: any) => {
        this.pointSelect.emit(point);
      });
    });
  }

  private _getScriptUrl(): string {
    return (this.sandbox) ? 'https://sandbox-easy-geowidget-sdk.easypack24.net/inpost-geowidget.js' : 'https://geowidget.inpost.pl/inpost-geowidget.js';
  }

  private _getStylesheetUrl(): string {
    return (this.sandbox) ? 'https://sandbox-easy-geowidget-sdk.easypack24.net/inpost-geowidget.css' : 'https://geowidget.inpost.pl/inpost-geowidget.css';
  }

  private _loadScript(scriptUrl: string, callback: () => void, errorCallback: () => void): void {
    if (this._isScriptLoaded(scriptUrl)) { return; }

    const script = document.createElement('script');
    script.src = scriptUrl;
    script.onload = callback;
    script.onerror = errorCallback;
    document.body.appendChild(script);
  }

  private _loadStylesheet(stylesheetUrl: string, callback: () => void, errorCallback: () => void): void {
    if (this._isStylesheetLoaded(stylesheetUrl)) { return; }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = stylesheetUrl;
    link.onload = callback;
    link.onerror = errorCallback;
    document.head.appendChild(link);
  }

  private _isScriptLoaded(scriptUrl: string): boolean {
    const scripts = Array.from(document.head.querySelectorAll('script')) as HTMLScriptElement[];

    return scripts.some((script) => script.src === scriptUrl);
  }

  private _isStylesheetLoaded(stylesheetUrl: string): boolean {
    const stylesheets = Array.from(document.styleSheets) as CSSStyleSheet[];

    return stylesheets.some((stylesheet) => stylesheet.href === stylesheetUrl);
  }
}
