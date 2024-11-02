import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  esAdmin:boolean = false;
  auth = inject(AuthService);
  router = inject(Router)

  abrirModal() {
    Swal.fire({
      title: 'Queres guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then(result => {
      if (result.isConfirmed)
        Swal.fire('Saved!', '', 'success');
      else if (result.isDenied)
        Swal.fire('Changes are not saved', '', 'info');
    });
  }
  logout() {
    this.auth.Logout(); 
    this.router.navigate(['/login']); 
  }
}
