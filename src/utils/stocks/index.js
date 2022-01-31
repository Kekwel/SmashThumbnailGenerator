import {
    Character
} from "../../components/js/Character";

const ONE_ROW = 1;
const TWO_ROW = 2;
const THREE_ROW = 3;

const ZERO_COL = 0;
// const ONE_COL = 1;
const FOUR_COL = 4;
const FIVE_COL = 5;
const SIX_COL = 6;
const SEVEN_COL = 7;
const EIGHT_COL = 8;

// TODO a deplacer dans un fichier facilement éditable + pour ajouter + facilement un nouveau jeu
const ultimate = [
        new Character('ult', '1', 'Mario', 'mario', ONE_ROW, EIGHT_COL),
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
        new Character('ult', '33-34-35', 'Pokemon Trainer', 'ptrainer', ONE_ROW, EIGHT_COL),
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
        new Character('ult', '48', 'Rosalina', 'rosalina', ONE_ROW, EIGHT_COL),
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
        new Character('ult', '66', 'Simon Belmont', 'simon', ONE_ROW, EIGHT_COL),
        new Character('ult', '66e', 'Richter', 'richter', ONE_ROW, EIGHT_COL),
        new Character('ult', '67', 'King K. Rool', 'krool', ONE_ROW, EIGHT_COL),
        new Character('ult', '68', 'Isabelle', 'isabelle', ONE_ROW, EIGHT_COL),
        new Character('ult', '69', 'Incineroar', 'incineroar', ONE_ROW, EIGHT_COL),
        new Character('ult', '70', 'Piranha Plant', 'piranha', ONE_ROW, EIGHT_COL),
        new Character('ult', '71', 'Joker', 'joker', ONE_ROW, EIGHT_COL),
        new Character('ult', '72', 'Hero', 'hero', ONE_ROW, EIGHT_COL),
        new Character('ult', '73', 'Banjo-Kazooie', 'banjo', ONE_ROW, EIGHT_COL),
        new Character('ult', '74', 'Terry', 'terry', ONE_ROW, EIGHT_COL),
        new Character('ult', '75', 'Byleth', 'byleth', ONE_ROW, EIGHT_COL),
        new Character('ult', '76', 'Min Min', 'minmin', ONE_ROW, EIGHT_COL),
        new Character('ult', '77', 'Steve', 'steve', ONE_ROW, EIGHT_COL),
        new Character('ult', '78', 'Sephiroth', 'edge', ONE_ROW, EIGHT_COL),
        new Character('ult', '79-80', 'Pyra & Mythra', 'pyra', TWO_ROW, EIGHT_COL),
        new Character('ult', '81', 'Kazuya', 'kazuya', ONE_ROW, EIGHT_COL),
        new Character('ult', '82', 'Sora', 'trail', ONE_ROW, EIGHT_COL),
        new Character('ult', '?', 'Random Character', 'random'),
    ]
    .sort(compareId);

// TODO "Sheik / Zelda"
// TODO ou alors récupérer de api smashgg...
const melee = [
                new Character('melee', '1', 'Dr. Mario', 'mariod', TWO_ROW, FIVE_COL),
                new Character('melee', '2', 'Mario', 'mario', TWO_ROW, FIVE_COL),
                new Character('melee', '3', 'Luigi', 'luigi', TWO_ROW, FOUR_COL),
                new Character('melee', '4', 'Bowser', 'bowser', TWO_ROW, FOUR_COL),
                new Character('melee', '5', 'Peach', 'peach', TWO_ROW, FIVE_COL),
                new Character('melee', '6', 'Yoshi', 'yoshi', TWO_ROW, SIX_COL),
                new Character('melee', '7', 'Donkey Kong', 'donkey', TWO_ROW, FIVE_COL),
                new Character('melee', '8', 'Captain Falcon', 'captain', TWO_ROW, SIX_COL),
                new Character('melee', '9', 'Ganondorf', 'ganondorf', TWO_ROW, FIVE_COL),
                new Character('melee', '10', 'Falco', 'falco', TWO_ROW, FOUR_COL),
                new Character('melee', '11', 'Fox', 'fox', TWO_ROW, FOUR_COL),
                new Character('melee', '12', 'Ness', 'ness', TWO_ROW, FOUR_COL),
                new Character('melee', '13', 'Ice Climbers', 'ice', TWO_ROW, FOUR_COL),
                new Character('melee', '14', 'Kirby', 'kirby', TWO_ROW, SIX_COL),
                new Character('melee', '15', 'Samus', 'samus', TWO_ROW, FIVE_COL),
                new Character('melee', '16', 'Zelda', 'zelda', TWO_ROW, FIVE_COL),
                new Character('melee', '17', 'Sheik', 'sheik', TWO_ROW, FIVE_COL),
                new Character('melee', '18', 'Link', 'link', TWO_ROW, FIVE_COL),
                new Character('melee', '19', 'Young Link', 'younglink', TWO_ROW, FIVE_COL),
                new Character('melee', '20', 'Pichu', 'pichu', TWO_ROW, FOUR_COL),
                new Character('melee', '21', 'Pikachu', 'pikachu', TWO_ROW, FOUR_COL),
                new Character('melee', '22', 'Jigglypuff', 'jigglypuff', TWO_ROW, FIVE_COL),
                new Character('melee', '23', 'Mewtwo', 'mewtwo', TWO_ROW, FOUR_COL),
                new Character('melee', '24', 'Mr. Game & Watch', 'gamewatch', TWO_ROW, FOUR_COL),
                new Character('melee', '25', 'Marth', 'marth', TWO_ROW, FIVE_COL),
                new Character('melee', '26', 'Roy', 'roy', TWO_ROW, FIVE_COL),
                new Character('melee', '?', 'Random Character', 'random'),
                /* new Character('melee', '?', 'Random', 'random') */
        ].sort(compareId);

// TODO "Sheik/Zelda"
const pplus = [
                new Character('pplus', '1', 'Mario', 'mario', THREE_ROW, SIX_COL),
                new Character('pplus', '2', 'Luigi', 'luigi', THREE_ROW, SIX_COL),
                new Character('pplus', '3', 'Peach', 'peach', THREE_ROW, SIX_COL),
                new Character('pplus', '4', 'Wario', 'wario', THREE_ROW, SIX_COL),
                new Character('pplus', '5', 'Yoshi', 'yoshi', THREE_ROW, SIX_COL),
                new Character('pplus', '6', 'Bowser', 'bowser', THREE_ROW, SIX_COL),
                new Character('pplus', '7', 'Donkey Kong', 'donkey', THREE_ROW, SIX_COL),
                new Character('pplus', '8', 'Diddy Kong', 'diddy', THREE_ROW, SIX_COL),
                new Character('pplus', '9', 'Captain Falcon', 'captain', THREE_ROW, SIX_COL),
                new Character('pplus', '10', 'Fox', 'fox', THREE_ROW, SIX_COL),
                new Character('pplus', '11', 'Falco', 'falco', THREE_ROW, SIX_COL),
                new Character('pplus', '12', 'Wolf', 'wolf', THREE_ROW, SIX_COL),
                new Character('pplus', '13', 'Link', 'link', THREE_ROW, SIX_COL),
                new Character('pplus', '14', 'Toon Link', 'toonlink', THREE_ROW, SIX_COL),
                new Character('pplus', '15', 'Zelda', 'zelda', THREE_ROW, SIX_COL),
                new Character('pplus', '16', 'Sheik', 'sheik', THREE_ROW, SIX_COL),
                new Character('pplus', '17', 'Ganondorf', 'ganondorf', THREE_ROW, FIVE_COL),
                new Character('pplus', '18', 'Pikachu', 'pikachu', THREE_ROW, SIX_COL),
                new Character('pplus', '19', 'Jigglypuff', 'jigglypuff', THREE_ROW, SIX_COL),
                new Character('pplus', '20', 'Mewtwo', 'mewtwo', THREE_ROW, SIX_COL),
                new Character('pplus', '21', 'Squirtle', 'squirtle', THREE_ROW, SIX_COL),
                new Character('pplus', '22', 'Ivysaur', 'ivysaur', THREE_ROW, SIX_COL),
                new Character('pplus', '23', 'Charizard', 'charizard', THREE_ROW, SIX_COL),
                new Character('pplus', '24', 'Lucario', 'lucario', THREE_ROW, SIX_COL),
                new Character('pplus', '25', 'Samus', 'samus', THREE_ROW, SEVEN_COL),
                new Character('pplus', '26', 'Zero Suit Samus', 'samusz', THREE_ROW, SEVEN_COL),
                new Character('pplus', '27', 'Ness', 'ness', THREE_ROW, SIX_COL),
                new Character('pplus', '28', 'Lucas', 'lucas', THREE_ROW, SIX_COL),
                new Character('pplus', '29', 'Kirby', 'kirby', THREE_ROW, SIX_COL),
                new Character('pplus', '30', 'Meta Knight', 'metaknight', THREE_ROW, SIX_COL),
                new Character('pplus', '31', 'King Dedede', 'dedede', THREE_ROW, SIX_COL),
                new Character('pplus', '32', 'Marth', 'marth', THREE_ROW, SIX_COL),
                new Character('pplus', '33', 'Roy', 'roy', THREE_ROW, SIX_COL),
                new Character('pplus', '34', 'Ike', 'ike', THREE_ROW, SIX_COL),
                new Character('pplus', '35', 'Mr. Game & Watch', 'gamewatch', THREE_ROW, SIX_COL),
                new Character('pplus', '36', 'ROB', 'rob', THREE_ROW, SIX_COL),
                new Character('pplus', '37', 'Ice Climbers', 'ice', THREE_ROW, SIX_COL),
                new Character('pplus', '38', 'Pit', 'pit', THREE_ROW, SIX_COL),
                new Character('pplus', '39', 'Olimar', 'pikmin', THREE_ROW, SIX_COL),
                new Character('pplus', '40', 'Snake', 'snake', THREE_ROW, SIX_COL),
                new Character('pplus', '41', 'Sonic', 'sonic', THREE_ROW, SIX_COL),
                new Character('pplus', '42', 'Knuckles', 'knuckles', THREE_ROW, SIX_COL),
                new Character('pplus', '?', 'Random Character', 'random'),
        ].sort(compareId);

// --- RoA
const roa = [
            new Character('roa', '1', 'Clairen', 'clairen', ONE_ROW, SIX_COL),
            new Character('roa', '2', 'Forsburn', 'forsburn', ONE_ROW, SIX_COL),
            new Character('roa', '3', 'Zetterburn', 'zetterburn', ONE_ROW, SIX_COL),
            new Character('roa', '4', 'Wrastor', 'wrastor', ONE_ROW, SIX_COL),
            new Character('roa', '5', 'Absa', 'absa', ONE_ROW, SIX_COL),
            new Character('roa', '6', 'Elliana', 'elliana', ONE_ROW, SIX_COL),
            new Character('roa', '7', 'Sylvanos', 'sylvanos', ONE_ROW, SIX_COL),
            new Character('roa', '8', 'Maypul', 'maypul', ONE_ROW, SIX_COL),
            new Character('roa', '9', 'Kragg', 'kragg', ONE_ROW, SIX_COL),
            new Character('roa', '10', 'Ori', 'ori', ONE_ROW, SIX_COL),
            new Character('roa', '11', 'Shovel Knight', 'shovelknight', ONE_ROW, SIX_COL),
            new Character('roa', '12', 'Orcane', 'orcane', ONE_ROW, SIX_COL),
            new Character('roa', '13', 'Etalus', 'etalus', ONE_ROW, SIX_COL),
            new Character('roa', '14', 'Ranno', 'ranno', ONE_ROW, SIX_COL),
            new Character('roa', '?', 'Random Character', 'random'),
        ].sort(compareId);

// --- NASB
const nasb = [
                new Character('nasb', '1', 'SpongeBob', 'apple', ONE_ROW, ZERO_COL),
                new Character('nasb', '2', 'Patrick', 'star', ONE_ROW, ZERO_COL),
                new Character('nasb', '3', 'Sandy', 'diver', ONE_ROW, ZERO_COL),
                new Character('nasb', '4', 'Michelangelo', 'pizza', ONE_ROW, ZERO_COL),
                new Character('nasb', '5', 'Leonardo', 'moon', ONE_ROW, ZERO_COL),
                new Character('nasb', '6', 'April', 'reporter', ONE_ROW, ZERO_COL),
                new Character('nasb', '7', 'Zim', 'alien', ONE_ROW, ZERO_COL),
                new Character('nasb', '8', 'Aang', 'kite', ONE_ROW, ZERO_COL),
                new Character('nasb', '9', 'Korra', 'athlete', ONE_ROW, ZERO_COL),
                new Character('nasb', '10', 'Reptar', 'mascot', ONE_ROW, ZERO_COL),
                new Character('nasb', '11', 'Nigel', 'narrator', ONE_ROW, ZERO_COL),
                new Character('nasb', '12', 'CatDog', 'chimera', ONE_ROW, ZERO_COL),
                new Character('nasb', '13', 'Ren & Stimpy', 'duo', ONE_ROW, ZERO_COL),
                new Character('nasb', '14', 'Powdered Toast Man', 'hero', ONE_ROW, ZERO_COL),
                new Character('nasb', '15', 'Lincoln', 'rascal', ONE_ROW, ZERO_COL),
                new Character('nasb', '16', 'Lucy', 'goth', ONE_ROW, ZERO_COL),
                new Character('nasb', '17', 'Danny Phantom', 'plasma', ONE_ROW, ZERO_COL),
                new Character('nasb', '18', 'Oblina', 'snake', ONE_ROW, ZERO_COL),
                new Character('nasb', '19', 'Helga', 'rival', ONE_ROW, ZERO_COL),
                new Character('nasb', '20', 'Toph', 'clay', ONE_ROW, ZERO_COL),
                new Character('nasb', '?', 'Random Character', 'random'),
            ].sort(compareId);


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

// --
const gamesId = {
    1386: ultimate,
    1: melee,
    33602: pplus,
    24: roa,
    39281: nasb,
}

export default {
    GAMES: gamesId,
    ULT: ultimate,
    MELEE: melee,
    PPLUS: pplus,
    ROA: roa,
    NASB: nasb,
}