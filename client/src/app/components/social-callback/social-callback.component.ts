import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-social-callback',
  templateUrl: './social-callback.component.html',
  styleUrls: ['./social-callback.component.css'],
})
export class SocialCallbackComponent implements OnInit {
  encodeData?: string;
  userData: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next: (params) => {
        this.encodeData = params.get('userData') ?? '';
        const decodedUserString = decodeURIComponent(this.encodeData);
        this.userData = JSON.parse(decodedUserString);
        localStorage.setItem('userData', JSON.stringify(this.userData));
        localStorage.setItem('isLoggedIn', true.toString());
        window.location.href = '/home';
      },
    });
  }
}
