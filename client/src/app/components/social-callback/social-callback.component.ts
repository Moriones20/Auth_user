import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-social-callback',
  templateUrl: './social-callback.component.html',
  styleUrls: ['./social-callback.component.css'],
})
export class SocialCallbackComponent implements OnInit {
  encodeData?: string;
  userData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next: (params) => {
        this.encodeData = params.get('userData') ?? '';
        const decodedUserString = decodeURIComponent(this.encodeData);
        this.userData = JSON.parse(decodedUserString);
        localStorage.setItem('userData', JSON.stringify(this.userData));
        this.authService.isLogged = true;
        this.router.navigate(['/home']);
      },
    });
  }
}
