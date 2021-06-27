var randomOperations = require("../randomOperations");

var rn = randomOperations.randomNumber;
var rnft = randomOperations.randomNumberFromTo;
var rp = randomOperations.randomPorcentage;


/* 
EDITABLE VALUES

isOneWord ---------------------- bool --- if its one word or no, default (false)
startWithVogal ----------------- bool --- starts with vowal or not, default (20 percent chance)

wordAmount --------------------- number - phrase size, default (random number from 2 to 4, can be changed using randomWordAmountFrom and randomWordAmountTo)
letterAmount ------------------- number - word size, default (random number from 4 to 8, can be changed using randomLetterAmountFrom and randomLetterAmountTo)

randomWordAmountFrom ----------- number - override FROM word amount randomness, default (2)
randomWordAmountTo ------------- number - override TO word amount randomness, default (4)

randomLetterAmountFrom --------- number - override FROM letters amount randomness, default (4)
randomLetterAmountTo ----------- number - override TO word letters randomness, default (8)

randomVogalPlacement ----------- number - override the vogal placement randomness, default (40)

randomRAfterPorcentage --------- number - override the chance to add and R after a consonant, default (40)

randomVogalComplementPLacement - number - override the chance to add a consonant complement after a vogal, default (30)
randomVogalComplementEnding ---- number - override the chance to add a consonant complement after a vogal in the las letter of a word, default (90)

porcentageOfComposts ----------- number - override the chance of adding a complement after a word, default (20)

*/


var alphObj = {
    a: {val: "a", type: ["vog"], subs: ["á", "à", "â", "ã"]},
    b: {val: "b", type: ["cons", "2consr"]},
    c: {val: "c", type: ["cons", "2consr"]},
    d: {val: "d", type: ["cons"]},
    e: {val: "e", type: ["vog"], subs: ["é", "è", "ê"]},
    f: {val: "f", type: ["cons", "2consr"]},
    g: {val: "g", type: ["cons", "2consr"]},
    h: {val: "h", type: ["cons"]},
    i: {val: "i", type: ["vog"], subs: ["í", "ì", "î"]},
    j: {val: "j", type: ["cons"]},
    k: {val: "k", type: ["cons", "2consr"]},
    l: {val: "l", type: ["cons"]},
    m: {val: "m", type: ["cons"]},
    n: {val: "n", type: ["cons", "comp"]},
    o: {val: "o", type: ["vog"], subs: ["ó", "ò", "ô", "õ"]},
    p: {val: "p", type: ["cons", "2consr"]},
    q: {val: "q", type: ["cons"]},
    r: {val: "r", type: ["cons", "comp"]},
    s: {val: "s", type: ["cons", "comp"]},
    t: {val: "t", type: ["cons", "2consr"]},
    u: {val: "u", type: ["vog"], subs: ["ú", "ù", "û"]},
    v: {val: "v", type: ["cons", "2consr"]},
    x: {val: "x", type: ["cons"]},
    y: {val: "y", type: ["cons"]},
    z: {val: "z", type: ["cons", "comp"]}
}

var getListByType = (str)=>Object.entries(alphObj).filter((i)=>i[1].type.includes(str));
var retLetter = (l)=>[l, alphObj[l]];

var vogArr = getListByType("vog");
var consArr = getListByType("cons");


var compostWordList = ["de", "do", "da"];


var genName = (GNObj={}) => {
    var compsWList = typeof GNObj.compostWList != "undefined"? GNObj.compostWList: compostWordList;

    var isOneWord = typeof GNObj.isOneWord == "boolean"? GNObj.isOneWord: rp(10);
    var wordA = typeof GNObj.wordAmount == "number"? GNObj.wordAmount:
                                                     isOneWord? 1: rnft(typeof GNObj.randomWordAmountFrom == "number"? GNObj.randomWordAmountFrom: 2, 
                                                                        typeof GNObj.randomWordAmountTo == "number"? GNObj.randomWordAmountTo: 4);
    var fullN = "";
    
    for(var i = 0; i < wordA; i++){
        var letterA = typeof GNObj.letterAmount == "number"? GNObj.letterAmount: rnft(4, 8);
        var letterA = typeof GNObj.letterAmount == "number"? GNObj.letterAmount: rnft(typeof GNObj.randomLetterAmountFrom == "number"? GNObj.randomLetterAmountFrom: 4, 
                                                                                      typeof GNObj.randomLetterAmountTo == "number"? GNObj.randomLetterAmountTo: 8);
        var fullW = "";
        var fullWArr = [];
        
        var nowVog = typeof GNObj.startWithVogal == "boolean"? GNObj.startWithVogal: rp(typeof GNObj.randomVogalPlacement == "number"? GNObj.randomVogalPlacement: 40);

        for(var i2 = 0; i2 < letterA; i2++){ 
            var randL;
            var lastObjE = fullWArr[i2-1];

            if(nowVog){
                var lastObjE = fullWArr[i2-1];
                var canConr = i2==letterA-1? false: rp(typeof GNObj.randomRAfterPorcentage == "number"? GNObj.randomRAfterPorcentage: 40);
                var lastObjIsconr = lastObjE? fullWArr[i2-1][1].type.includes("2consr"):false;
                var lastObjIsQ = lastObjE? fullWArr[i2-1][1].val=="q":false; 
 
                if(lastObjIsQ){ 
                    randL = retLetter("u");
                    letterA += i2==letterA-1? 1:0;

                } else if(canConr && lastObjIsconr){
                    randL = retLetter("r");

                } else { 
                    var lastObjIsU = lastObjE? fullWArr[i2-1][1].val=="u": false;
                    var vogArrUChk = lastObjIsU? vogArr.filter(i=>i[1].val!="u"): vogArr; 
                    randL = vogArrUChk[rn(vogArrUChk.length-1)];
                    nowVog = !nowVog;
                }
            } else { 
                var lastObjE = fullWArr[i2-1];
                var canFin = i2==letterA-1? rp(typeof GNObj.randomVogalComplementEnding == "number"? GNObj.randomVogalComplementEnding: 90):
                                            rp(typeof GNObj.randomVogalComplementPLacement == "number"? GNObj.randomVogalComplementPLacement: 30); 
                var lastObjIsVog = lastObjE? fullWArr[i2-1][1].type.includes("vog"):false; 

                if(canFin && lastObjIsVog){
                    var compArr = getListByType("comp");
                    randL = compArr[rn(compArr.length-1)]; 
                } else {
                    randL = consArr[rn(consArr.length-1)]; 
                    nowVog = !nowVog;
                }
            }
              
            var useLetterSubs = rp(7)&&randL[1].type.includes("vog")? randL[1].subs[rn(randL[1].subs.length-1)]: randL[1].val;
            fullW += i2==0? useLetterSubs.toUpperCase(): useLetterSubs;
            fullWArr.push(randL);
        } 

        fullN += fullW + (i==wordA-1?"":(rp(typeof GNObj.porcentageOfComposts == "number"? GNObj.porcentageOfComposts: 20)?" "+compsWList[rn(compsWList.length-1)]+" ":" ")); 
    } 
    return fullN;
} 

module.exports = genName;