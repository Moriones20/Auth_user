import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialFailureComponent } from './social-failure.component';

describe('SocialFailureComponent', () => {
  let component: SocialFailureComponent;
  let fixture: ComponentFixture<SocialFailureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocialFailureComponent]
    });
    fixture = TestBed.createComponent(SocialFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
