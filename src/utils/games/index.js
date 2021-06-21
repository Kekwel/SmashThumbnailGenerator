import Utils from "../../utils"

const ult = {id: 0, name: 'SSB Ultimate', src: Utils.getRoot() + 'img/icons/ult.png', bgSrc: Utils.getRoot() + "img/background/ult.jpg"};
const melee = {id: 1, name: 'SSB Melee', src: Utils.getRoot() + 'img/icons/melee.png', bgSrc: Utils.getRoot() + "img/background/melee.jpg"}
const pplus = {id: 2, name: 'SSB Project +', src: Utils.getRoot() + 'img/icons/pplus.png', bgSrc: Utils.getRoot() + "img/background/pplus.jpg"}

const games = [
    ult,
    melee,
    pplus,
];

export default {
    GAMES: games,
    ULT: ult,
    MELEE: melee,
    PPLUS: pplus
}