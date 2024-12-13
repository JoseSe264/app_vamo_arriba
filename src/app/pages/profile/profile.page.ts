import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileForm: FormGroup; // Declarar la propiedad profileForm

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService)
    {
      this.profileForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
        profileImage: [''],
        password: [''],
      });
    }

  async ngOnInit() {
    try {
      const user = await this.authService.getCurrentUser(); // Obtener datos del usuario
      this.profileForm.patchValue({
        name: user.displayName || '',
        email: user.email || '',
        profileImage: user.photoURL || '',
      });
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
    }
  }

  async onSubmit() {
    if (this.profileForm.valid) {
      const updatedProfile = this.profileForm.getRawValue();

      try {
        const user = await this.authService.getCurrentUser();
        if (user) {
          const uid = user.uid;

          // Actualizar perfil en Firebase Authentication
          await user.updateProfile({
            displayName: updatedProfile.name,
            photoURL: updatedProfile.profileImage,
          });

          // Actualizar datos en Realtime Database usando AuthService
          const userRef = this.authService.getUserRef(uid);
          await userRef.update({
            name: updatedProfile.name,
            profileImage: updatedProfile.profileImage,
          });

          console.log('Perfil actualizado correctamente');
        }
      } catch (error) {
        console.error('Error al actualizar el perfil:', error);
      }
    } else {
      console.error('El formulario no es válido');
    }
  }

  logout() {
    // Lógica para cerrar sesión
    console.log('Cerrando sesión');
  }
}
