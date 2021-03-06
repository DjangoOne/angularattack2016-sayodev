"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var card_collection_1 = require('../card-collection');
var ui_overlay_1 = require('../ui-overlay');
var chat_1 = require('../chat');
var BoardComponent = (function () {
    function BoardComponent() {
        this.chat_opened = false;
        this.username_supplied = false;
    }
    BoardComponent.prototype.ngOnInit = function () {
    };
    BoardComponent.prototype.toggleChat = function () {
        this.chat_opened = !this.chat_opened;
    };
    BoardComponent.prototype.closeChat = function () {
        this.chat_opened = false;
    };
    BoardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'board',
            templateUrl: 'board.component.html',
            styleUrls: ['board.component.css'],
            directives: [card_collection_1.CardCollectionComponent, ui_overlay_1.UiOverlayComponent, chat_1.ChatComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], BoardComponent);
    return BoardComponent;
}());
exports.BoardComponent = BoardComponent;
//# sourceMappingURL=board.component.js.map