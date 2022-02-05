class Pawn {
    constructor(position, color){
        this.position = position;
        this.color = color;
       
        this.allpositions = [{position: position}];

        this.html = `<div class="piece ${this.color}-pawn"></div>`;
        this.item = document.createElement("div");
        this.item.className = `piece ${this.color}-pawn`;
        this.item.onclick = this.possibleMove.bind(this);
        document.querySelector(`.box[position="${this.position}"]`).appendChild(this.item);

        this.letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

        
        
    }

    move(newposition){
        this.position = newposition;
        this.allpositions.push({position: this.position});
        document.querySelector(`.box[position="${this.position}"]`).appendChild(this.item);
        this.removePossible();
        
    }

    possibleMove(){
        this.removePossible();
        switch (this.color) {
            case "white":

                let arg = `${this.position[0]}${parseInt(this.position[1])+1}`;
                let possibleMove = document.querySelector(`.box[position="${arg}"]`);
                if(!possibleMove.firstChild){
                    possibleMove.onclick = this.move.bind(this, arg);
                    possibleMove.classList.add("possiblemove");
                }
                

                if(this.position[1] == 2) {
                    arg = `${this.position[0]}${parseInt(this.position[1])+2}`;
                    let possibleMove2 = document.querySelector(`.box[position="${arg}"]`);
                    if(!possibleMove2.firstChild){
                        possibleMove2.onclick = this.move.bind(this, arg);
                        possibleMove2.classList.add("possiblemove");
                    }
                }

                let killLeft, killRight;
                let searchLetter1 = this.letters.indexOf(this.position[0])-1;
                if(searchLetter1 !== -1){
                    arg = `${this.letters[searchLetter1]}${parseInt(this.position[1])+1}`;
                    killLeft = document.querySelector(`.box[position="${arg}"]`);
                    if(killLeft.firstChild){
                        if(killLeft.firstChild.classList.value.indexOf("black") !== -1){
                            killLeft.onclick = this.possibleKill.bind(this, arg);
                            killLeft.classList.add("possiblekill");
                        }
                    }
                }
                    
                let searchLetter2 = this.letters.indexOf(this.position[0])+1;
                if(searchLetter2 !== -1){
                    arg = `${this.letters[searchLetter2]}${parseInt(this.position[1])+1}`;
                    killRight = document.querySelector(`.box[position="${arg}"]`);
                    if(killRight.firstChild){
                        if(killRight.firstChild.classList.value.indexOf("black") !== -1){
                            killRight.onclick = this.possibleKill.bind(this, arg);
                            killRight.classList.add("possiblekill");
                        }
                    }
                    
                }
                    
                    
                
            break;
        
            case "black":
                if(this.position[1] == 7)
                    document.querySelector(`.box[position="${this.position[0]}${parseInt(this.position[1])-2}"]`).classList.add("possiblemove");
                    
                document.querySelector(`.box[position="${this.position[0]}${parseInt(this.position[1])-1}"]`).classList.add("possiblemove");
            break;
        }
        
    }

    possibleKill(newposition){
        this.position = newposition;
        let box = document.querySelector(`.box[position="${this.position}"]`);
        this.allpositions.push({position: this.position, kill: box.firstChild.classList[1]});
        box.firstChild.remove();
        box.appendChild(this.item);
        
        this.removePossible();
    }

    removePossible(){
        let classList = ["possiblemove", "possiblekill"];
        for (let c of classList) {
            document.querySelectorAll(`.${c}`).forEach(item => {
                if(item){
                    item.classList.remove(c);
                    item.onclick = function() {
                        return false;
                    }
                }
            })
        }
    }
}