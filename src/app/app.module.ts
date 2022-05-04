import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatTabsModule} from '@angular/material/tabs';
import {MatNativeDateModule} from '@angular/material/core';


import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpansionContentComponent } from './components/expansion-content/expansion-content.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { BisectionComponent } from './components/root-of-equations/bisection/bisection.component';
import { FalsePositionComponent } from './components/root-of-equations/false-position/false-position.component';
import { OnePointIterationComponent } from './components/root-of-equations/one-point-iteration/one-point-iteration.component';
import { SecantComponent } from './components/root-of-equations/secant/secant.component';
import { NewtonRaphsonComponent } from './components/root-of-equations/newton-raphson/newton-raphson.component';
import { MatTableModule } from '@angular/material/table'
import { KatexModule } from 'ng-katex';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { UserInputComponent } from './components/user-input/user-input.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NumerapiService } from './service/numerapi.service'
import { AppRoutingModule } from './app-routing.module';
import { GraphPlotComponent } from './components/graph-plot/graph-plot.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { OnePPlotComponent } from './components/graph-plot/one-p-plot/one-p-plot.component';
import { SecantPlotComponent } from './components/graph-plot/secant-plot/secant-plot.component';
import { NewraphPlotComponent } from './components/graph-plot/newraph-plot/newraph-plot.component';
import { LinearSystemComponent } from './components/expansion-content/linear-system/linear-system.component';
import { JacobiComponent } from './components/linear-algebra/jacobi/jacobi.component';
import { GaussSeidelComponent } from './components/linear-algebra/gauss-seidel/gauss-seidel.component';
import { ConjugateGradientComponent } from './components/linear-algebra/conjugate-gradient/conjugate-gradient.component';
import { JacobiPlotComponent } from './components/graph-plot/linear-sys/jacobi/jacobi-plot.component';

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
    UserInputComponent,
    GraphPlotComponent,
    OnePPlotComponent,
    SecantPlotComponent,
    NewraphPlotComponent,
    LinearSystemComponent,
    JacobiComponent,
    GaussSeidelComponent,
    ConjugateGradientComponent,
    JacobiPlotComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatTableModule,
    KatexModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HighchartsChartModule
  ],

  providers: [NumerapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
