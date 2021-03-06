import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { config, CONFIG_TOKEN, firebaseConf, THEMES_TOKEN, uiThemes } from 'config';
import { SharedModule } from '@llecoop/shared.module';
import { environment } from '../../environments/environment';
import { ActivityModule } from 'app/activity/activity.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { ServicesModule } from '@llecoop/services/services.module';
import { AppRoutingModule } from './app-routing.module';
import { AppSandbox } from './sandbox/app.sandbox';
import { AppComponent } from './containers';
import { IsAuthGuard } from './guards';
import { effects } from './store/effects';
import { CustomSerializer, reducers } from './store/reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    // Activity indicators
    ActivityModule,
    // Authentication module
    AuthenticationModule,
    AngularFireModule.initializeApp(firebaseConf),
    AngularFireAuthModule,
    AngularFirestoreModule,
    // Store
    StoreModule.forRoot(reducers, environment.metaReducers),
    EffectsModule.forRoot(effects),
    environment.imports,
    StoreRouterConnectingModule,
    // Services
    ServicesModule.forRoot()
  ],
  providers: [
    AppSandbox,
    IsAuthGuard,
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    { provide: CONFIG_TOKEN, useValue: config },
    { provide: THEMES_TOKEN, useValue: uiThemes }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
