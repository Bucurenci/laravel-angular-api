import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {

    this.form = this.fb.group({
      email: '',
      password: ''
    });
  }

  submit() {
    const dataForm = this.form.getRawValue();
    const data = {
      'username': dataForm.email,
      'password': dataForm.password,
      'grant_type': 'password',
      'client_id': 2,
      'client_secret': 'eVHxlVEXXOeI31Nd8ij01jshIMLH2qmIqbTXjcnT',
      'scope': '*'
    };

    this.http.post('http://localhost:8000/oauth/token', data).subscribe(
      (result: any) => {
        localStorage.setItem('token', result.access_token);
        this.router.navigate(['/secure']);
      },
      error => {
        console.log("Failed");
        console.log(error);
      }
    );
  }
}
