
function BoxService() {
  this.boxes = [{ value: 1 }];
  this.boxSubject = new Rx.ReplaySubject();
  this.boxSubject.onNext(this.boxes);
}
BoxService.prototype.add = function add() {
  this.boxes.push({ value: this.boxes.length + 1 });
  this.boxSubject.onNext(this.boxes);
};

var boxValue = angular.
  Component({
    selector: 'box-value',
    properties: ['myvalue']
  }).
  View({
    templateUrl: './box-value.html'
  }).
  Class({
    constructor: [BoxService, function(boxService) {
      this.boxService = boxService;
    }]
});

var boxList = angular.
  Component({
    selector: 'box-list',
    properties: ['boxes']
  }).
  View({
    templateUrl: './box-list.html',
    directives: [angular.NgFor, boxValue]
  }).
  Class({
    constructor: [BoxService, function(boxService) {
      this.boxService = boxService;      
      this.myvalue = boxService.boxes.length;
    }]
  });

var boxApp = angular.
  Component({
    selector: 'box-app',
    appInjector: [BoxService]
  }).
  View({
    templateUrl: './box-app.html',
    directives: [boxList]
  }).
  Class({
    constructor: [BoxService, function(boxService) {
      boxService.boxSubject.subscribe(function(boxes) {
        this.boxes = boxes;
      }.bind(this));
    }]
  }); 

angular.bootstrap(boxApp);
