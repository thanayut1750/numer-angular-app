import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatTabsModule} from '@angular/material/tabs';
import {MatNativeDateModule} from '@angular/material/core';


import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpansionContentComponent } from './components/expansion-content/expansion-content.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgChartsModule } from 'ng2-charts';
import { BisectionComponent } from './components/root-of-equations/bisection/bisection.component';
import { FalsePositionComponent } from './components/root-of-equations/false-position/false-position.component';
import { OnePointIterationComponent } from './components/root-of-equations/one-point-iteration/one-point-iteration.component';
import { SecantComponent } from './components/root-of-equations/secant/secant.component';
import { NewtonRaphsonComponent } from './components/root-of-equations/newton-raphson/newton-raphson.component';
import { MatTableModule } from '@angular/material/table'
import { KatexModule } from 'ng-katex';
import { BisecGraphComponent } from './components/graph-plot/bisec-graph/bisec-graph.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { UserInputComponent } from './components/user-input/user-input.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NumerapiService } from './service/numerapi.service'
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ExpansionContentComponent,
    BisectionComponent,
    FalsePositionComponent,
    OnePointIterationComponent,
    SecantComponent,
    NewtonRaphsonComponent,
    BisecGraphComponent,
    UserInputComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatNativeDateModule,
    MatExpansionModule,
    NgChartsModule,
    MatTableModule,
    KatexModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [NumerapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
