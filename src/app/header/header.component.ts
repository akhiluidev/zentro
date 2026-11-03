
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
    standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  showProfile: boolean = false;

  @Input() userDetails: any;

  @Output() logoutEvent = new EventEmitter<void>();

  // Toggle Profile Popup
  toggleProfile(): void {
    this.showProfile = !this.showProfile;
  }

  // Close Profile Popup
  closeProfile(): void {
    this.showProfile = false;
  }

  // Logout
  logout(): void {
    this.showProfile = false;
    this.logoutEvent.emit();
  }

}
