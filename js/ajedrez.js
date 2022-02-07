class Chess {
  constructor(){
    this.whitePieces = [];
    this.blackPieces = [];
    this.__letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
    this.player = "white";
  }

  initialize(){
    this.loadPawns();
    this.loadTowers();
  }

  loadPawns(){
    var script = document.createElement('script');
    let obj = this;
    script.onload = function() {
      for (let l of obj.__letters) {
        obj.whitePieces.push(new Pawn(`${l}2`, "white", obj));
        obj.blackPieces.push(new Pawn(`${l}7`, "black", obj));
      }
    };
    script.src = "js/pieces/pawn.js";
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  loadTowers(){
    let towers = [{position: "A1", color: "white"}, {position: "H1", color: "white"}, {position: "A8", color: "black"}, {position: "H8", color: "black"}];
    var script = document.createElement('script');
    let obj = this;
    script.onload = function() {
      for (let t of towers) {
        let item = new Tower(t.position, t.color, obj);
        if(t.color == "white"){
          obj.whitePieces.push(item);
        } else {
          obj.blackPieces.push(item);
        }
        
      }
    };
    script.src = "js/pieces/tower.js";
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  letters(){
    return this.__letters;
  }

  changePlayer() { 
    this.player = (this.player == "white") ? "black" : "white"; 
  }

  getPlayer(){
    return this.player;
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

  // move(newposition, item){
  //   this.position = newposition;
  //   document.querySelector(`.box[position="${this.position}"]`).appendChild(item);
  //   this.removePossible();
  //   this.changePlayer();
  // }


}
