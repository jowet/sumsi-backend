webpackJsonp([0],{

/***/ 107:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 107;

/***/ }),

/***/ 149:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 149;

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_chores_chores__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__form_form__ = __webpack_require__(195);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = (function () {
    function HomePage(navCtrl, choresProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.choresProvider = choresProvider;
        // console.log(this.chores);
        // self=this;
        this.loadData();
        // console.log('balance'+this.balance);
        window.setInterval(function () {
            _this.loadData();
        }, 1E3);
    }
    HomePage.prototype.markAsDone = function (id) {
        var _this = this;
        this.choresProvider.updateChore(id, { 'task': { 'state': 'closed' } }).subscribe(function (data) { _this.loadData(); });
    };
    HomePage.prototype.loadData = function () {
        var _this = this;
        this.choresProvider.getChores().subscribe(function (result) { return (_this.chores = result.data); });
        this.choresProvider.getLedger().subscribe(function (result) { return (_this.balance = result.data.attributes.balance); });
    };
    HomePage.prototype.addChore = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__form_form__["a" /* FormPage */]);
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/koch_roland/Documents/development/playground/sumsi-frontend/src/pages/home/home.html"*/'<div class="burger"></div>\n<div class="settings"></div>\n<ion-header>\n  <ion-navbar>\n    <ion-title style="align:center">\n      <!-- <h1 class="title" style="text-align: center;"><img class="title-image" src="../../assets/icon/assets/viessmann.png" style="width: 140px;"/></h1> -->\n      <h1 class="title" style="text-align: center;"><img class="title-image" src="../../assets/icon/raiffeisen.png" style="width: 140px;"/></h1>\n    </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div style="text-align:center">\n    <div class="header" style="display: inline">\n        <div class="wrap">\n            <h2 style="color: #4a4a4a">Uter\'s SpeakyBank</h2>\n        </div>\n        <div style="height: 4px">\n        </div>\n        <ion-grid class="grid grind-mit-karrrrrusell" style="margin-top: -10px;">\n          <ion-row>\n            <ion-col width-10></ion-col>\n            <ion-col width-80>\n              <div class="wrap konto-wrap">\n                <div class="kontostand">\n                    {{ (balance/100 || 0) | currency: \'EUR\':true}}\n                </div>\n                <div class="kontostand-text">\n                    Balance\n                </div>\n              </div>\n            </ion-col>\n            <ion-col width-10>\n              <div style="text-align:right">\n                <button ion-button round (click)="addChore()" id="addChores">+</button>\n              </div>\n            </ion-col>\n            </ion-row>\n        </ion-grid>\n    </div>\n<div class="Line-Copy-4"></div>\n\n    <div class="heading-wrapper">\n        <div class= "status">To Do</div>\n    </div>\n\n    <div *ngFor="let chore of chores">\n      <ion-card *ngIf="chore.attributes.state === \'opened\'">\n        <ion-grid>\n          <ion-row style="height: 10px"></ion-row>\n          <ion-row>\n\n            <ion-col col-2>\n              <img class="img" src="../../assets/icon/assets/Status/OK_Copy.png" (click)="markAsDone(chore.id)">\n            </ion-col>\n\n            <ion-col col-8>\n              <div id="chore_title">\n                {{chore.attributes.title}}\n              </div>\n              <div id="due_date">\n                Until 17. September\n              </div>\n            </ion-col>\n\n            <ion-col width-2>\n              {{chore.attributes.value/100| currency: \'EUR\':true}}\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card>\n    </div>\n    <div class="Line-Copy-4"></div>\n  </div>\n  <div style="text-align:center">\n    <div class="heading-wrapper">\n        <div class= "status">In Review</div>\n    </div>\n\n    <div *ngFor="let chore of chores">\n      <ion-card *ngIf="chore.attributes.state === \'completed\'">\n        <ion-grid>\n          <ion-row style="height: 10px"></ion-row>\n          <ion-row>\n\n            <ion-col col-2>\n              <img class="img" src="../../assets/icon/assets/Status/OK.png" (click)="markAsDone(chore.id)">\n            </ion-col>\n\n            <ion-col col-8>\n              <div id="chore_title">\n                {{chore.attributes.title}}\n              </div>\n              <div id="due_date">\n                Until 17. September\n              </div>\n            </ion-col>\n\n            <ion-col width-2>\n              {{chore.attributes.value/100| currency: \'EUR\':true}}\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card>\n    </div>\n    <div class="Line-Copy-4"></div>\n  </div>\n  <div style="text-align:center">\n    <div class="heading-wrapper">\n        <div class= "status">Done</div>\n    </div>\n\n    <div *ngFor="let chore of chores">\n      <ion-card *ngIf="chore.attributes.state === \'closed\'">\n        <ion-grid>\n          <ion-row style="height: 10px"></ion-row>\n          <ion-row>\n\n            <ion-col col-2>\n              <img class="img" src="../../assets/icon/assets/Status/OK_Green.png" (click)="markAsDone(chore.id)">\n            </ion-col>\n\n            <ion-col col-8>\n              <div id="chore_title">\n                {{chore.attributes.title}}\n              </div>\n              <div id="due_date">\n                Until 17. September\n              </div>\n            </ion-col>\n\n            <ion-col width-2>\n              {{chore.attributes.value/100| currency: \'EUR\':true}}\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card>\n    </div>\n  </div>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/koch_roland/Documents/development/playground/sumsi-frontend/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_chores_chores__["a" /* ChoresProvider */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_chores_chores__ = __webpack_require__(98);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//
// @IonicPage()
var FormPage = (function () {
    function FormPage(navCtrl, navParams, choresProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.choresProvider = choresProvider;
    }
    FormPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FormPage');
    };
    FormPage.prototype.AddChore = function () {
        var _this = this;
        this.choresProvider.createChore({ 'task': { 'title': this.chore_title, 'value': this.amount } }).subscribe(function (data) { _this.navCtrl.pop(); });
    };
    return FormPage;
}());
FormPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-form',template:/*ion-inline-start:"/Users/koch_roland/Documents/development/playground/sumsi-frontend/src/pages/form/form.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title style="align:center">\n      <h1 class="title" style="text-align: center;"><img class="title-image" src="../../assets/icon/raiffeisen.png" style="width: 200px;"/></h1>\n    </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list>\n    <ion-item>\n      <ion-label stacked>Chore Name</ion-label>\n      <ion-input type="text"[(ngModel)]="chore_title"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label stacked>Amount</ion-label>\n      <ion-input type="text"[(ngModel)]="amount"></ion-input>\n    </ion-item>\n    </ion-list>\n    <button ion-button block color="secondary" style="background-color: #05aa9d;" (click)="AddChore()">add</button>\n</ion-content>\n'/*ion-inline-end:"/Users/koch_roland/Documents/development/playground/sumsi-frontend/src/pages/form/form.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_chores_chores__["a" /* ChoresProvider */]])
], FormPage);

//# sourceMappingURL=form.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(215);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_form_form__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_chores_chores__ = __webpack_require__(98);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_form_form__["a" /* FormPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */]),
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["c" /* HttpModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_form_form__["a" /* FormPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_9__providers_chores_chores__["a" /* ChoresProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/koch_roland/Documents/development/playground/sumsi-frontend/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/koch_roland/Documents/development/playground/sumsi-frontend/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChoresProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the ChoresProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ChoresProvider = (function () {
    // status:
    function ChoresProvider(http) {
        this.http = http;
        this.apiString = "http://sumsiapi-env.n2eirghx2d.eu-central-1.elasticbeanstalk.com/api/ledgers/1";
    }
    ChoresProvider.prototype.postChore = function (id, title, reward) {
        return this.http.get(this.apiString);
        //ledger = 5
    };
    ChoresProvider.prototype.getChores = function () {
        return this.http.get(this.apiString + '/tasks').map(function (resp) { return resp.json(); });
    };
    ChoresProvider.prototype.getLedger = function () {
        return this.http.get(this.apiString).map(function (resp) { return resp.json(); });
    };
    ChoresProvider.prototype.updateChore = function (id, obj) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json', 'accept': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.patch(this.apiString + '/tasks/' + id, JSON.stringify(obj), options).map(function (resp) { return resp.json(); });
    };
    ChoresProvider.prototype.createChore = function (obj) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json', 'accept': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.apiString + '/tasks', JSON.stringify(obj), options).map(function (resp) { return resp.json(); });
    };
    return ChoresProvider;
}());
ChoresProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], ChoresProvider);

//# sourceMappingURL=chores.js.map

/***/ })

},[196]);
//# sourceMappingURL=main.js.map