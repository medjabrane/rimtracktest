webpackJsonp([0],{

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_leaflet__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_config__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Marker = L.Marker;
var Icon = L.Icon;

var MapService = (function () {
    function MapService() {
        this.mapLoaded = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.markerWasAdded = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.markerWasEdited = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.polygons = [];
        this.markers = [];
        this.polylines = [];
        this.circles = [];
        this.newRtMarkers = [];
        this.rtMarkers = [];
        this.markersPoi = [];
        this.polygonsPoi = [];
        this.baseMaps = {
            RimTelecom: L.tileLayer("https://api.mapbox.com/styles/v1/aminehn/ciycvpk1800e42rool43biorb/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYW1pbmVobiIsImEiOiJjaXg5M2FuYmwwMDN0Mm9udTNtbm10MmF2In0.TCtNRI8pQSawNt927GPoDg", {
                attribution: '&copy; Rimtelecom map',
                id: 'mapbox.streets',
                maxZoom: 20,
                maxNativeZoom: 17,
                accessToken: 'pk.eyJ1IjoiYW1pbmVobiIsImEiOiJjaXg5M2FuYmwwMDN0Mm9udTNtbm10MmF2In0.TCtNRI8pQSawNt927GPoDg'
            }) /*,
            OpenStreetMap: L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
                maxZoom: 20,
                maxNativeZoom: 17,
                attribution: '&copy; <a href="rimtelecom.ma">Rim telecom</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
            }),
            Esri: L.tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
                attribution: 'Rimtelecom'
            }),
            CartoDB: L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
                maxZoom: 20,
                maxNativeZoom: 17,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            }),
            Esri_WorldImagery: L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                maxZoom: 20,
                maxNativeZoom: 17,
                attribution: 'Rimtelecom'
            })*/
        };
    }
    MapService.prototype.addRtMarker = function (rtMarker) {
        rtMarker.value.setIcon(rtMarker.icon);
        this.rtMarkers.push(rtMarker);
        rtMarker.value.addTo(this.map);
    };
    MapService.prototype.updateRtMarkertest = function (coordinate, popup, icon, id, isCurrentPathClicked) {
        //tester si la liste est vide
        //si oui 
        var _this = this;
        if (this.newRtMarkers == null || this.newRtMarkers.length == 0) {
            var marker = L.marker(L.latLng(coordinate.lat, coordinate.lng));
            marker.addTo(this.map);
            marker.bindPopup(popup);
            marker.setIcon(icon);
            marker.on('click', function () { _this.map.setView(coordinate, 14); });
            this.newRtMarkers.push({ id: id, marker: marker });
        }
        else {
            this.newRtMarkers.map(function (rt) {
                if (rt.id == id) {
                    //rt.marker.remove();
                    _this.newRtMarkers.splice(_this.newRtMarkers.indexOf(rt), 1);
                    rt.marker.setLatLng(coordinate);
                    rt.marker.setIcon(icon);
                    rt.marker.getPopup().setContent(popup);
                    if (isCurrentPathClicked == true) {
                        var marker = L.marker(L.latLng(coordinate.lat, coordinate.lng));
                        marker.setIcon(new Icon({
                            iconUrl: __WEBPACK_IMPORTED_MODULE_2__providers_global_config__["b" /* imagesDir */] + "green-point.png",
                            iconAnchor: [2, 2]
                        }));
                        _this.addMarker(marker);
                        var points = [];
                        points.push(rt.marker.getLatLng());
                        points.push(coordinate.value.getLatLng());
                        var polyline = L.polyline(points, { color: '#0031D9', weight: 3 });
                        _this.addPolyline(polyline);
                    }
                }
            });
        }
    };
    MapService.prototype.updateRtMarker = function (rtMarker, isCurrentPathClicked) {
        var _this = this;
        var ok = false;
        this.rtMarkers.map(function (rt) {
            if (rt.id == rtMarker.id) {
                if (isCurrentPathClicked == true) {
                    var marker = new Marker(rt.value.getLatLng());
                    marker.setIcon(new Icon({
                        iconUrl: __WEBPACK_IMPORTED_MODULE_2__providers_global_config__["b" /* imagesDir */] + "green-point.png",
                        iconAnchor: [2, 2]
                    }));
                    /*marker.on('click', () => {
                        this.map.setView(rt.value.getLatLng(), 17);
                    });*/
                    _this.addMarker(marker);
                    var points = [];
                    points.push(rt.value.getLatLng());
                    points.push(rtMarker.value.getLatLng());
                    var polyline = L.polyline(points, { color: '#0031D9', weight: 3 });
                    _this.addPolyline(polyline);
                }
                rt.value.setLatLng(rtMarker.value.getLatLng());
                //rt.value.getPopup().setContent(rtMarker.value.getPopup().getContent());
                /*rt.value.on('click', () => {
                    this.map.setView(rtMarker.value.getLatLng(), 16);
                });*/
                rt.value.options.rotationAngle = rtMarker.angle;
                /*rt.value.setIcon(rtMarker.icon);*/
                ok = true;
            }
        });
        if (!ok) {
            rtMarker.value.setIcon(rtMarker.icon);
            this.rtMarkers.push(rtMarker);
            rtMarker.value.addTo(this.map);
        }
    };
    MapService.prototype.removeAllRtMarkers = function () {
        var _this = this;
        this.newRtMarkers.forEach(function (m) {
            _this.map.removeLayer(m.marker);
        });
        this.newRtMarkers = [];
    };
    MapService.prototype.setView = function (coordinate) {
        this.map.setView(coordinate, 15);
    };
    MapService.prototype.addCircle = function (circle) {
        this.circles.push(circle);
        circle.addTo(this.map);
    };
    MapService.prototype.removeCirclesFromMap = function () {
        var _this = this;
        this.circles.forEach(function (m) {
            _this.map.removeLayer(m);
        });
        this.circles = [];
    };
    MapService.prototype.addMarker = function (marker) {
        this.markers.push(marker);
        marker.addTo(this.map);
    };
    MapService.prototype.addMarkerPoi = function (marker) {
        this.markersPoi.push(marker);
        marker.addTo(this.map);
    };
    MapService.prototype.removeMarkersPoiFromMap = function () {
        var _this = this;
        this.markersPoi.forEach(function (m) {
            _this.map.removeLayer(m);
        });
        this.markersPoi = [];
    };
    MapService.prototype.removeMarker = function (index) {
        this.map.removeLayer(this.markers[index]);
        delete this.markers[index];
    };
    MapService.prototype.addMarkersToMap = function () {
        var _this = this;
        this.markers.forEach(function (marker) {
            marker.addTo(_this.map);
        });
    };
    MapService.prototype.removeMarkersFromMap = function () {
        var _this = this;
        this.markers.forEach(function (m) {
            _this.map.removeLayer(m);
        });
        this.markers = [];
    };
    MapService.prototype.addPolyline = function (polyline) {
        this.polylines.push(polyline);
        polyline.addTo(this.map);
    };
    MapService.prototype.removePolylinesFromMap = function () {
        var _this = this;
        this.polylines.forEach(function (m) {
            _this.map.removeLayer(m);
        });
        this.polylines = [];
    };
    MapService.prototype.addPolygon = function (polygon) {
        this.polygons.push(polygon);
        polygon.addTo(this.map);
    };
    MapService.prototype.addPolygonPoi = function (polygon) {
        this.polygonsPoi.push(polygon);
        polygon.addTo(this.map);
    };
    MapService.prototype.removePolygon = function (index) {
        //this.map.removeLayer(this.polygons[index]);
        delete this.polygons[index];
    };
    MapService.prototype.addPolygonsToMap = function () {
        var _this = this;
        this.polygons.forEach(function (Polygon) {
            Polygon.addTo(_this.map);
        });
    };
    MapService.prototype.removePolygonsFromMap = function () {
        var _this = this;
        this.polygons.forEach(function (m) {
            _this.map.removeLayer(m);
        });
        this.polygons = [];
    };
    MapService.prototype.removePolygonsPoiFromMap = function () {
        var _this = this;
        this.polygonsPoi.forEach(function (m) {
            _this.map.removeLayer(m);
        });
        this.polygonsPoi = [];
    };
    MapService.prototype.resetMap = function () {
        this.removeMarkersFromMap();
        this.removePolygonsFromMap();
        this.removePolylinesFromMap();
    };
    MapService.prototype.disableMouseEvent = function (elementId) {
        var element = document.getElementById(elementId);
        L.DomEvent.disableClickPropagation(element);
        L.DomEvent.disableScrollPropagation(element);
    };
    ;
    return MapService;
}());
MapService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], MapService);

//# sourceMappingURL=map.service.js.map

/***/ }),

/***/ 145:
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
webpackEmptyAsyncContext.id = 145;

/***/ }),

/***/ 188:
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
webpackEmptyAsyncContext.id = 188;

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_login__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__map_page_map_page__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_real_time_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_historical_service__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_data_management_service__ = __webpack_require__(74);
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
    function HomePage(historicalService, realTimeService, dataManagementService, navCtrl, signinService, toastController) {
        this.historicalService = historicalService;
        this.realTimeService = realTimeService;
        this.dataManagementService = dataManagementService;
        this.navCtrl = navCtrl;
        this.signinService = signinService;
        this.toastController = toastController;
        this.login = null;
        this.mdp = null;
    }
    HomePage.prototype.onSubmit = function () {
        var _this = this;
        this.signinService.login({ "username": this.login, "password": this.mdp }).subscribe(function (token) {
            _this.goToRt();
            _this.signinService.token = token.token;
            _this.realTimeService.token = token.token;
            _this.historicalService.token = token.token;
            _this.dataManagementService.token = token.token;
        }, function () {
            var toast = _this.toastController.create({
                message: 'Authentification Echouée!',
                duration: 2000
            });
            toast.present();
        });
    };
    HomePage.prototype.goToRt = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__map_page_map_page__["a" /* MapPage */], {
            value: null
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Users\MedJabrane\Desktop\Rimtelecom\rimtrack withoud local storage\rimtrack\src\pages\home\home.html"*/'<ion-content class="page-login" padding>\n  <ion-card class="login-card">\n<style>\ndiv {\n    width: 220px;\n    padding: 10px;\n    margin: 0;\n    text-align: center;\n    margin-left: auto;\n    margin-right: auto;\n}\n</style>\n      <div>\n    <img src="assets/img/logorim.jpg" height="150" />   \n  </div>\n    \n    <ion-card-header>\n      Authentification\n    </ion-card-header>\n\n    <ion-card-content>\n      <ion-list >\n        <ion-item>\n          <ion-label floating>Nom d\'utilisateur</ion-label>\n          <ion-input type="text" [(ngModel)]="login" name="login"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label floating>Mot de passe</ion-label>\n          <ion-input type="password" [(ngModel)]="mdp" name="mdp"></ion-input>\n        </ion-item>\n      </ion-list>\n      <button  margin-top ion-button margin-right block width-50 icon-left (click)=onSubmit()>\n        <ion-icon name="log-in"></ion-icon>\n         Se connecter\n      </button>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"C:\Users\MedJabrane\Desktop\Rimtelecom\rimtrack withoud local storage\rimtrack\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_historical_service__["a" /* HistoricalService */], __WEBPACK_IMPORTED_MODULE_4__providers_real_time_service__["a" /* RealTimeService */], __WEBPACK_IMPORTED_MODULE_6__providers_data_management_service__["a" /* DataManagementService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_login__["a" /* Login */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Login; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global_config__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_headers__ = __webpack_require__(314);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Login = (function () {
    function Login(http) {
        this.http = http;
        console.log('Hello Login Provider');
    }
    Login.prototype.login = function (credentials) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global_config__["a" /* dns */] + 'signin', credentials, { headers: __WEBPACK_IMPORTED_MODULE_4__utils_headers__["a" /* contentHeaders */] }).map(function (res) { return res.json(); });
    };
    Login.prototype.logout = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Accept': 'application/json' });
        Object(__WEBPACK_IMPORTED_MODULE_4__utils_headers__["b" /* createAuthorizationHeader */])(headers);
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__global_config__["a" /* dns */] + 'signout', {}, { headers: headers }).map(function (res) { return res.json(); });
    };
    return Login;
}());
Login = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], Login);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__real_time_real_time__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__historical_historical__ = __webpack_require__(262);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MapPage = (function () {
    function MapPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.realTimeRoot = __WEBPACK_IMPORTED_MODULE_2__real_time_real_time__["a" /* RealTime */];
        this.historicalRoot = __WEBPACK_IMPORTED_MODULE_3__historical_historical__["a" /* Historical */];
    }
    return MapPage;
}());
MapPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-map-page',template:/*ion-inline-start:"C:\Users\MedJabrane\Desktop\Rimtelecom\rimtrack withoud local storage\rimtrack\src\pages\map-page\map-page.html"*/'<ion-tabs>\n  <ion-tab [root]="realTimeRoot" tabTitle="Temps réel" tabIcon="pin"></ion-tab>\n  <ion-tab [root]="historicalRoot" tabTitle="Historique" tabIcon="flag"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"C:\Users\MedJabrane\Desktop\Rimtelecom\rimtrack withoud local storage\rimtrack\src\pages\map-page\map-page.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], MapPage);

//# sourceMappingURL=map-page.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RealTime; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_map_service__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_real_time_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_management_service__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_geocoding_service__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__objects_real_time__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__groups_page_groups_page__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_global_config__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_Rx__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_leaflet__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_leaflet__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var Marker = L.Marker;
var Icon = L.Icon;


var RealTime = (function () {
    function RealTime(pipe, modalCtrl, geocodingService, dataManagementService, toastController, realTimeService, navCtrl, navParams, mapService) {
        this.pipe = pipe;
        this.modalCtrl = modalCtrl;
        this.geocodingService = geocodingService;
        this.dataManagementService = dataManagementService;
        this.toastController = toastController;
        this.realTimeService = realTimeService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mapService = mapService;
        this.searchWord = '';
        this.newRealTimeRecords = null;
        this.oldRealTimeRecords = null;
        this.angles = new Map();
        this.isCurrentPathClicked = false;
        this.pathDrawn = false;
        this.previousPathdrawn = false;
        this.currentPathClickedDeviceIds = null;
    }
    RealTime.prototype.ionViewWillEnter = function () {
        this.init();
    };
    RealTime.prototype.init = function () {
        var _this = this;
        this.initMap();
        this.mapService.removeAllRtMarkers();
        this.loadGroups();
        __WEBPACK_IMPORTED_MODULE_10_rxjs_Rx__["Observable"].interval(1000 * 60).subscribe(function (x) {
            _this.getAllRealTimeRecords();
        });
    };
    RealTime.prototype.initMap = function () {
        if (this.mapService.map)
            this.mapService.map.remove();
        var map = L.map('map', {
            zoomControl: false,
            center: L.latLng(32.586163, -9.912118),
            zoom: 6,
            minZoom: 3,
            maxZoom: 20,
            maxNativeZoom: 17,
            layers: [this.mapService.baseMaps.RimTelecom]
        });
        L.control.zoom({ position: 'topright' }).addTo(map);
        this.mapService.map = map;
    };
    RealTime.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RealTime');
    };
    RealTime.prototype.openGroupsModal = function () {
        var _this = this;
        var groupModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__groups_page_groups_page__["a" /* GroupsPage */], { groups: this.groups });
        groupModal.present();
        groupModal.onDidDismiss(function (selectedDevice) {
            if (selectedDevice != null && selectedDevice != 0 && selectedDevice != _this.selectedDevice) {
                _this.mapService.removeAllRtMarkers();
                _this.clearPolylines();
                _this.selectedDevice = selectedDevice;
                _this.goToRealTimeRecord(selectedDevice);
            }
        });
    };
    RealTime.prototype.loadGroups = function () {
        var _this = this;
        this.allGroups = this.realTimeService.getAllGroups(this.searchWord).subscribe(function (groupes) {
            _this.groups = groupes;
            _this.openGroupsModal();
            _this.groups.forEach(function (group) {
                group.vehicules.forEach(function (vehicule) {
                    vehicule.realTimeRecord = new __WEBPACK_IMPORTED_MODULE_7__objects_real_time__["a" /* RealTimeRecord */]();
                    _this.getAllRealTimeRecords();
                });
            });
        });
    };
    RealTime.prototype.searchGroup = function (any) {
        this.loadGroups();
    };
    RealTime.prototype.goToRealTimeRecord = function (idRealTimeRecord) {
        var _this = this;
        this.newRealTimeRecords.forEach(function (realTimeRecord) {
            if (realTimeRecord.idRealTimeRecord == idRealTimeRecord) {
                //this.clearPolylines();
                _this.mapService.map.setView(realTimeRecord.coordinate, 15);
                _this.trackRealTimeRecord(realTimeRecord);
            }
        });
    };
    RealTime.prototype.getAllRealTimeRecords = function () {
        var _this = this;
        this.allRealTimeRecords = this.realTimeService.getAllRealTimeRecords().subscribe(function (realTimeRecords) {
            if (_this.newRealTimeRecords) {
                _this.oldRealTimeRecords = _this.newRealTimeRecords;
            }
            _this.newRealTimeRecords = realTimeRecords;
            realTimeRecords.forEach(function (realTimeRecord) {
                realTimeRecord.vehicule = _this.getVehicule(realTimeRecord.idRealTimeRecord);
                _this.trackRealTimeRecord(realTimeRecord);
                if (_this.oldRealTimeRecords) {
                    _this.oldRealTimeRecords.map(function (oldRealTimeRecord) {
                        if (oldRealTimeRecord.idRealTimeRecord === realTimeRecord.idRealTimeRecord) {
                            if (realTimeRecord.speed > 0 && _this.previousPathdrawn == false && realTimeRecord.idRealTimeRecord == _this.selectedDevice) {
                                _this.displayCurrentPath(realTimeRecord.idRealTimeRecord);
                            }
                            if (oldRealTimeRecord.speed == 0 && realTimeRecord.speed > 0) {
                                var toast = _this.toastController.create({
                                    message: realTimeRecord.mark + ' à démarré !',
                                    duration: 2000,
                                    position: 'top'
                                });
                                toast.present();
                                _this.isCurrentPathClicked = true;
                                if (_this.currentPathClickedDeviceIds != null)
                                    _this.currentPathClickedDeviceIds.push(realTimeRecord.idRealTimeRecord);
                                if (_this.previousPathdrawn == false && realTimeRecord.idRealTimeRecord == _this.selectedDevice) {
                                    _this.displayCurrentPath(realTimeRecord.idRealTimeRecord);
                                }
                            }
                            if ((oldRealTimeRecord.speed > 0 && realTimeRecord.speed == 0) && realTimeRecord.ignition == true) {
                                var toast = _this.toastController.create({
                                    message: realTimeRecord.vehicule.mark + " s'est arrêté provisoirement!",
                                    duration: 2000,
                                    position: 'top'
                                });
                                toast.present();
                            }
                            if ((oldRealTimeRecord.speed > 0 && realTimeRecord.speed == 0) && realTimeRecord.ignition == false) {
                                var toast = _this.toastController.create({
                                    message: realTimeRecord.vehicule.mark + " s'est arrêté!",
                                    duration: 2000,
                                    position: 'top'
                                });
                                toast.present();
                                _this.isCurrentPathClicked = false;
                                _this.currentPathClickedDeviceIds = null;
                            }
                        }
                    });
                }
            });
        });
    };
    RealTime.prototype.trackRealTimeRecord = function (realTimeRecord) {
        var _this = this;
        var angle = 0;
        var date = new Date(realTimeRecord.recordTime);
        var minutes = date.getMinutes() + "";
        if (minutes.length == 1) {
            minutes = "0" + date.getMinutes();
        }
        var icon;
        var marker;
        var popup;
        if (!this.dataManagementService.pointInterests) {
            this.dataManagementService.getAllPointInterests().subscribe(function (pointInterests) {
                _this.dataManagementService.pointInterests = pointInterests;
                realTimeRecord.relativePosition = _this.dataManagementService.getRelativePosition(realTimeRecord.coordinate.lat, realTimeRecord.coordinate.lng);
            });
        }
        else {
            realTimeRecord.relativePosition = this.dataManagementService.getRelativePosition(realTimeRecord.coordinate.lat, realTimeRecord.coordinate.lng);
        }
        if (realTimeRecord.type === "AA") {
            angle = realTimeRecord.rotationAngle * 8;
        }
        if (this.oldRealTimeRecords && realTimeRecord.type === "GPRMC") {
            var oldRealTimeRecord = this.getOldRealTimeRecord(realTimeRecord.idRealTimeRecord);
            if (oldRealTimeRecord) {
                if (!this.compareTwoCoordinate(oldRealTimeRecord.coordinate, realTimeRecord.coordinate)) {
                    angle = Math.atan2(realTimeRecord.coordinate.lng - oldRealTimeRecord.coordinate.lng, realTimeRecord.coordinate.lat - oldRealTimeRecord.coordinate.lat) * 180 / Math.PI;
                    this.angles.set(realTimeRecord.idRealTimeRecord, angle);
                }
                else {
                    angle = this.angles.get(realTimeRecord.idRealTimeRecord);
                }
            }
        }
        popup = '<b>Chauffeur:</b> ' + this.dataManagementService.getDriverName(realTimeRecord.vehicule.driver) +
            '<br><b>Matricule:</b> ' + realTimeRecord.vehicule.matricule +
            '<br><b>Mark:</b> ' + realTimeRecord.vehicule.mark +
            '<br><b>Lat,Lng:</b><i> [' + this.PipeLngLat(realTimeRecord.coordinate.lat) + ',' + this.PipeLngLat(realTimeRecord.coordinate.lng) + ']</i><br><b>Vitesse :</b>' + realTimeRecord.speed +
            "<br><b>date et l'heure:</b> " + (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + minutes +
            "<br><b>Signal GSM:</b> " + realTimeRecord.signal +
            " <i class='fa fa-wifi' aria-hidden='true'></i><br><b>Sat en vue:</b> " + realTimeRecord.satInView + " <i class='fa fa-globe' aria-hidden='true'></i>";
        marker = new Marker(realTimeRecord.coordinate, {
            rotationAngle: angle
        });
        // marker.bindPopup("salut")
        if (realTimeRecord.realTimeRecordStatus == 'VALID' && realTimeRecord.speed == 0 && realTimeRecord.ignition == true) {
            icon = new Icon({
                iconUrl: __WEBPACK_IMPORTED_MODULE_9__providers_global_config__["b" /* imagesDir */] + "c4x" + Math.abs(Math.round(angle / 45) * 45) + ".png",
                iconAnchor: [-2, 30],
                popupAnchor: [10, -10]
            });
            //popup = '<ion-badge>En arrêt provisoire</ion-badge>'+ popup;
        }
        if (realTimeRecord.realTimeRecordStatus == 'VALID' && realTimeRecord.speed > 0 && realTimeRecord.ignition == true) {
            icon = new Icon({
                iconUrl: __WEBPACK_IMPORTED_MODULE_9__providers_global_config__["b" /* imagesDir */] + "c1x" + Math.abs(Math.round(angle / 45) * 45) + ".png",
                iconAnchor: [-2, 30],
                popupAnchor: [10, -25]
            });
            //popup = '<ion-badge color="secondary">En déplacement</ion-badge>' + popup;
        }
        if (realTimeRecord.realTimeRecordStatus == 'VALID' && realTimeRecord.speed == 0 && realTimeRecord.ignition == false) {
            icon = new Icon({
                iconUrl: __WEBPACK_IMPORTED_MODULE_9__providers_global_config__["b" /* imagesDir */] + "c3x" + Math.abs(Math.round(angle / 45) * 45) + ".png",
                iconAnchor: [-2, 30],
                popupAnchor: [10, -25]
            });
            //popup = '<ion-badge color="danger">En arrêt</ion-badge>' + popup;
        }
        if (realTimeRecord.realTimeRecordStatus == 'NON_VALID' || realTimeRecord.realTimeRecordStatus == 'TECHNICAL_ISSUE') {
            icon = new Icon({
                iconUrl: __WEBPACK_IMPORTED_MODULE_9__providers_global_config__["b" /* imagesDir */] + "c2x" + Math.abs(Math.round(angle / 45) * 45) + ".png",
                iconAnchor: [-2, 30],
                popupAnchor: [10, -25]
            });
            //popup = '<ion-badge color="dark">En dysfonctionnement</ion-badge>' + popup;
        }
        realTimeRecord.icon = icon;
        this.geocodingService.inverseGeoconding(realTimeRecord.coordinate.lat, realTimeRecord.coordinate.lng, 18).subscribe(function (adress) {
            popup = popup + '<hr><b>' + adress.display_name + '</b><br>';
            if (realTimeRecord.relativePosition) {
                popup = popup + '<hr><center><span class="leaflet-pelias-layer-icon-container"><div class="leaflet-pelias-layer-icon leaflet-pelias-layer-icon-point"></div></span><strong>' + realTimeRecord.relativePosition + '</strong></center>';
            }
            //marker.bindPopup('popup');
            realTimeRecord.geocoding = _this.getGeocoding(adress.address);
            realTimeRecord.geocodingDetails = adress.display_name;
            _this.updateSpecificGroups(realTimeRecord);
            var displaycurrentPath = false;
            if (_this.currentPathClickedDeviceIds != null && _this.currentPathClickedDeviceIds.indexOf(realTimeRecord.idRealTimeRecord) != -1) {
                displaycurrentPath = true;
                _this.pathDrawn = true;
            }
            if (realTimeRecord.idRealTimeRecord == _this.selectedDevice) {
                console.log("oui");
                _this.mapService.removeAllRtMarkers();
                console.log("all cleared , ready to draw");
                _this.mapService.updateRtMarkertest(realTimeRecord.coordinate, popup, icon, realTimeRecord.idRealTimeRecord, displaycurrentPath);
                if (_this.pathDrawn == false && realTimeRecord.speed > 0) {
                    _this.displayCurrentPath(realTimeRecord.idRealTimeRecord);
                }
            }
            // L.marker(L.latLng(realTimeRecord.coordinate.lat, realTimeRecord.coordinate.lng)).addTo(this.mapService.map).bindPopup(popup).setIcon(icon).on('click', () => {this.mapService.map.setView(realTimeRecord.coordinate, 8);
            //});
            /*this.mapService.updateRtMarker({
              id: realTimeRecord.idRealTimeRecord,
              value: marker,
              icon: icon,
              angle: angle
            }, displaycurrentPath);*/
        }, function (err) {
            var displaycurrentPath = false;
            if (_this.currentPathClickedDeviceIds != null && _this.currentPathClickedDeviceIds.indexOf(realTimeRecord.idRealTimeRecord) != -1) {
                displaycurrentPath = true;
            }
            if (realTimeRecord.idRealTimeRecord == _this.selectedDevice) {
                marker.bindPopup(popup);
                /*this.mapService.updateRtMarker({
                  id: realTimeRecord.idRealTimeRecord,
                  value: marker,
                  icon: icon,
                  angle: angle
                }, displaycurrentPath);*/
                _this.mapService.updateRtMarkertest(realTimeRecord.coordinate, popup, icon, realTimeRecord.idRealTimeRecord, displaycurrentPath);
            }
        });
    };
    RealTime.prototype.updateSpecificGroups = function (realTimeRecord) {
        if (this.groups)
            this.groups.forEach(function (group) {
                if (group)
                    group.vehicules.forEach(function (vehicule) {
                        if (vehicule.idDevice == realTimeRecord.idRealTimeRecord)
                            vehicule.realTimeRecord = realTimeRecord;
                        console.log(vehicule.realTimeRecord.icon);
                    });
            });
    };
    RealTime.prototype.getOldRealTimeRecord = function (id) {
        var result = this.oldRealTimeRecords.filter(function (rt) {
            return rt.idRealTimeRecord == id;
        });
        if (result)
            return result[0];
        else
            return null;
    };
    RealTime.prototype.compareTwoCoordinate = function (p1, p2) {
        if (p1.lat == p2.lat && p1.lng == p2.lng)
            return true;
        else
            false;
    };
    RealTime.prototype.getGeocoding = function (address) {
        var geocoding = null;
        if (address) {
            if (address.road != null) {
                geocoding = address.road;
            }
            if (address.neighbourhood != null) {
                geocoding = geocoding ? geocoding + ' ' + address.neighbourhood : address.neighbourhood;
            }
            if (address.city != null) {
                geocoding = geocoding ? geocoding + ' (' + address.city + ')' : address.city;
            }
            if (geocoding == null) {
                geocoding = 'chargement..';
            }
        }
        return geocoding;
    };
    RealTime.prototype.getVehicule = function (idDevice) {
        var foundVehicule = new __WEBPACK_IMPORTED_MODULE_7__objects_real_time__["b" /* Vehicule */]();
        for (var i = 0; i < this.groups.length; i++) {
            for (var j = 0; j < this.groups[i].vehicules.length; j++) {
                if (this.groups[i].vehicules[j].idDevice == idDevice) {
                    foundVehicule = this.groups[i].vehicules[j];
                    break;
                }
            }
        }
        return foundVehicule;
    };
    RealTime.prototype.clearPolylines = function () {
        this.mapService.removePolylinesFromMap();
        this.mapService.removeMarkersFromMap();
        this.pathDrawn = false;
    };
    RealTime.prototype.PipeLngLat = function (value) {
        return this.pipe.transform(value, '2.2-6');
    };
    RealTime.prototype.displayCurrentPath = function (deviceId) {
        var _this = this;
        console.log("le trajet se trace:" + deviceId);
        this.realTimeService.getCurrentPath(deviceId).subscribe(function (currentPath) {
            //console.log(currentPath);
            if (currentPath != null) {
                var polyline = L.polyline(currentPath.coordinates, { color: '#0031D9', weight: 3 });
                currentPath.coordinates.forEach(function (coordinate, i) {
                    var marker = new Marker(coordinate);
                    if (i != 0 && i != currentPath.coordinates.length - 1) {
                        marker.setIcon(new Icon({
                            iconUrl: __WEBPACK_IMPORTED_MODULE_9__providers_global_config__["b" /* imagesDir */] + "green-point.png",
                            iconAnchor: [2, 2]
                        }));
                        _this.mapService.addMarker(marker);
                    }
                });
                var startMarker = L.marker({ lat: currentPath.beginPathLatitude, lng: currentPath.beginPathLongitude });
                startMarker.setIcon(new Icon({
                    iconUrl: __WEBPACK_IMPORTED_MODULE_9__providers_global_config__["b" /* imagesDir */] + "startMarker.png",
                    iconAnchor: [-2, 30],
                    popupAnchor: [10, -25]
                }));
                startMarker.on('click', function () { _this.mapService.map.setView({ lat: currentPath.beginPathLatitude, lng: currentPath.beginPathLongitude }, 14); });
                _this.mapService.addMarker(startMarker);
                _this.mapService.addPolyline(polyline);
                _this.pathDrawn = true;
            }
            _this.previousPathdrawn = true;
        }, function (err) {
            _this.previousPathdrawn = false;
        });
    };
    return RealTime;
}());
RealTime = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-real-time',template:/*ion-inline-start:"C:\Users\MedJabrane\Desktop\Rimtelecom\rimtrack withoud local storage\rimtrack\src\pages\real-time\real-time.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Temps réel</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <ion-fab bottom right>\n        <button ion-fab (click)="openGroupsModal()" color="light"><ion-icon name="arrow-up"></ion-icon></button>\n      </ion-fab>\n      <ion-fab bottom left *ngIf="pathDrawn == true">\n        <button ion-fab (click)="clearPolylines()" color="danger"><ion-icon name="close"></ion-icon></button>\n      </ion-fab>\n  <div id="map" class="leaflet-pseudo-fullscreen leaflet-fullscreen-on" style="height: 93%!important; top: 7.5% !important;"></div>\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\MedJabrane\Desktop\Rimtelecom\rimtrack withoud local storage\rimtrack\src\pages\real-time\real-time.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_common__["d" /* DecimalPipe */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */], __WEBPACK_IMPORTED_MODULE_6__utils_geocoding_service__["a" /* GeocodingService */], __WEBPACK_IMPORTED_MODULE_5__providers_data_management_service__["a" /* DataManagementService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__providers_real_time_service__["a" /* RealTimeService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__utils_map_service__["a" /* MapService */]])
], RealTime);

//# sourceMappingURL=real-time.js.map

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeocodingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_config__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GeocodingService = (function () {
    function GeocodingService(_http) {
        this._http = _http;
    }
    GeocodingService.prototype.distance = function (lat1, lon1, lat2, lon2) {
        var p = 0.017453292519943295; // Math.PI / 180
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p) / 2 +
            c(lat1 * p) * c(lat2 * p) *
                (1 - c((lon2 - lon1) * p)) / 2;
        var distance = 12742 * Math.asin(Math.sqrt(a));
        return distance;
    };
    GeocodingService.prototype.inverseGeoconding = function (latitude, longitude, zoom) {
        return this._http.get(__WEBPACK_IMPORTED_MODULE_2__providers_global_config__["c" /* nominatim_dns */] + '/reverse.php?format=json&lat=' + latitude + '&lon=' + longitude + '&zoom=' + zoom + '&accept-language=fr&addressdetails=1').map(function (res) { return res.json(); });
    };
    GeocodingService.prototype.getMyIpAdress = function () {
        return this._http.get('http://api.ipify.org/?format=json').map(function (res) { return res.json(); });
    };
    GeocodingService.prototype.getMyLocation = function (ip) {
        return this._http.get('freegeoip.net/json/' + ip).map(function (res) { return res.json(); });
    };
    return GeocodingService;
}());
GeocodingService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], GeocodingService);

//# sourceMappingURL=geocoding.service.js.map

/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_real_time_service__ = __webpack_require__(73);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GroupsPage = (function () {
    function GroupsPage(navCtrl, navParams, viewCtrl, realTimeService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.realTimeService = realTimeService;
        this.groups = navParams.get('groups');
        //this.groups = this.processGroups(this.groups);
    }
    /* processGroups(groups: any){
       groups.forEach(group => {
         
       });
       return groups;
     }*/
    GroupsPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss(this.selectedDevice);
    };
    GroupsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GroupsPage');
    };
    GroupsPage.prototype.searchGroup = function () {
        var _this = this;
        this.allGroups = this.realTimeService.getAllGroups(this.searchWord).subscribe(function (groupes) {
            _this.groups = groupes;
            console.log(_this.groups);
        });
    };
    GroupsPage.prototype.goToRealTimeRecord = function (deviceId) {
        this.selectedDevice = deviceId;
        this.viewCtrl.dismiss(this.selectedDevice);
    };
    GroupsPage.prototype.startEngine = function () {
        console.log("startEngine");
    };
    GroupsPage.prototype.stopEngine = function () {
        console.log("stopEngine");
    };
    GroupsPage.prototype.displayTodaysMileage = function () {
        console.log("displayTodaysMileage");
    };
    GroupsPage.prototype.displayCurrentPath = function () {
        console.log("displayCurrentPath");
    };
    return GroupsPage;
}());
GroupsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-groups-page',template:/*ion-inline-start:"C:\Users\MedJabrane\Desktop\Rimtelecom\rimtrack withoud local storage\rimtrack\src\pages\groups-page\groups-page.html"*/'<ion-header>\n\n    <ion-navbar>\n        <ion-title>Groupes et véhicules</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="closeModal()">\n        <ion-icon name="arrow-down"></ion-icon>\n      </button>\n        </ion-buttons>\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content style="background-color: rgba(255, 255, 255, 0.69) !important; padding: auto;">\n    <div style="font-size: 15px;border-radius:0px; margin-top: 0%;">\n       <!-- <div style="text-align: center;padding-bottom: 20px">\n            <input style="text-align: center;" type="text" name="table_search" placeholder="Recherche ..." [(ngModel)]="searchWord"/>\n            <button ion-button icon-only clear color="dark"  (click)="searchGroup()">\n            <ion-icon name="search" ></ion-icon>\n                </button>\n        </div> -->\n        <div style="width: 500%">\n            <table class="table" style="width: 20%">\n                <tbody>\n                    <template ngFor let-item [ngForOf]="groups" let-i="index" [ngForTrackBy]="trackByFn">\n                        <tr style="color: black">\n                            <td style="font-size: 17px; font-weight: bold;text-align: center;padding-top: 10px;padding-bottom: 10px; background-color: #B0C4DE;opacity: 0.75;">{{item.nom}}</td>\n                        </tr>\n                        <tr>\n                            <td>\n                                <div style="overflow:auto">\n                                    <table class="table" frame="hsides" rules="cols" style="width: 100%;">\n                                        <thead frame="hsides" border="1">\n                                            <!-- <tr>\n                                                <th style="width: 10%;"> Etat</th>\n                                                <th colspan="3" style="width: 10%;">Véhicule</th>\n                                                <!-- <th style="width: 10%">Chauffeur</th> \n                                                <th style="width: 30%">Position</th> \n                                                <th style="width: 15%;">V(Km/h)</th>\n                                                <th style="width: 25%;">Date & heure</th>\n                                            </tr> -->\n                                        </thead>\n                                        <tbody style="border :colspan; text-align: center;" frame="hsides" frame="hsides" rules="all">\n                                            <ng-container *ngFor="let vehicule of item.vehicules">\n                                                <tr (click)="goToRealTimeRecord(vehicule.idDevice)" [ngClass]="{\'activeRT\': selectedDevice == vehicule.idDevice}" style="border-bottom:1pt solid black;">\n                                                    <td width="10%">\n                                                       <img width="30 px" src="{{vehicule?.realTimeRecord?.icon?.options?.iconUrl}}">\n                                                    </td> \n                                                    <td width="30%">\n                                                        <div><b>\n                                                    {{vehicule.matricule}} <br>\n                                                    {{vehicule?.driver?.firstName}} {{vehicule?.driver?.lastName}}\n                                                        </b></div>\n                                                    </td>\n                                                    <td width="60%" >\n                                                        <div\n                                                    *ngIf="!vehicule.realTimeRecord.relativePosition"><b>\n                                                        {{vehicule?.realTimeRecord?.geocoding}}\n                                                    </b></div> \n                                                    <div *ngIf="vehicule.realTimeRecord.relativePosition"><b>\n                                                        {{vehicule?.realTimeRecord?.relativePosition}}\n                                                    </b></div> <div><b>\n                                                        {{vehicule?.realTimeRecord?.recordTime| date:\'d-M HH:mm\'}}\n                                                    </b></div>\n                                                    <div><b>\n                                                        {{vehicule?.realTimeRecord?.speed}} KM/H \n                                                    </b></div>\n                                                    \n                                                    </td>\n                                                </tr>\n                                            </ng-container>\n                                        </tbody>\n                                    </table>\n\n                                </div>\n                            </td>\n                        </tr>\n                    </template>\n                </tbody>\n            </table>\n        </div>\n    </div>\n</ion-content>'/*ion-inline-end:"C:\Users\MedJabrane\Desktop\Rimtelecom\rimtrack withoud local storage\rimtrack\src\pages\groups-page\groups-page.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_real_time_service__["a" /* RealTimeService */]])
], GroupsPage);

//# sourceMappingURL=groups-page.js.map

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Historical; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_map_service__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_historical_service__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_management_service__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__historical_form_historical_form__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__paths_list_paths_list__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_global_config__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_leaflet__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_leaflet__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var Icon = L.Icon;

var Historical = (function () {
    function Historical(dataManagementService, historicalService, loadingCtrl, modalCtrl, navCtrl, navParams, mapService) {
        this.dataManagementService = dataManagementService;
        this.historicalService = historicalService;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mapService = mapService;
    }
    Historical.prototype.ionViewWillEnter = function () {
        this.init();
    };
    Historical.prototype.init = function () {
        this.initMap();
        // this.openFormModal();
    };
    Historical.prototype.initMap = function () {
        if (this.mapService.map)
            this.mapService.map.remove();
        var map = L.map('historicalMap', {
            zoomControl: false,
            center: L.latLng(32.586163, -9.912118),
            zoom: 6,
            minZoom: 3,
            maxZoom: 20,
            maxNativeZoom: 17,
            layers: [this.mapService.baseMaps.RimTelecom]
        });
        L.control.zoom({ position: 'topright' }).addTo(map);
        this.mapService.map = map;
    };
    Historical.prototype.openFormModal = function () {
        var _this = this;
        var formModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__historical_form_historical_form__["a" /* HistoricalForm */]);
        formModal.present();
        formModal.onDidDismiss(function (form) {
            if (form != null) {
                //let firstDateStr = form.firstDate.split("-");
                //let firstDate = firstDateStr[2] + "/" + firstDateStr[1] + "/" + firstDateStr[0];
                var firstDateTime = form.firstDate.getTime();
                //let lastDateStr = form.lastDate.split("-");
                // let lastDate = lastDateStr[2] + "/" + lastDateStr[1] + "/" + lastDateStr[0];
                var lastDateTime = form.lastDate.getTime();
                _this.loader = _this.loadingCtrl.create({
                    content: "Veuillez attendre..."
                });
                _this.loader.present();
                _this.allPaths = _this.historicalService.getAllPaths(form.selectedDeviceId, {
                    startDate: firstDateTime,
                    endDate: lastDateTime
                }).subscribe(function (paths) {
                    _this.paths = paths;
                    if (_this.paths != null)
                        _this.paths.forEach(function (path) {
                            var date = new Date(path.beginPathTime - 3600000);
                            var hours = date.getHours();
                            var minutes = "0" + date.getMinutes();
                            path.displayBeginPathTime = hours + ':' + minutes.substr(-2);
                            date = new Date(path.endPathTime - 3600000);
                            hours = date.getHours();
                            minutes = "0" + date.getMinutes();
                            path.displayEndPathTime = hours + ':' + minutes.substr(-2);
                            path.beginPathGeocodingDetails = _this.dataManagementService.getRelativePosition(path.beginPathLatitude, path.beginPathLongitude);
                            path.beginPathGeocoding = path.beginPathGeocodingDetails;
                            if (path.beginPathGeocodingDetails == null) {
                                _this.dataManagementService.inverseGeoconding(path.beginPathLatitude, path.beginPathLongitude, 17).subscribe(function (adress) {
                                    path.beginPathGeocoding = _this.processGeocoding(adress.display_name);
                                    if (adress.address.road != null && adress.address.neighbsourhood != null && adress.address.city != null) {
                                        path.beginPathGeocoding = adress.address.road + ' ' + adress.address.neighbourhood + '(' + adress.address.city + ')';
                                        path.beginPathGeocodingDetails = adress.address.road + ' ' + adress.address.neighbourhood + '(' + adress.address.city + ')';
                                    }
                                    /*else {
                                      let truncatedDisplayName = adress.display_name;
                                      let countCommas = 0;
                                      for (var i = 0, len = adress.display_name.length; i < len; i++) {
                                        if (adress.display_name[i] == ',') {
                                          countCommas = countCommas + 1;
                                        } else if (countCommas >= 4) {
                                          truncatedDisplayName = adress.display_name.substring(0, i - 1);
                                          path.beginPathGeocoding = truncatedDisplayName;
                                          path.beginPathGeocodingDetails = path.beginPathGeocoding;
                                          break;
                                        }
                                      }
                                    }*/
                                }, function (err) {
                                    path.beginPathGeocodingDetails = null;
                                    path.beginPathGeocoding = null;
                                });
                            }
                            path.endPathGeocodingDetails = _this.dataManagementService.getRelativePosition(path.endPathLatitude, path.endPathLongitude);
                            path.endPathGeocoding = path.endPathGeocodingDetails;
                            if (path.endPathGeocodingDetails == null) {
                                _this.dataManagementService.inverseGeoconding(path.endPathLatitude, path.endPathLongitude, 17).subscribe(function (adress) {
                                    path.endPathGeocoding = _this.processGeocoding(adress.display_name);
                                    if (adress.address.road != null && adress.address.neighbsourhood != null && adress.address.city != null) {
                                        path.endPathGeocoding = adress.address.road + ' ' + adress.address.neighbourhood + '(' + adress.address.city + ')';
                                        path.endPathGeocodingDetails = path.endPathGeocoding;
                                    }
                                    /*else {
                                      let truncatedDisplayName = adress.display_name;
                                      let countCommas = 0;
                                      for (var i = 0, len = adress.display_name.length; i < len; i++) {
                                        if (adress.display_name[i] == ',') {
                                          countCommas = countCommas + 1;
                                        } else if (countCommas >= 5) {
                                          truncatedDisplayName = adress.display_name.substring(0, i - 1);
                                          path.endPathGeocoding = truncatedDisplayName;
                                          path.endPathGeocodingDetails = path.endPathGeocoding;
                                          break;
                                        }
                                      }
                                    }*/
                                }, function (err) {
                                    path.endPathGeocodingDetails = null;
                                    path.endPathGeocoding = null;
                                });
                            }
                        });
                    _this.openResultsModal();
                    _this.loader.dismiss();
                });
            }
        });
    };
    Historical.prototype.openResultsModal = function () {
        var _this = this;
        var pathsListModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__paths_list_paths_list__["a" /* PathsList */], { paths: this.paths });
        pathsListModal.present();
        pathsListModal.onDidDismiss(function (pathClicked) {
            if (pathClicked != null)
                _this.drawPath(pathClicked);
        });
    };
    Historical.prototype.drawPath = function (path) {
        var _this = this;
        this.mapService.removePolylinesFromMap();
        this.mapService.removeMarkersFromMap();
        this.historicalService.getPathDetails(path.deviceId, {
            startDate: path.beginPathTime,
            endDate: path.endPathTime
        }).subscribe(function (points) {
            var stopMarkers = [];
            points.stops.forEach(function (stop) {
                var popup = "<img src='" + __WEBPACK_IMPORTED_MODULE_8__providers_global_config__["b" /* imagesDir */] + "stop_smal.png" + "'/> Durée d'arrêt : " + stop.stopDurationStr;
                /*let stopMarker = new Marker({
                  lat: stop.stopLatitude,
                  lng: stop.stopLongitude
                });*/
                var stopMarker = L.marker({ lat: stop.stopLatitude, lng: stop.stopLongitude });
                stopMarker.addTo(_this.mapService.map);
                stopMarker.on('click', function () { _this.mapService.map.setView({ lat: stop.stopLatitude, lng: stop.stopLongitude }, 14); });
                _this.dataManagementService.inverseGeoconding(stop.stopLatitude, stop.stopLongitude, 18).subscribe(function (adress) {
                    var truncatedDisplayName = adress.display_name;
                    var countCommas = 0;
                    for (var i = 0, len = adress.display_name.length; i < len; i++) {
                        if (adress.display_name[i] == ',') {
                            countCommas = countCommas + 1;
                        }
                        else if (countCommas >= 5) {
                            truncatedDisplayName = adress.display_name.substring(0, i - 1);
                            break;
                        }
                    }
                    popup = popup + '<br><hr><b>' + truncatedDisplayName + '</b>';
                    stopMarker.bindPopup(popup);
                });
                stopMarker.setIcon(new Icon({
                    iconUrl: __WEBPACK_IMPORTED_MODULE_8__providers_global_config__["b" /* imagesDir */] + "stop_smal.png",
                    iconAnchor: [-2, 30],
                    popupAnchor: [10, -25]
                }));
                _this.mapService.addMarker(stopMarker);
            });
            var polyline = L.polyline(points.coordinates, { color: '#0031D9', weight: 3 });
            points.coordinates.forEach(function (coordinate, i) {
                var marker = L.marker(coordinate);
                console.log(new Date(points.coordinates[0].date));
                if (i != 0 && i != points.coordinates.length - 1) {
                    marker.setIcon(new Icon({
                        iconUrl: __WEBPACK_IMPORTED_MODULE_8__providers_global_config__["b" /* imagesDir */] + "green-point.png",
                        iconAnchor: [2, 2]
                    }));
                    var pointDatePipe = new __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* DatePipe */](coordinate.date);
                    var popup = '<b>Heure:</b> ' + pointDatePipe.transform(coordinate.date, 'dd/MM/yyyy HH:mm:ss') + '<b><br>vitesse:</b> ' + coordinate.speed + ' Km/h';
                    marker.bindPopup(popup);
                    marker.on('click', function () {
                        _this.mapService.map.setView(coordinate, 17);
                    });
                    _this.mapService.addMarker(marker);
                }
            });
            var startMarker = L.marker({ lat: path.beginPathLatitude, lng: path.beginPathLongitude });
            var startTime = path.beginPathTime;
            var startDatePipe = new __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* DatePipe */](startTime);
            startMarker.bindPopup('<b> Lieu de début: </b>' + path.beginPathGeocoding + '<b></i><br>Temps de début du trajet : </b>' + startDatePipe.transform(startTime, 'dd/MM/yyyy HH:mm:ss'));
            startMarker.setIcon(new Icon({
                iconUrl: __WEBPACK_IMPORTED_MODULE_8__providers_global_config__["b" /* imagesDir */] + "startMarker.png",
                iconAnchor: [-2, 30],
                popupAnchor: [10, -25]
            }));
            _this.mapService.addMarker(startMarker);
            if (path.endPathLatitude != null && path.endPathLongitude != null && path.endPathTime != null) {
                var endMarker = L.marker({ lat: path.endPathLatitude, lng: path.endPathLongitude });
                var endTime = path.endPathTime;
                var endDatePipe = new __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* DatePipe */](endTime);
                endMarker.bindPopup('<b> Lieu de fin: </b>' + path.endPathGeocoding + '<br><b>Temps de fin du trajet : </b>' + endDatePipe.transform(endTime, 'dd/MM/yyyy HH:mm:ss')
                    + '<br><b> Durée du trajet : </b>' + path.pathDurationStr + "<br><b> Durée d'arrêt : </b>" + path.nextStopDurationStr + "<br><b> Vitesse maximum : </b>"
                    + path.maxSpeed + " Km/h <br><b> Kilometrage parcouru : </b>" + path.distanceDriven.toFixed(2) + ' Km');
                endMarker.setIcon(new Icon({
                    iconUrl: __WEBPACK_IMPORTED_MODULE_8__providers_global_config__["b" /* imagesDir */] + "endMarker.png",
                    iconAnchor: [-2, 30],
                    popupAnchor: [10, -25]
                }));
                _this.mapService.addMarker(endMarker);
            }
            _this.mapService.addPolyline(polyline);
            var middle = points.coordinates[Math.round((points.coordinates.length - 1) / 2)];
            _this.mapService.map.setView(middle, 12);
        });
    };
    Historical.prototype.ionViewDidLoad = function () {
        this.openFormModal();
    };
    Historical.prototype.processGeocoding = function (geocoding) {
        if (geocoding != null) {
            var array = geocoding.split(',', 3);
            var smallerGeocoding_1 = '';
            array.forEach(function (word) {
                smallerGeocoding_1 = smallerGeocoding_1 + ', ' + word;
            });
            smallerGeocoding_1 = smallerGeocoding_1.slice(2, smallerGeocoding_1.length);
            return smallerGeocoding_1;
        }
        else
            return null;
    };
    return Historical;
}());
Historical = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-historical',template:/*ion-inline-start:"C:\Users\MedJabrane\Desktop\Rimtelecom\rimtrack withoud local storage\rimtrack\src\pages\historical\historical.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Historique</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <ion-fab bottom left>\n        <button ion-fab (click)="openResultsModal()" color="light"><ion-icon name="list"></ion-icon></button>\n      </ion-fab>\n      <ion-fab bottom right>\n        <button ion-fab (click)="openFormModal()" color="primary"><ion-icon name="search"></ion-icon></button>\n      </ion-fab>\n  <div id="historicalMap" class="leaflet-pseudo-fullscreen leaflet-fullscreen-on" style="height: 93%!important; top: 7.5% !important;"></div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\MedJabrane\Desktop\Rimtelecom\rimtrack withoud local storage\rimtrack\src\pages\historical\historical.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_data_management_service__["a" /* DataManagementService */], __WEBPACK_IMPORTED_MODULE_4__providers_historical_service__["a" /* HistoricalService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__utils_map_service__["a" /* MapService */]])
], Historical);

//# sourceMappingURL=historical.js.map

/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoricalForm; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_historical_service__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HistoricalForm = (function () {
    function HistoricalForm(historicalService, viewCtrl, navCtrl, navParams, loadingCtrl) {
        this.historicalService = historicalService;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.init();
    }
    HistoricalForm.prototype.ionViewWillEnter = function () {
    };
    HistoricalForm.prototype.init = function () {
        this.loader = this.loadingCtrl.create({
            content: "Veuillez attendre..."
        });
        this.loader.present();
        this.loadGroups();
    };
    HistoricalForm.prototype.ionViewDidLoad = function () {
    };
    HistoricalForm.prototype.loadGroups = function () {
        var _this = this;
        this.allGroups = this.historicalService.getAllGroups().subscribe(function (groupes) {
            _this.groups = groupes;
            _this.selectedGroup = _this.groups[0];
            _this.vehicules = _this.selectedGroup.vehicules;
            if (_this.vehicules.length > 0 && _this.vehicules) {
                _this.selectedDeviceId = _this.vehicules[0].idDevice;
            }
            /*this.groups.forEach(group => {
              if(group.vehicules.length == 0 && this.groups != null){
                this.groups.splice(this.groups.indexOf(group));
              }
            });*/
            _this.loader.dismiss();
        });
    };
    HistoricalForm.prototype.chooseGroup = function (group) {
        var _this = this;
        this.selectedGroup = group;
        this.selectedGroupId = group;
        this.groups.forEach(function (gr) {
            if (gr.idGroupe == group) {
                _this.vehicules = gr.vehicules;
            }
        });
        if (this.vehicules.length > 0 && this.vehicules) {
            this.selectedDeviceId = this.vehicules[0].idDevice;
        }
    };
    HistoricalForm.prototype.chooseVehicule = function (vehiculeId) {
        this.selectedDeviceId = vehiculeId;
    };
    HistoricalForm.prototype.getAllPaths = function () {
        var date = new Date();
        this.firstDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
        this.lastDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
        this.viewCtrl.dismiss({ selectedDeviceId: this.selectedDeviceId, firstDate: this.firstDate, lastDate: this.lastDate });
    };
    HistoricalForm.prototype.modalDismiss = function () {
        this.viewCtrl.dismiss(null);
    };
    return HistoricalForm;
}());
HistoricalForm = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-historical-form',template:/*ion-inline-start:"C:\Users\MedJabrane\Desktop\Rimtelecom\rimtrack withoud local storage\rimtrack\src\pages\historical-form\historical-form.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title style="text-align: center">Selectionner le véhicule </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding text-center style="background-color: rgba(255, 255, 255, 0.69) !important;">\n  <ion-item style="margin-top: 200px">\n    <ion-label>Groupe</ion-label>\n    <ion-select [(ngModel)]="selectedGroupId" (ionChange)="chooseGroup($event)" multiple="false">\n      <ion-option *ngFor="let group of groups" value="{{group.idGroupe}}">{{group.nom}}</ion-option>\n    </ion-select>\n  </ion-item>\n  <ion-item style="margin-bottom: 5px" >\n    <ion-label>Véhicule</ion-label>\n    <ion-select [(ngModel)]="selectedDeviceId" (ionChange)="chooseVehicule($event)" multiple="false">\n      <ion-option *ngFor="let vehicule of vehicules" value="{{vehicule.idDevice}}">{{vehicule?.mark}}\n      </ion-option>\n    </ion-select>\n  </ion-item>\n  <!--<ion-item>\n    <ion-label>Date de début</ion-label>\n    <ion-datetime displayFormat="YYYY/MM/DD" [(ngModel)]="firstDate"></ion-datetime>\n  </ion-item>\n  <ion-item>\n    <ion-label>Date de fin</ion-label>\n    <ion-datetime displayFormat="YYYY/MM/DD" [(ngModel)]="lastDate"></ion-datetime>\n  </ion-item>-->\n  <button ion-button center round (click)="getAllPaths()">Chercher  \n      <!--<ion-icon style ="margin-left: 5px" name="search"></ion-icon>-->\n  </button>\n  <button ion-button center round (click)="modalDismiss()">Annuler  \n      <!--<ion-icon style="margin-left: 5px" name="close"></ion-icon>-->\n  </button>\n</ion-content>'/*ion-inline-end:"C:\Users\MedJabrane\Desktop\Rimtelecom\rimtrack withoud local storage\rimtrack\src\pages\historical-form\historical-form.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_historical_service__["a" /* HistoricalService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */]])
], HistoricalForm);

//# sourceMappingURL=historical-form.js.map

/***/ }),

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PathsList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PathsList = (function () {
    function PathsList(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.paths = navParams.get('paths');
    }
    PathsList.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PathsList');
    };
    PathsList.prototype.drawPath = function (path) {
        this.viewCtrl.dismiss(path);
    };
    PathsList.prototype.closeModal = function () {
        this.viewCtrl.dismiss(null);
    };
    return PathsList;
}());
PathsList = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-paths-list',template:/*ion-inline-start:"C:\Users\MedJabrane\Desktop\Rimtelecom\rimtrack withoud local storage\rimtrack\src\pages\paths-list\paths-list.html"*/'<!--\n  Generated template for the PathsList page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Liste des trajets</ion-title>\n    <ion-buttons end>\n            <button ion-button icon-only (click)="closeModal()">\n        <ion-icon name="arrow-down"></ion-icon>\n      </button>\n        </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding style="background-color: rgba(255, 255, 255, 0.69) !important;">\n  <div style = "overflow: auto ; height: auto;">\n  <table style="font-family: Consolas;font-size: 12px;" >\n    <thead>\n      <tr style="background-color: #F5F5F5;opacity: 0.85">\n        <th  style="text-align: center;"><i class="fa fa-clock-o" aria-hidden="true"></i> Date Départ\n        </th>\n        <th  style="text-align: center;padding-left: 15px;padding-right: 15px">Lieu Départ</th>\n        <th  style="text-align: center;padding-left: 15px;padding-right: 15px"><i class="fa fa-clock-o" aria-hidden="true"></i> Date Arrivée\n        </th>\n        <th style="text-align: center;padding-left: 15px;padding-right: 15px">Lieu Arrivée</th>\n        <th style="text-align: center; padding-right: 15px;padding-left: 15px">Kilométrage</th>\n        <th style="text-align: center; padding-right: 15px; padding-left: 15px">   V Max   </th>\n        <th style="text-align: center;padding-right: 15px; padding-left: 15px">Durée Trajet</th>\n        <th style="text-align: center;padding-right: 15px; padding-left: 15px">Durée Arrêt</th>\n      </tr>\n    </thead>\n    <tbody style="background-color: #FFFAFA;opacity: 0.7;font: bolder;">\n      <tr *ngFor="let path of paths" (click)="drawPath(path)" style="border-top: solid black 1px;">\n        <td style="text-align: center;padding-left: 15px;padding-right: 15px" data-toggle="tooltip" title="{{path.beginPathTime}};">\n          {{path.displayBeginPathTime}}\n        </td>\n        <td style="text-align: center;padding-left: 15px;padding-right: 15px" data-toggle="tooltip" title="{{path.beginPathGeocodingDetails}}">\n          {{path.beginPathGeocoding}}\n        </td>\n        <td style="text-align: center;padding-left: 15px;padding-right: 15px" data-toggle="tooltip" title="{{path.endPathTime}}">\n          {{path.displayEndPathTime}}\n        </td>\n        <td style="text-align: center;padding-left: 15px;padding-right: 15px" data-toggle="tooltip" title="{{path.endPathGeocodingDetails}}">\n          {{path.endPathGeocoding}}\n        </td>\n        <td style="text-align: center;padding-left: 15px;padding-right: 15px" data-toggle="tooltip" title="{{path.distanceDriven">{{path.distanceDriven | number:\'1.2-2\'}}\n        </td>\n        <td style="text-align: center;padding-left: 15px;padding-right: 15px" data-toggle="tooltip" title="{{path.maxSpeed}}">\n          {{path.maxSpeed}}\n        </td>\n        <td style="text-align: center;padding-left: 15px;padding-right: 15px" data-toggle="tooltip" title="{{path.pathDurationStr}}">\n          {{path.pathDurationStr}}\n        </td>\n        <td style="text-align: center;padding-left: 15px;padding-right: 15px" data-toggle="tooltip" title="{{path.nextStopDurationStr}}">\n          {{path.nextStopDurationStr}}\n        </td>\n      </tr>\n    </tbody>\n  </table>\n  </div>\n</ion-content>'/*ion-inline-end:"C:\Users\MedJabrane\Desktop\Rimtelecom\rimtrack withoud local storage\rimtrack\src\pages\paths-list\paths-list.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ViewController */]])
], PathsList);

//# sourceMappingURL=paths-list.js.map

/***/ }),

/***/ 265:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(270);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_login__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_map_page_map_page__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_historical_historical__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_real_time_real_time__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_groups_page_groups_page__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_historical_form_historical_form__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_paths_list_paths_list__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__utils_geocoding_service__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__utils_map_service__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_real_time_service__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_historical_service__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_data_management_service__ = __webpack_require__(74);
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
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_map_page_map_page__["a" /* MapPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_historical_historical__["a" /* Historical */],
            __WEBPACK_IMPORTED_MODULE_12__pages_real_time_real_time__["a" /* RealTime */],
            __WEBPACK_IMPORTED_MODULE_13__pages_groups_page_groups_page__["a" /* GroupsPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_historical_form_historical_form__["a" /* HistoricalForm */],
            __WEBPACK_IMPORTED_MODULE_15__pages_paths_list_paths_list__["a" /* PathsList */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */])
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_map_page_map_page__["a" /* MapPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_historical_historical__["a" /* Historical */],
            __WEBPACK_IMPORTED_MODULE_12__pages_real_time_real_time__["a" /* RealTime */],
            __WEBPACK_IMPORTED_MODULE_13__pages_groups_page_groups_page__["a" /* GroupsPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_historical_form_historical_form__["a" /* HistoricalForm */],
            __WEBPACK_IMPORTED_MODULE_15__pages_paths_list_paths_list__["a" /* PathsList */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_9__providers_login__["a" /* Login */],
            __WEBPACK_IMPORTED_MODULE_16__utils_geocoding_service__["a" /* GeocodingService */],
            __WEBPACK_IMPORTED_MODULE_17__utils_map_service__["a" /* MapService */],
            __WEBPACK_IMPORTED_MODULE_18__providers_real_time_service__["a" /* RealTimeService */],
            __WEBPACK_IMPORTED_MODULE_20__providers_data_management_service__["a" /* DataManagementService */],
            __WEBPACK_IMPORTED_MODULE_19__providers_historical_service__["a" /* HistoricalService */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common__["d" /* DecimalPipe */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(234);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\MedJabrane\Desktop\Rimtelecom\rimtrack withoud local storage\rimtrack\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\MedJabrane\Desktop\Rimtelecom\rimtrack withoud local storage\rimtrack\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return contentHeaders; });
/* harmony export (immutable) */ __webpack_exports__["b"] = createAuthorizationHeader;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(42);

var contentHeaders = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');
function createAuthorizationHeader(headers) {
    headers.append('Authorization', localStorage.getItem('id_token'));
}
//# sourceMappingURL=headers.js.map

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RealTimeRecord; });
/* unused harmony export Group */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Vehicule; });
var RealTimeRecord = (function () {
    function RealTimeRecord() {
        this.vehicule = null;
        this.geocoding = "Chargement..";
        this.geocodingDetails = 'Chargement..';
        this.speed = 0;
        this.recordTime = new Date();
        this.coordinate = { lat: 0, lng: 0 };
        this.realTimeRecordStatus = '';
        this.rotationAngle = 0;
    }
    return RealTimeRecord;
}());

var Group = (function () {
    function Group() {
    }
    return Group;
}());

var Vehicule = (function () {
    function Vehicule() {
        this.realTimeRecord = new RealTimeRecord();
    }
    return Vehicule;
}());

//# sourceMappingURL=real-time.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return dns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return imagesDir; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return nominatim_dns; });
//export var dns: string = "http://79.137.75.178:8080/ws_rimtrack_all_dev/";
//export var dns: string = "http://localhost:8080/rimtrack-all-v2/";
var dns = "http://37.187.171.84:8080/ws_rimtrack_all/";
var imagesDir = "http://79.137.75.178:8080/images/";
var nominatim_dns = "http://37.187.171.84/nominatim";
//# sourceMappingURL=global.config.js.map

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RealTimeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global_config__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RealTimeService = (function () {
    function RealTimeService(_http) {
        this._http = _http;
    }
    RealTimeService.prototype.getRealTimeRecord = function (deviceId) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Authorization', this.token);
        return this._http.get(__WEBPACK_IMPORTED_MODULE_3__global_config__["a" /* dns */] + 'realTimeRecords/' + deviceId, { headers: headers }).map(function (res) { return res.json(); });
    };
    RealTimeService.prototype.getAllPois = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Authorization', this.token);
        return this._http.get(__WEBPACK_IMPORTED_MODULE_3__global_config__["a" /* dns */] + 'pointInterests/dtos', { headers: headers }).map(function (res) { return res.json(); });
    };
    RealTimeService.prototype.getAllRealTimeRecords = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Authorization', this.token);
        return this._http.get(__WEBPACK_IMPORTED_MODULE_3__global_config__["a" /* dns */] + 'realTimeRecords', { headers: headers }).map(function (res) { return res.json(); });
    };
    RealTimeService.prototype.getAllGroups = function (keyword) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Authorization', this.token);
        return this._http.get(__WEBPACK_IMPORTED_MODULE_3__global_config__["a" /* dns */] + 'groupes/details?keyword=' + keyword, { headers: headers }).map(function (res) { return res.json(); });
    };
    RealTimeService.prototype.getCurrentPath = function (deviceId) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Authorization', this.token);
        return this._http.post(__WEBPACK_IMPORTED_MODULE_3__global_config__["a" /* dns */] + 'paths/currentPath/' + deviceId, null, { headers: headers }).map(function (res) { return res.json(); });
    };
    return RealTimeService;
}());
RealTimeService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
], RealTimeService);

//# sourceMappingURL=real-time.service.js.map

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataManagementService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global_config__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DataManagementService = (function () {
    function DataManagementService(_http) {
        this._http = _http;
        this.pointInterests = null;
        this.groups = null;
        this.selectedGroup = null;
        this.selectedVehiculeId = null;
    }
    DataManagementService.prototype.inverseGeoconding = function (latitude, longitude, zoom) {
        return this._http.get(__WEBPACK_IMPORTED_MODULE_3__global_config__["c" /* nominatim_dns */] + '/reverse.php?format=json&lat=' + latitude + '&lon=' + longitude + '&zoom=' + zoom + '&accept-language=fr&addressdetails=1').map(function (res) { return res.json(); });
    };
    DataManagementService.prototype.getAllPointInterests = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Authorization', this.token);
        return this._http.get(__WEBPACK_IMPORTED_MODULE_3__global_config__["a" /* dns */] + 'pointInterests', { headers: headers }).map(function (res) { return res.json(); });
    };
    DataManagementService.prototype.addPointInterest = function (pointInterest) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Authorization', this.token);
        return this._http.post(__WEBPACK_IMPORTED_MODULE_3__global_config__["a" /* dns */] + 'pointInterests', pointInterest, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataManagementService.prototype.getAllGroups = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Authorization', this.token);
        return this._http.get(__WEBPACK_IMPORTED_MODULE_3__global_config__["a" /* dns */] + 'groupes/minify', { headers: headers }).map(function (res) { return res.json(); });
    };
    // must exe only if pointInterests not NULL !!!
    DataManagementService.prototype.getRelativePosition = function (lat, lng) {
        var _this = this;
        var relativePosition = null;
        this.pointInterests.forEach(function (pointInterest) {
            var distance = _this.distance(lat, lng, pointInterest.coordinate.lat, pointInterest.coordinate.lng);
            if (distance < pointInterest.ray / 1000) {
                relativePosition = pointInterest.name;
            }
            /*if (distance > pointInterest.ray / 1000 && distance < 0.1) {
                relativePosition = Math.round(distance * 1000) + " metre de " + pointInterest.name;
            }*/
            if (distance > pointInterest.ray / 1000 && distance < 0.2) {
                var distanceStr = distance.toString().substr(0, 4);
                relativePosition = "à " + distanceStr + " Km de " + pointInterest.name;
            }
        });
        return relativePosition;
    };
    DataManagementService.prototype.distance = function (lat1, lon1, lat2, lon2) {
        var p = 0.017453292519943295; // Math.PI / 180
        var c = Math.cos;
        var a = 0.5 - c((lat2 - lat1) * p) / 2 +
            c(lat1 * p) * c(lat2 * p) *
                (1 - c((lon2 - lon1) * p)) / 2;
        var distance = 12742 * Math.asin(Math.sqrt(a));
        return distance;
    };
    DataManagementService.prototype.getDriverName = function (driver) {
        if (driver) {
            if (driver.firstName && driver.lastName) {
                return driver.firstName + ' ' + driver.lastName;
            }
            else if (driver.firstName) {
                return driver.firstName;
            }
            else if (driver.lastName) {
                return driver.lastName;
            }
            else
                return "anonyme";
        }
        else
            return "pas de chauffeur";
    };
    return DataManagementService;
}());
DataManagementService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
], DataManagementService);

//# sourceMappingURL=data-management.service.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoricalService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global_config__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HistoricalService = (function () {
    function HistoricalService(_http) {
        this._http = _http;
    }
    HistoricalService.prototype.getAllGroups = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Authorization', this.token);
        return this._http.get(__WEBPACK_IMPORTED_MODULE_3__global_config__["a" /* dns */] + 'groupes/minify', { headers: headers }).map(function (res) { return res.json(); });
    };
    HistoricalService.prototype.getAllPaths = function (deviceId, dateInterval) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Authorization', this.token);
        return this._http.post(__WEBPACK_IMPORTED_MODULE_3__global_config__["a" /* dns */] + 'paths/' + deviceId, dateInterval, { headers: headers }).map(function (res) { return res.json(); });
    };
    HistoricalService.prototype.getCurrentPath = function (deviceId) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Authorization', this.token);
        return this._http.post(__WEBPACK_IMPORTED_MODULE_3__global_config__["a" /* dns */] + 'paths/currentPath/' + deviceId, null, { headers: headers }).map(function (res) { return res.json(); });
    };
    HistoricalService.prototype.getPathDetails = function (deviceId, dateInterval) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Accept': 'application/json' });
        headers.append('Authorization', this.token);
        return this._http.post(__WEBPACK_IMPORTED_MODULE_3__global_config__["a" /* dns */] + 'paths/details/' + deviceId, dateInterval, { headers: headers }).map(function (res) { return res.json(); });
    };
    return HistoricalService;
}());
HistoricalService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
], HistoricalService);

//# sourceMappingURL=historical.service.js.map

/***/ })

},[265]);
//# sourceMappingURL=main.js.map