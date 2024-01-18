import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Route } from '@angular/router';

interface BreadcrumbItem {
  url: string;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbSubject = new BehaviorSubject<BreadcrumbItem[]>([]);
  breadcrumb$ = this.breadcrumbSubject.asObservable();

  setBreadcrumb(breadcrumb: BreadcrumbItem[]) {
    this.breadcrumbSubject.next(breadcrumb);
  }

  updateBreadcrumbFromRoute(route: ActivatedRoute) {
    const breadcrumb: BreadcrumbItem[] = this.createBreadcrumbs(route.root);
    this.setBreadcrumb(breadcrumb);
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadcrumbItem[] = []): BreadcrumbItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      const label = (child.snapshot.data as RouteData)?.breadcrumb || routeURL;

      console.log('Label:', label);

      if (label !== '') {
        url += `/${routeURL}`;
        breadcrumbs.push({ url, label });
      }
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }
}

interface RouteData {
  breadcrumb?: string;
  [key: string]: any;
}
