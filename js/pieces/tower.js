class Tower {
    constructor(position, color, args){
        this.position = position;
        this.color = color;
       
        this.allpositions = [{position: position}];

        this.item = document.createElement("div");
        this.item.className = `piece ${this.color}-tower`;
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
        // if(this.chessClass.getPlayer() == this.color){
            this.chessClass.removePossible();
            this.possibleMoveProcess();
            // this.possibleKillProcess();
        // }
    }

    possibleMoveProcess(){

        let findUp = false, findDown = false;
        for (let i = parseInt(this.position[1]); i <= 8 ; i++) {
            findUp = this.addMove(i, findUp);
        }

        for (let i = parseInt(this.position[1]); i >= 1 ; i--) {
            findDown = this.addMove(i, findDown);
        }
        

        for (let l of this.chessClass.letters()) {
            console.log(l);
        }
        // let op = "+", initPosition = "2";
        // if(this.color != "white"){
        //     op = "-";
        //     initPosition = "7";
        // }
        // let quantly = (this.position[1] == initPosition) ? "2" : "1";

        // for (let i = 1; i <= parseInt(quantly); i++) {
        //     let operation = op+i;
        //     let arg = `${this.position[0]}${eval(parseInt(this.position[1])+operation)}`;
        //     let possibleMove = document.querySelector(`.box[position="${arg}"]`);
        //     if(!possibleMove.firstChild){
        //         possibleMove.onclick = this.move.bind(this, arg);
        //         possibleMove.classList.add("possiblemove");
        //     }
        // }
    }

    addMove(i, find){
        let arg = `${this.position[0]}${i}`;
        let possibleMove = document.querySelector(`.box[position="${arg}"]`);
        if(!find){
            if(!possibleMove.firstChild){
                possibleMove.onclick = this.move.bind(this, arg);
                possibleMove.classList.add("possiblemove");
            } else {
                if(this.item != possibleMove.firstChild)
                    find = true;
                    
                if(possibleMove.firstChild.classList[1].split("-")[0] != this.color){
                    possibleMove.classList.add("possiblekill");
                }
                
            }
        }
        return find;
    }



    // possibleKillProcess(){
    //     let positions = ["left", "right"];
    //     let colorKill = "black", operator = "+";
    //     if(this.color == "black"){
    //         colorKill = "white";
    //         operator = "-";
    //     }
        
    //     for (let p of positions) {
    //         let op = (p == "left") ? "-1" : "+1";
    //         let searchLetter = eval(this.chessClass.letters().indexOf(this.position[0])+op);
    //         let letter = this.chessClass.letters()[searchLetter];
    //         if(searchLetter !== -1 && letter != null){
    //             let arg = `${letter}${eval(parseInt(this.position[1])+operator+"1")}`;
    //             let killItem = document.querySelector(`.box[position="${arg}"]`);
    //             if(killItem.firstChild){
    //                 if(killItem.firstChild.classList.value.indexOf(colorKill) !== -1){
    //                     killItem.onclick = this.kill.bind(this, arg);
    //                     killItem.classList.add("possiblekill");
    //                 }
    //             }
    //         }
    //     }
        
    // }

    // kill(newposition){
    //     this.position = newposition;
    //     let box = document.querySelector(`.box[position="${this.position}"]`);
    //     this.allpositions.push({position: this.position, kill: box.firstChild.classList[1]});
    //     box.firstChild.remove();
    //     box.appendChild(this.item);
    //     this.chessClass.removePossible();
    //     this.chessClass.changePlayer();
    // }

    


}