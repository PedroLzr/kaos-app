import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoLoggedGuard } from './guards/no-logged-guard.guard';
import { LoggedGuard } from './guards/logged-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'init',
    pathMatch: 'full',
  },
  {
    path: 'sign-name',
    loadChildren: () =>
      import('./pages/sign/sign-name/sign-name.module').then(
        (m) => m.SignNamePageModule
      ),
    canLoad: [NoLoggedGuard],
  },
  {
    path: 'sign-gender',
    loadChildren: () =>
      import('./pages/sign/sign-gender/sign-gender.module').then(
        (m) => m.SignGenderPageModule
      ),
    canLoad: [NoLoggedGuard],
  },
  {
    path: 'sign-dateofbirth',
    loadChildren: () =>
      import('./pages/sign/sign-dateofbirth/sign-dateofbirth.module').then(
        (m) => m.SignDateOfBirthPageModule
      ),
    canLoad: [NoLoggedGuard],
  },
  {
    path: 'sign-confirm',
    loadChildren: () =>
      import('./pages/sign/sign-confirm/sign-confirm.module').then(
        (m) => m.SignConfirmPageModule
      ),
    canLoad: [NoLoggedGuard],
  },
  {
    path: 'sign-imageProfile',
    loadChildren: () =>
      import('./pages/sign/sign-imageProfile/sign-imageProfile.module').then(
        (m) => m.SignImageProfilePageModule
      ),
    canLoad: [NoLoggedGuard],
  },
  {
    path: 'sign-phone',
    loadChildren: () =>
      import('./pages/sign/sign-phone/sign-phone.module').then(
        (m) => m.SignPhonePageModule
      ),
    canLoad: [NoLoggedGuard],
  },
  {
    path: 'sign-userName',
    loadChildren: () =>
      import('./pages/sign/sign-userName/sign-userName.module').then(
        (m) => m.SignUserNamePageModule
      ),
    canLoad: [NoLoggedGuard],
  },
  {
    path: 'sign-notifications',
    loadChildren: () =>
      import('./pages/sign/sign-notifications/sign-notifications.module').then(
        (m) => m.SignNotificationsPageModule
      ),
    canLoad: [NoLoggedGuard],
  },

  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    canLoad: [LoggedGuard],
  },
  {
    path: 'event-detail',
    loadChildren: () =>
      import('./pages/event-detail/event-detail.module').then(
        (m) => m.EventDetailPageModule
      ),
    canLoad: [LoggedGuard],
  },
  {
    path: 'user-profile',
    loadChildren: () =>
      import('./pages/user-profile/user-profile.module').then(
        (m) => m.UserProfilePageModule
      ),
    canLoad: [LoggedGuard],
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./pages/settings/settings.module').then(
        (m) => m.SettingsPageModule
      ),
    canLoad: [LoggedGuard],
  },
  {
    path: 'init',
    loadChildren: () =>
      import('./pages/init/init.module').then((m) => m.InitPageModule),
  },
  {
    path: 'onboarding',
    loadChildren: () =>
      import('./pages/onboarding/onboarding.module').then(
        (m) => m.OnboardingPageModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
