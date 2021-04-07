import {
    Character
} from "../../components/js/Character";

const ONE_ROW = 1;
const TWO_ROW = 2;
const EIGHT_COL = 8;

const ultimate = [new Character('ult', '1', 'Mario', 'mario', ONE_ROW, EIGHT_COL),
        new Character('ult', '2', 'Donkey Kong', 'donkey', ONE_ROW, EIGHT_COL),
        new Character('ult', '3', 'Link', 'link', ONE_ROW, EIGHT_COL),
        new Character('ult', '4', 'Samus', 'samus', ONE_ROW, EIGHT_COL),
        new Character('ult', '4e', 'Dark Samus', 'samusd', ONE_ROW, EIGHT_COL),
        new Character('ult', '5', 'Yoshi', 'yoshi', ONE_ROW, EIGHT_COL),
        new Character('ult', '6', 'Kirby', 'kirby', ONE_ROW, EIGHT_COL),
        new Character('ult', '7', 'Fox', 'fox', ONE_ROW, EIGHT_COL),
        new Character('ult', '8', 'Pikachu', 'pikachu', ONE_ROW, EIGHT_COL),
        new Character('ult', '9', 'Luigi', 'luigi', ONE_ROW, EIGHT_COL),
        new Character('ult', '10', 'Ness', 'ness', ONE_ROW, EIGHT_COL),
        new Character('ult', '11', 'Captain Falcon', 'captain', ONE_ROW, EIGHT_COL),
        new Character('ult', '12', 'Jigglypuff', 'jigglypuff', ONE_ROW, EIGHT_COL),
        new Character('ult', '13', 'Peach', 'peach', ONE_ROW, EIGHT_COL),
        new Character('ult', '13e', 'Daisy', 'daisy', ONE_ROW, EIGHT_COL),
        new Character('ult', '14', 'Bowser', 'bowser', ONE_ROW, EIGHT_COL),
        new Character('ult', '15', 'Ice Climbers', 'ices', ONE_ROW, EIGHT_COL),
        new Character('ult', '16', 'Sheik', 'sheik', ONE_ROW, EIGHT_COL),
        new Character('ult', '17', 'Zelda', 'zelda', ONE_ROW, EIGHT_COL),
        new Character('ult', '18', 'Dr. Mario', 'mariod', ONE_ROW, EIGHT_COL),
        new Character('ult', '19', 'Pichu', 'pichu', ONE_ROW, EIGHT_COL),
        new Character('ult', '20', 'Falco', 'falco', ONE_ROW, EIGHT_COL),
        new Character('ult', '21', 'Marth', 'marth', ONE_ROW, EIGHT_COL),
        new Character('ult', '21e', 'Lucina', 'lucina', ONE_ROW, EIGHT_COL),
        new Character('ult', '22', 'Young Link', 'ylink', ONE_ROW, EIGHT_COL),
        new Character('ult', '23', 'Ganondorf', 'ganondorf', ONE_ROW, EIGHT_COL),
        new Character('ult', '24', 'Mewtwo', 'mewtwo', ONE_ROW, EIGHT_COL),
        new Character('ult', '25', 'Roy', 'roy', ONE_ROW, EIGHT_COL),
        new Character('ult', '25e', 'Chrom', 'chrom', ONE_ROW, EIGHT_COL),
        new Character('ult', '26', 'Mr. Game & Watch', 'gamewatch', ONE_ROW, EIGHT_COL),
        new Character('ult', '27', 'Meta Knight', 'metaknight', ONE_ROW, EIGHT_COL),
        new Character('ult', '28', 'Pit', 'pit', ONE_ROW, EIGHT_COL),
        new Character('ult', '28e', 'Dark Pit', 'pitd', ONE_ROW, EIGHT_COL),
        new Character('ult', '29', 'Zero Suit Samus', 'samusz', ONE_ROW, EIGHT_COL),
        new Character('ult', '30', 'Wario', 'wario', ONE_ROW, EIGHT_COL),
        new Character('ult', '31', 'Snake', 'snake', ONE_ROW, EIGHT_COL),
        new Character('ult', '32', 'Ike', 'ike', ONE_ROW, EIGHT_COL),
        new Character('ult', '33-34-35', 'Pokémon Trainer', 'ptrainer', ONE_ROW, EIGHT_COL),
        new Character('ult', '36', 'Diddy Kong', 'diddy', ONE_ROW, EIGHT_COL),
        new Character('ult', '37', 'Lucas', 'lucas', ONE_ROW, EIGHT_COL),
        new Character('ult', '38', 'Sonic', 'sonic', ONE_ROW, EIGHT_COL),
        new Character('ult', '39', 'King Dedede', 'dedede', ONE_ROW, EIGHT_COL),
        new Character('ult', '40', 'Olimar', 'pikmin', ONE_ROW, EIGHT_COL),
        new Character('ult', '41', 'Lucario', 'lucario', ONE_ROW, EIGHT_COL),
        new Character('ult', '42', 'R.O.B.', 'rob', ONE_ROW, EIGHT_COL),
        new Character('ult', '43', 'Toon Link', 'tlink', ONE_ROW, EIGHT_COL),
        new Character('ult', '44', 'Wolf', 'wolf', ONE_ROW, EIGHT_COL),
        new Character('ult', '45', 'Villager', 'villager', ONE_ROW, EIGHT_COL),
        new Character('ult', '46', 'Mega Man', 'megaman', ONE_ROW, EIGHT_COL),
        new Character('ult', '47', 'Wii Fit Trainer', 'wiifit', ONE_ROW, EIGHT_COL),
        new Character('ult', '48', 'Rosalina & Luma', 'rosalina', ONE_ROW, EIGHT_COL),
        new Character('ult', '49', 'Little Mac', 'littlemac', ONE_ROW, EIGHT_COL),
        new Character('ult', '50', 'Greninja', 'greninja', ONE_ROW, EIGHT_COL),
        new Character('ult', '51', 'Mii Brawler', 'miibrawler', ONE_ROW, EIGHT_COL),
        new Character('ult', '52', 'Mii Swordfighter', 'miisword', ONE_ROW, EIGHT_COL),
        new Character('ult', '53', 'Mii Gunner', 'miigunner', ONE_ROW, EIGHT_COL),
        new Character('ult', '54', 'Palutena', 'palutena', ONE_ROW, EIGHT_COL),
        new Character('ult', '55', 'Pac-Man', 'pacman', ONE_ROW, EIGHT_COL),
        new Character('ult', '56', 'Robin', 'robin', ONE_ROW, EIGHT_COL),
        new Character('ult', '57', 'Shulk', 'shulk', ONE_ROW, EIGHT_COL),
        new Character('ult', '58', 'Bowser Jr.', 'bowserjr', ONE_ROW, EIGHT_COL),
        new Character('ult', '59', 'Duck Hunt', 'duckhunt', ONE_ROW, EIGHT_COL),
        new Character('ult', '60', 'Ryu', 'ryu', ONE_ROW, EIGHT_COL),
        new Character('ult', '60e', 'Ken', 'ken', ONE_ROW, EIGHT_COL),
        new Character('ult', '61', 'Cloud', 'cloud', ONE_ROW, EIGHT_COL),
        new Character('ult', '62', 'Corrin', 'corrin', ONE_ROW, EIGHT_COL),
        new Character('ult', '63', 'Bayonetta', 'bayonetta', ONE_ROW, EIGHT_COL),
        new Character('ult', '64', 'Inkling', 'inkling', ONE_ROW, EIGHT_COL),
        new Character('ult', '65', 'Ridley', 'ridley', ONE_ROW, EIGHT_COL),
        new Character('ult', '66', 'Simon', 'simon', ONE_ROW, EIGHT_COL),
        new Character('ult', '66e', 'Richter', 'richter', ONE_ROW, EIGHT_COL),
        new Character('ult', '67', 'King K. Rool', 'krool', ONE_ROW, EIGHT_COL),
        new Character('ult', '68', 'Isabelle', 'isabelle', ONE_ROW, EIGHT_COL),
        new Character('ult', '69', 'Incineroar', 'incineroar', ONE_ROW, EIGHT_COL),
        new Character('ult', '70', 'Piranha Plant', 'piranha', ONE_ROW, EIGHT_COL),
        new Character('ult', '71', 'Joker', 'joker', ONE_ROW, EIGHT_COL),
        new Character('ult', '72', 'Hero', 'hero', ONE_ROW, EIGHT_COL),
        new Character('ult', '73', 'Banjo & Kazooie', 'banjo', ONE_ROW, EIGHT_COL),
        new Character('ult', '74', 'Terry', 'terry', ONE_ROW, EIGHT_COL),
        new Character('ult', '75', 'Byleth', 'byleth', ONE_ROW, EIGHT_COL),
        new Character('ult', '76', 'Min Min', 'minmin', ONE_ROW, EIGHT_COL),
        new Character('ult', '77', 'Steve', 'steve', ONE_ROW, EIGHT_COL),
        new Character('ult', '78', 'Sephiroth', 'edge', ONE_ROW, EIGHT_COL),
        new Character('ult', '79-80', 'Pyra/Mythra', 'pyra', TWO_ROW, EIGHT_COL),
        new Character('ult', '?', 'Random', 'random'),
    ]
    .sort(compareId);

// eslint-disable-next-line no-unused-vars
function compareName(a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }

    // names must be equal
    return 0;
}

function compareId(a, b) {
    return a.id - b.id;
}

export default {
    STOCKS: ultimate,
}