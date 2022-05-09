class King {
    constructor(position, color, args){
        this.position = position;
        this.color = color;
       
        this.allpositions = [{position: position}];

        this.item = document.createElement("div");
        this.item.className = `piece ${this.color}-king`;
        this.item.onclick = this.possibleMove.bind(this);
        document.querySelector(`.box[position="${this.position}"]`).appendChild(this.item);
        this.chessClass = args;
        
        
    }

    move(newposition){
        this.position = newposition;
        this.allpositions.push({position: this.position});
        document.querySelector(`.box[position="${this.position}"]`).appendChild(this.item);
        this.chessClass.removePossible();
        this.chessClass.changePlayer();
    }

    possibleMove(){
        if(this.chessClass.getPlayer() == this.color){
            this.chessClass.removePossible();
            this.possibleMoveProcess();
        }
    }

    possibleMoveProcess(){

        let i = parseInt(this.position[1])+1;
        let letter = this.chessClass.letters();
            // if(i <= 8){
                this.addMove(`${letter[letter.indexOf(this.position[0])-1]}${parseInt(this.position[1])+1}`);
                this.addMove(`${letter[letter.indexOf(this.position[0])+1]}${parseInt(this.position[1])-1}`);

            // }
            // if(i >= 1){
            //     this.addMove(`${this.chessClass.letters()[1]}${i}`);
            //     this.addMove(`${this.chessClass.letters()[1]}${i}`);

            // }

        // for (let i = parseInt(this.position[1]); i <= 8 ; i++) {
        //     findUp = this.addMove(`${this.position[0]}${i}`, findUp);
        // }

        // for (let i = parseInt(this.position[1]); i >= 1 ; i--) {
        //     findDown = this.addMove(`${this.position[0]}${i}`, findDown);
        // }

        // for (let i = parseInt(this.chessClass.letters().indexOf(this.position[0])); i >= 0 ; i--) {
        //     findLeft = this.addMove(`${this.chessClass.letters()[i]}${this.position[1]}`, findLeft);
        // }

        // for (let i = parseInt(this.chessClass.letters().indexOf(this.position[0])); i <= 7 ; i++) {
        //     findRight = this.addMove(`${this.chessClass.letters()[i]}${this.position[1]}`, findRight);
        // }



    }

    addMove(arg){
        let possibleMove = document.querySelector(`.box[position="${arg}"]`);
            if(!possibleMove.firstChild){
                possibleMove.onclick = this.move.bind(this, arg);
                possibleMove.classList.add("possiblemove");
            } else {
                if(this.item != possibleMove.firstChild)
                    if(possibleMove.firstChild.classList[1].split("-")[0] != this.color){
                        possibleMove.onclick = this.kill.bind(this, arg);
                        possibleMove.classList.add("possiblekill");
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

    


}