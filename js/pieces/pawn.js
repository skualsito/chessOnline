
class Pawn {
    constructor(obj, position, color){
        this.position = position;
        this.color = color;
        this.allpositions = [];
        this.html = `<div class="piece ${this.color}-pawn"></div>`;
        obj.html(this.html); 
        this.allpositions.push(position);
        
    }

    move(newposition){
        $(`.box[position="${this.position}"]`).html("");        
        this.position = newposition;
        this.allpositions.push(this.position);
        $(`.box[position="${this.position}"]`).html(this.html);
        $(`.box`).removeClass("possiblemove");
    }

    possibleMove(){
        switch (this.color) {
            case "white":
                    if(this.position[1] == 2)
                        $(`.box[position="${this.position[0]}${parseInt(this.position[1])+2}"]`).addClass("possiblemove");
                    $(`.box[position="${this.position[0]}${parseInt(this.position[1])+1}"]`).addClass("possiblemove");
            break;
        
            case "black":
                if(this.position[1] == 7)
                    $(`.box[position="${this.position[0]}${parseInt(this.position[1])-2}"]`).addClass("possiblemove");
                $(`.box[position="${this.position[0]}${parseInt(this.position[1])-1}"]`).addClass("possiblemove");
            break;
        }
    }
}