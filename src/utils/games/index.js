import Utils from "../../utils"

// https://api.smash.gg/videogames
// id 1 : Melee
// id 2 : Brawl
// id 3 : Smash 4
// id 4 : Smash 64
// id 1386 : Smash Ultimate
/* const smashggIDs = {
    1386: 'ult'
} */

const empty = {id: 0, code: '', name: 'Empty', src: Utils.getRoot() + 'img/icons/ult.png', bgSrc: Utils.getRoot() + "img/background/ult.jpg"};
const ult = {id: 1, code: 'ult', name: 'Ultimate', src: Utils.getRoot() + 'img/icons/ult.png', bgSrc: Utils.getRoot() + "img/background/ult.jpg"};
const melee = {id: 2, code: 'melee', name: 'Melee', src: Utils.getRoot() + 'img/icons/melee.png', bgSrc: Utils.getRoot() + "img/background/melee.jpg"}
const pplus = {id: 3, code: 'pplus', name: 'Project +', src: Utils.getRoot() + 'img/icons/pplus.png', bgSrc: Utils.getRoot() + "img/background/pplus.jpg"}
const roa = {id: 5, code: 'roa', name: 'Rivals of Aether', src: Utils.getRoot() + 'img/icons/roa.png', bgSrc: Utils.getRoot() + "img/background/roa.jpg"}
const nasb = {id: 6, code: 'nasb', name: 'Nickelodeon All Star Brawl', src: Utils.getRoot() + 'img/icons/nasb.png', bgSrc: Utils.getRoot() + "img/background/nasb.jpg"}

const games = [
    {header: 'Super Smash Bros..', divider: true },
    ult,
    melee,
    pplus,
    {header: 'Autres..', divider: true },
    roa,
    nasb,
    empty
];

export default {
    GAMES: games,
    ULT: ult,
    MELEE: melee,
    PPLUS: pplus,
    ROA: roa,
    NASB: nasb,
}