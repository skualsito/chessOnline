class Horse {
    constructor(position, color, args){
        this.position = position;
        this.color = color;
       
        this.allpositions = [{position: position}];

        this.item = document.createElement("div");
        this.item.className = `piece ${this.color}-horse`;
        this.item.onclick = this.possibleMove.bind(this);
        document.querySelector(`.box[position="${this.position}"]`).appendChild(this.item);
        this.chessClass = args;
        
        
    }

    

    possibleMove(){
        if(this.chessClass.getPlayer() == this.color){
            this.chessClass.removePossible();
            this.possibleMoveProcess();
        }
    }

    possibleMoveProcess(){

        let letters = this.chessClass.letters();
        let letterPos = letters.indexOf(this.position[0]);
        this.addMove(`${letters[letterPos+1]}${parseInt(this.position[1])+2}`);
        this.addMove(`${letters[letterPos+1]}${parseInt(this.position[1])-2}`);
        this.addMove(`${letters[letterPos-1]}${parseInt(this.position[1])+2}`);
        this.addMove(`${letters[letterPos-1]}${parseInt(this.position[1])-2}`);
        this.addMove(`${letters[letterPos-2]}${parseInt(this.position[1])-1}`);
        this.addMove(`${letters[letterPos-2]}${parseInt(this.position[1])+1}`);
        this.addMove(`${letters[letterPos+2]}${parseInt(this.position[1])-1}`);
        this.addMove(`${letters[letterPos+2]}${parseInt(this.position[1])+1}`);



    }

    addMove(arg){
        let possibleMove = document.querySelector(`.box[position="${arg}"]`);
        if(possibleMove){
            if(!possibleMove.firstChild){
                possibleMove.onclick = this.move.bind(this, arg);
                possibleMove.classList.add("possiblemove");
            } else {
                    
                if(possibleMove.firstChild.classList[1].split("-")[0] != this.color){
                    possibleMove.onclick = this.kill.bind(this, arg);
                    possibleMove.classList.add("possiblekill");
                }
                
            }
        }
    }


    kill(newposition){
        this.position = newposition;
        let box = document.querySelector(`.box[position="${this.position}"]`);
        this.allpositions.push({position: this.position, kill: box.firstChild.classList[1]});
        box.firstChild.remove();
        box.appendChild(this.item);
        this.chessClass.removePossible();
        this.chessClass.changePlayer();
    }

    move(newposition){
        this.position = newposition;
        this.allpositions.push({position: this.position});
        document.querySelector(`.box[position="${this.position}"]`).appendChild(this.item);
        this.chessClass.removePossible();
        this.chessClass.changePlayer();
    }

    


}