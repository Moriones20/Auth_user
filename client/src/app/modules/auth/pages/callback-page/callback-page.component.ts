import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-callback-page',
  templateUrl: './callback-page.component.html',
  styleUrls: ['./callback-page.component.css'],
})
export class CallbackPageComponent implements OnInit {
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
        this.router.navigate(['/home']);
      },
    });
  }
}
