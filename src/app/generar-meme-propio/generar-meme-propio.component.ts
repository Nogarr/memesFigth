import { Component, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/users';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-generar-meme-propio',
  templateUrl: './generar-meme-propio.component.html',
  styleUrls: ['./generar-meme-propio.component.css'],
})
export class GenerarMemePropioComponent {
  memeForm: FormGroup;
  selectedImage: File | null = null;
  resizedImage: string | null = null;
  private xInterval: any;
  private yInterval: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginservice: LoginService,
    private el: ElementRef
  ) {
    this.memeForm = this.formBuilder.group({
      text0: [''],
      text1: [''],
      textX: [0],
      textY: [0],
    });

    this.memeForm.valueChanges.subscribe(() => {
      this.onGenerateMeme();
    });
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    this.resizeImage();
  }

  onGenerateMeme() {
    if (this.selectedImage) {
      const text0 = this.memeForm.get('text0')?.value ?? '';
      const text1 = this.memeForm.get('text1')?.value ?? '';
      const textX = this.memeForm.get('textX')?.value ?? 0;
      const textY = this.memeForm.get('textY')?.value ?? 0;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const image = new Image();
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        if (ctx) {
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

          const fontSize = 30;
          ctx.font = `${fontSize}px Arial`;
          ctx.fillText(text0, textX, textY + fontSize);
          ctx.fillText(text1, textX, textY + 2 * fontSize);
        }

        this.resizedImage = canvas.toDataURL();
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        this.sumarXP();
      };

      image.src = URL.createObjectURL(this.selectedImage);
    }
  }

  resizeImage() {
    if (this.selectedImage) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.onload = () => {
        const maxSize = 400;
        let width = image.width;
        let height = image.height;

        if (width > height && width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        } else if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }

        canvas.width = width;
        canvas.height = height;
        if (ctx) {
          ctx.drawImage(image, 0, 0, width, height);
          this.resizedImage = canvas.toDataURL();
        }
      };

      image.src = URL.createObjectURL(this.selectedImage);
    }
  }

  getSafeURL(): string | null {
    return this.resizedImage;
  }

  roadToMenu() {
    this.router.navigate(['/menu']);
  }

  sumarXP() {
    let dato = localStorage.getItem('1')!;
    let user: User = new User();
    this.loginservice.getUsers(dato).subscribe(
      (res) => {
        user = res[0];
        user.experience++;
        user.generatedmemes++;
        // ... (resto de la lógica XP)
        this.loginservice.funcion(user).subscribe(
          (res) => {
            console.log(user.experience);
          },
          (e) => {
            console.log('Ha ocurrido un error al intentar editar la categoría');
          }
        );
      },
      (e) => {
        console.log('Ha ocurrido un error al intentar editar la categoría');
      }
    );
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        this.startXInterval(true);
        break;
      case 'ArrowDown':
        this.startXInterval(false);
        break;
      case 'ArrowLeft':
        this.startYInterval(false);
        break;
      case 'ArrowRight':
        this.startYInterval(true);
        break;
    }
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
        this.stopXInterval();
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        this.stopYInterval();
        break;
    }
  }

  private startXInterval(increment: boolean) {
    this.xInterval = setInterval(() => {
      increment ? this.incrementX() : this.decrementX();
    }, 100);
  }

  private stopXInterval() {
    clearInterval(this.xInterval);
  }

  private startYInterval(increment: boolean) {
    this.yInterval = setInterval(() => {
      increment ? this.incrementY() : this.decrementY();
    }, 100);
  }

  private stopYInterval() {
    clearInterval(this.yInterval);
  }

  incrementX() {
    const textX = this.memeForm.get('textX');
    if (textX) {
      textX.setValue((textX.value || 0) + 10);
    }
  }

  decrementX() {
    const textX = this.memeForm.get('textX');
    if (textX) {
      textX.setValue((textX.value || 0) - 10);
    }
  }

  incrementY() {
    const textY = this.memeForm.get('textY');
    if (textY) {
      textY.setValue((textY.value || 0) + 10);
    }
  }

  decrementY() {
    const textY = this.memeForm.get('textY');
    if (textY) {
      textY.setValue((textY.value || 0) - 10);
    }
  }
}
