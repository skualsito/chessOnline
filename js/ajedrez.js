class Chess {
  constructor(){
    this.whitePieces = [];
    this.blackPieces = [];
    this.letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  }

  initialize(){
    for (let l of this.letters) {
      this.whitePieces.push(new Pawn(`${l}2`, "white"));
      this.blackPieces.push(new Pawn(`${l}7`, "black"));
    }
  }

  pieceClick(obj){
    //$('.piece').removeClass("active");
    obj.classList.add("active");
    let th = obj;
    this.whitePieces.find(e=>e.position == th.closest(".box").closest(".box").getAttribute("position")).possibleMove();
  }

}