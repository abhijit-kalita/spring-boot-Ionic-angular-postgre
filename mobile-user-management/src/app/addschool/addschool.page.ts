import { Component, OnInit } from '@angular/core';
import { AddSchoolService } from '../services/school/add.school.service';
import { AuthService } from '../services/auth.service';
import {School} from '../model/school';
import {User} from '../model/user';
import {Router} from '@angular/router';
import {MenuController, LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-addschool',
  templateUrl: 'addschool.page.html',
  styleUrls: ['addschool.page.scss'],
})
export class AddSchoolPage implements OnInit {
  currentUser: User;
  school: School = new School();
  errorMessage: string;
  loader: any;
  isDismiss = false;

  constructor(private authService: AuthService,private addSchoolService: AddSchoolService, private router: Router,
    private menuController: MenuController, private loadingCtrl: LoadingController, private toastController: ToastController) { 
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
  
    ngOnInit() {
      this.menuController.enable(true);
    }
  
    addSchool(){
      this.errorMessage = '';
      this.presentLoading();
      this.addSchoolService.addSchool(this.school).subscribe(data=> {
        this.successMessage();
        this.dismiss();
        //this.router.navigate(['/dashboard']);
      },err => {
        this.errorMessage = "Schoolname already exist";
        this.dismiss();
      });
    }
  
    async presentLoading() {
      this.loader = await this.loadingCtrl.create({
        message: 'Please wait...'
      });      
      await this.loader.present().then(()=> {
        if(this.isDismiss){
          this.loader.dismiss();
        }
      });
    }
    async successMessage() {
      const toast = await this.toastController.create({
        message: 'School saved successfully',
        position: 'top',
        cssClass: 'toast-success',
        color:"success",
        duration: 3000
      });
      toast.present();
    }
    async dismiss() {
      this.isDismiss = true;
      if(!this.loader){
        return;
      }
    return await this.loader.dismiss().then(() => console.log('dismissed'));
    }
  

}