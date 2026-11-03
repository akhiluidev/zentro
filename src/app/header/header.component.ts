
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  showProfile: boolean = false;
  showSidebar: boolean = false;
  @Input() userDetails: any;
    @Input() zentroUsers: any;

  @Output() logoutEvent = new EventEmitter<void>();


  toggleProfile(): void {
    this.showProfile = !this.showProfile;

    // Close mobile sidebar
    this.showSidebar = false;
  }


  // Toggle mobile and tablet sidebar
  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;

    // Close desktop popup
    this.showProfile = false;
  }


  // Close desktop profile popup
  closeProfile(): void {
    this.showProfile = false;
  }


  // Close mobile and tablet sidebar
  closeSidebar(): void {
    this.showSidebar = false;
  }


  // Logout function
  logout(): void {

    this.showProfile = false;
    this.showSidebar = false;

    // Notify parent component
    this.logoutEvent.emit();

  }

}
