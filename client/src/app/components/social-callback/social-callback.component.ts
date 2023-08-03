import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-social-callback',
  templateUrl: './social-callback.component.html',
  styleUrls: ['./social-callback.component.css'],
})
export class SocialCallbackComponent implements OnInit {
  token: string | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.token = params.get('jwt') ?? '';
      localStorage.setItem('token', this.token);
      this.router.navigate(['/home']);
    });
  }
}
