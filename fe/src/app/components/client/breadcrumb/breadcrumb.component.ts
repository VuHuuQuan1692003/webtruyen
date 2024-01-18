import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';
import { BreadcrumbService } from './breadcrumb.service';
import { BreadcrumbItem } from './breadcrumb';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: BreadcrumbItem[] = [];
  hidden: boolean = false;
  constructor(
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      console.log(event);
      this.breadcrumbService.updateBreadcrumbFromRoute(this.activatedRoute);
      console.log(this.router.url);

      if (this.router.url == '/') {
        this.hidden = true;
      } else {
        this.hidden = false;
      }

    });

    this.breadcrumbService.breadcrumb$.subscribe((breadcrumb) => {
      this.breadcrumbs = breadcrumb;
    });
  }

  getRouterLink(breadcrumb: BreadcrumbItem): string[] | null {
    const currentIndex = this.breadcrumbs.indexOf(breadcrumb);

    if (currentIndex > 0) {
      return this.breadcrumbs.slice(0, currentIndex + 1).map(item => item.url);
    }

    return null;
  }

  goBack() {
    if (this.breadcrumbs.length > 1) {
      const previousBreadcrumb = this.breadcrumbs[this.breadcrumbs.length - 2];
      const routerLink = this.getRouterLink(previousBreadcrumb);

      if (routerLink) {
        this.router.navigate(routerLink);
      }
    } else {
      this.location.back();
    }
  }
}
