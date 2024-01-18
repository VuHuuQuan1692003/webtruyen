import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/client/header/header.component';
import { FooterComponent } from './components/client/footer/footer.component';
import { CardComponent } from './components/client/card/card.component';
import { ListCardComponent } from './components/client/list-card/list-card.component';
import { HomeComponent } from './pages/client/home/home.component';
import { DetailComponent } from './pages/client/detail/detail.component';
import { WatchComponent } from './pages/client/watch/watch.component';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './layout/client-layout/client-layout.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BannerComponent } from './pages/client/home/components/banner/banner.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { BreadcrumbComponent } from './components/client/breadcrumb/breadcrumb.component';
registerLocaleData(vi);
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CardComponent,
    ListCardComponent,
    HomeComponent,
    DetailComponent,
    WatchComponent,
    DefaultLayoutComponent,
    AdminLayoutComponent,
    ClientLayoutComponent,
    BannerComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzIconModule,
    SlickCarouselModule,
    NzBreadCrumbModule,
    NzLayoutModule,
    NzDividerModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: vi_VN }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
