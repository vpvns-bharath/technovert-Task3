import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FiltersComponent } from './filters/filters.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { SearchbarComponent } from './main-container/searchbar/searchbar.component';
import { FormsModule } from '@angular/forms';
import { DisplayboxComponent } from './main-container/displaybox/displaybox.component';
import { DatabaseService } from './database.service';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FiltersComponent,
    MainContainerComponent,
    SearchbarComponent,
    DisplayboxComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
