import Utils from "../../utils"

const empty = {id: 0, code: '', name: 'Empty', src: Utils.getRoot() + 'img/icons/ult.png', bgSrc: Utils.getRoot() + "img/background/ult.jpg"};
const ult = {id: 1, code: 'ult', name: 'Ultimate', src: Utils.getRoot() + 'img/icons/ult.png', bgSrc: Utils.getRoot() + "img/background/ult.jpg"};
const melee = {id: 2, code: 'melee', name: 'Melee', src: Utils.getRoot() + 'img/icons/melee.png', bgSrc: Utils.getRoot() + "img/background/melee.jpg"}
const pplus = {id: 3, code: 'pplus', name: 'Project +', src: Utils.getRoot() + 'img/icons/pplus.png', bgSrc: Utils.getRoot() + "img/background/pplus.jpg"}
const roa = {id: 5, code: 'roa', name: 'Rivals of Aether', src: Utils.getRoot() + 'img/icons/roa.png', bgSrc: Utils.getRoot() + "img/background/roa.jpg"}

const games = [
    {header: 'Super Smash Bros..', divider: true },
    ult,
    melee,
    pplus,
    {header: 'Autres..', divider: true },
    roa,
    empty
];

export default {
    GAMES: games,
    ULT: ult,
    MELEE: melee,
    PPLUS: pplus,
    ROA: roa,
}