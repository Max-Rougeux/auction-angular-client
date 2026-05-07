import {Component, inject, signal} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {LoginInputComponent} from '../login-input/login-input.component';
import {AuthService} from '../../../../core/api/auth.service';

@Component({
  selector: 'app-login-form',
  imports: [
    FormsModule,
    LoginInputComponent,
  ],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  username: string = '';
  password: string = '';
  errorMsg: string | undefined = undefined;

  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  state = signal<"idle" | "submitting" | "error">("idle");

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    this.state.set("submitting");

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/']).then();
      },
      error: (err: HttpErrorResponse) => {
        this.state.set("error");

        this.errorMsg = err.status === 401
          ? 'Invalid username or password.'
          : 'Internal Server Error. Please try again later.';
      }
    })
  }
}
