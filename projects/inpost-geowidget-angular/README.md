# inpost-geowidget-angular

Package includes simple Angular Component for Inpost Geowidget v5.

## Installation

```sh
npm i inpost-geowidget-angular
# or
yarn add inpost-geowidget-angular
```

## Usage

```ts
// app.module.ts
...
import { InpostGeowidgetAngularModule } from 'inpost-geowidget-angular'; 
...
@NgModule({
  ...
  imports: [
    ...
    InpostGeowidgetAngularModule
  ]
  ...
})

```

```ts
// app.component.ts
import { Component } from '@angular/core';
	
@Component({ 
	selector: 'app-example-geowidget', 
	template: `
    <h1>inpost-geowidget-angular</h1>
    <div style="width: 1000px; height: 1000px;">
      <lib-inpost-geowidget-angular 
        [token]="token" 
        [identifier]="identifier" 
        [language]="language" 
        (pointSelect)="pointSelect($event)" 
        (apiReady)="apiReady($event)">
      </lib-inpost-geowidget-angular>
    </div>  
	` 
})

export class ExampleGeowidgetComponent { 
  token = 'YOUR_TOKEN';     // Generate YOUR_TOKEN on https://manager.paczkomaty.pl (for production environment) or https://sandbox-manager.paczkomaty.pl (for sandbox environment).
  identifier = 'Geo1';      // Html element identifier, default: 'Geo1'
  language = 'pl';          // Language, default: 'pl'
  config = 'parcelcollect'; // Config, default: 'parcelcollect'
  sandbox = false;          // Run as sandbox environment, default: false

  pointSelect(point: any) {    
    console.log('Object of selected point: ', point);
  }

  apiReady(api) {
    // You can also use API Methods, as example
    api.changePosition({ longitude: 20.318968, latitude: 49.731131 }, 16);
  }  
} 

```

## Generate token

Production: https://manager.paczkomaty.pl
Sandbox: https://sandbox-manager.paczkomaty.pl

## Documentation of Inpost Geowidget v5

Read more about Inpost Geowidget v5, possible way to implementation, config parameters in the [docs](https://dokumentacja-inpost.atlassian.net/wiki/spaces/PL/pages/50069505/Geowidget+v5+Beta) and [here](https://geowidget.inpost.pl/docs/). 
All API method are describedand [here](https://geowidget.inpost.pl/docs/interfaces/ApiInterface.html).

## License

This project is licensed under the MIT License.
