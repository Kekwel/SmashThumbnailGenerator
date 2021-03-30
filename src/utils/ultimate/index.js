import {
    Character
} from "../../components/js/Character";

const ultimate = [new Character('ult', '1', 'Mario'),
                new Character('ult', '73', 'Banjo'),].sort(compareId);

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