import { ToastService } from './../../../services/shared/toast.service';
import { Component, ViewChild, ElementRef, Renderer2, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../../../services/shared/search.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/shared/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy{

  @ViewChild('searchInput') searchInput!: ElementRef;
  private globalClickListener!: () => void;
  showSearchBar: boolean = false;
  searchText: string = '';
  isUserLoggedIn: boolean = false;
  private authListenerSubs: Subscription = new Subscription();

  constructor(private searchService: SearchService, private renderer: Renderer2, private el: ElementRef, private router: Router, private authService: AuthService, private toastService: ToastService) {
  }

  ngOnInit() {
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isUserLoggedIn = isAuthenticated;
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe(); // Prevent memory leaks
  }

  onSearchChange() {
    this.searchService.changeSearchText(this.searchText);
  }

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
    if (this.showSearchBar) {
      setTimeout(() => this.searchInput.nativeElement.focus(), 300); // Wait for the animation
      this.globalClickListener = this.renderer.listen('document', 'click', this.onDocumentClick.bind(this));
    } else if (this.globalClickListener) {
      this.globalClickListener(); // Remove the listener when the search bar is hidden
    }
  }

  onDocumentClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) { // If click is outside component
      this.showSearchBar = false;
      this.globalClickListener(); // Remove the listener
    }
  }

  resetSearch() {
    this.searchText = '';
    this.searchService.changeSearchText('');
    this.searchInput.nativeElement.focus();
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

  navigateLoginPage() {
    this.router.navigate(['/login']);
  }

  logoutUser() {
    this.authService.logout();
    this.toastService.show('Logged out successfully', { classname: 'bg-success text-primary' });
    this.router.navigate(['/home']);
  }

}
