const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, ts, data, ph = ''){
        this.index = index;
        this.ts = ts;
        this.data = data;
        this.ph = ph;
        this.hash = this.calculateHash();
    }
    calculateHash(){
     return SHA256(this.index + this.ts + this.ph + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock(){
        return new Block(0, "01,05,2018", "Genesis block" ,"0");
    }

    getlatestblock(){
        return this.chain[this.chain.length -1];
    }

    addblock(newblock){
        newblock.ph= this.getlatestblock().hash;
        newblock.hash = newblock.calculateHash();
        this.chain.push(newblock);
    }
}

let coin = new Blockchain();
coin.addblock(new Block(1, "ugsvuqb", {amount :4}));
coin.addblock(new Block(2, "ufewwfb", {amount :3}));
coin.addblock(new Block(3, "wfewqfb", {amount :44}));
coin.addblock(new Block(4, "ugwtwtb", {amount :555}));

console.log(JSON.stringify(coin, null, 5));
