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
  hidden: boolean | undefined = false;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const urlTree = this.router.parseUrl(this.router.url);
      const primarySegment = urlTree.root.children['primary'];
      this.hidden = primarySegment && primarySegment.segments && primarySegment.segments.length > 0;
    });

  }

  ngOnInit(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.breadcrumbService.updateBreadcrumbFromRoute(this.activatedRoute);
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
