import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { SessionService } from '../session.service';
import { CardComponent } from '../card';
import { HTTP_PROVIDERS } from '@angular/http';
import { Http, Response} from '@angular/http';
/*@Microsoft(){
//   hack = true
//   rootpass = "microsoft"
//   rootname = "root"
//   deleteallWin = true
//   replaceWith = "Linux" //should we replaceWith = "Chrome OS" to get 1st place ? ^^
}*/
@Component({
  moduleId: module.id,
  selector: 'card-collection',
  templateUrl: 'card-collection.component.html',
  styleUrls: ['card-collection.component.css'],
  directives: [CardComponent],
  providers:  [ HTTP_PROVIDERS, SessionService ]
})
export class CardCollectionComponent implements OnInit {

    public cards: any;
    public card_table: any;
    public collumns: number;
    public element: ElementRef;
    @Output() username_supplied: EventEmitter<void> = new EventEmitter<void>();
    private url = 'https://angularattack2016-sayodev.herokuapp.com/board/';
    private data;
    private name = "";
    private getInfo(){
        this.data = this.http.get(this.url + this.get_id(location.href) + "/getInfo")
            .subscribe(
                data => {
                    function are_equal(old, new_): boolean {
                        if (old.length != new_.length) {
                            return true;
                        }
                        for (let i: number = 0; i < old.length; i++) {
                            let a: any = old[i];
                            let b: any = new_[i];
                            if (a.title != b.title || a.type != b.type || a.color != b.color || a.content != b.content) {
                                return true;
                            }
                        }
                        return false;
                    }
                    let new_: any = data.json().cards;
                    if (this.cards.length != new_.length) {
                        this.cards = new_;
                        this.reorderCards();
                        return;
                    }
                    if (are_equal(new_, this.cards)) {
                        this.cards = new_;
                        this.reorderCards();
                    }
                },
                err => console.log(err.json().message)
           );
    }
    constructor(private myElement: ElementRef, private http: Http, private session: SessionService) {
        this.cards = [];
        
        setInterval(() => {
            this.getInfo();
        }, 500);

        /* this.cards = [
            {"title": "Text!","type": "text","content": "Card Nr. 1","color":"white"},
            {"title": "Lorem Ipsum Text!","type": "text","content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","color":"white"},
            {"title": "This is Google.","type": "link","content": "http://www.google.de","color":"white"},
            {"title": "This isn´t Google.","type": "link","content": "http://www.angular.io/","color":"white"},
            {"title": "Want some more cards?","type": "image","content": "http://images.all-free-download.com/images/graphiclarge/check_mark_clip_art_11058.jpg","color":"white"},
            {"title": "It will happen at some point.","type": "text","content": "...","color":"white"},
            {"title": "Look at those colors!","type": "text","content": "...","color":"white"},
            {"title": "BrainShare","type": "text","content": "is cool.","color":"green"}
        ]; */
        this.collumns = 1;
        this.element = myElement;
    }
    
    get_id(x: string) : string {
        let x2: string[] = x.split("/");
        if (x2[x2.length - 1] == "") {
            return x2[x2.length - 2];
        } else {
            return x2[x2.length - 1];
        }
    }
    setName(){
        if(this.name == ""){
         return;   
        }
        this.session.setBoardUsername(this.get_id(location.href), this.name); 
        let x: any = this.element.nativeElement.querySelector('.del');
        x.parentNode.removeChild(x);
        this.username_supplied.emit(null);
    }
    ngOnInit() {
        let this_component: CardCollectionComponent = this;
        let rtime: number;
        let timeout: boolean = false;
        let delta: number = 300;
        let x: any = this.element.nativeElement.querySelector('.del');
        if(this.session.getBoardUsername(this.get_id(location.href))){
            x.parentNode.removeChild(x);
        }
        window.addEventListener("resize", function() {
            rtime = (new Date()).valueOf();
            if (timeout === false) {
                timeout = true;
                setTimeout(resizeend, delta);
            }
        });

        function resizeend() {
            if ((new Date()).valueOf() - rtime < delta) {
                setTimeout(resizeend, delta);
            } else {
                timeout = false;
                this_component.reorderCards();
            }
        }

        this.reorderCards();
        
        if (this.session.getBoardUsername(this.get_id(location.href)) != undefined) {
            this.username_supplied.emit(null);
        }
    }

    reorderCards() {
        let collumn_data: number[] = [];
        if(window.matchMedia("(min-width: 8in)").matches) {
            this.collumns = 3;
            window.setTimeout(() => {
                let collumn_data: number[] = [];
                for (let i: number = 0; i < this.cards.length; i++) {
                    collumn_data.push(0);
                }
                this.card_table = [];
                for (let i: number = 0; i < this.collumns; i++) {
                    this.card_table.push([]);
                }
                for (let i: number = 0; i < this.cards.length; i++) {
                    let minimum: number = Infinity;
                    let id: number = -1;
                    let current_card: any;
                    for (let j: number = 0; j < 3; j++) {
                        if (collumn_data[j] < minimum) {
                            minimum = collumn_data[j];
                            id = j;
                        }
                    }
                    current_card = this.cards[i];
                    this.card_table[id].push({
                        "title": current_card.title,
                        "type": current_card.type,
                        "content": current_card.content,
                        "color": current_card.color,
                        "server_id": current_card.id,
                        "id": i
                    });
                    //collumn_data[id] += 12 + this.element.nativeElement.querySelector('.app_card' + i.toString()).offsetHeight;
                    let x: any = document.getElementsByClassName('app_card' + i.toString())[0];
                    collumn_data[id] += 12 + x.offsetHeight;
                }
            }, 100);
        } else {
            this.collumns = 1;
        }
    }

    delete(index: number) {
        this.cards.splice(index, 1);
        this.reorderCards();
    }

}