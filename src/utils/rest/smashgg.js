
import axios from 'axios';
import { config } from '../../../public/config';
import { i18n } from '../../main';
import characters from '../characters';
import stocks from '../stocks';

const sgg = {
    async getStreamedSetsInfos(tournament, event) {
      const eventSlug = `tournament/${tournament}/event/${event}`;

      // TODO query autre part
      const query = `query EventSets($eventSlug: String!, $page: Int!, $perPage: Int!) {
          event(slug: $eventSlug) {
            id
            slug
            name
            videogame {
              id
            }
            sets(
              page: $page
              perPage: $perPage
              sortType: MAGIC
            ) {
              pageInfo {
                totalPages
              }
              nodes {
                fullRoundText
                stream {
                  id
                  streamName
                  streamGame
                }
                games {
                  selections {
                    entrant {
                      id
                      name
                    }
                    selectionValue
                  }
                }
              }
            }
          }
        }
      `;
      const headers = {
        'Authorization': `Bearer ${config.smashgg.token}`,
        'Content-Type': 'application/json',
      }
      let page = 1;
      let totalPages = page + 1;
      let perPage = 20;
      
      let infoRes = {
        infos: [],
        errors: []
      };
      while (page < totalPages) {
        const res = await axios.post(config.smashgg.url, {
            query: query,
            variables: {
                "eventSlug": eventSlug,
                "page": page,
                "perPage": perPage
            }
        }, { headers });
        
        const data = res.data.data;
        const hasErrors = res.data.errors;
        
        if (hasErrors) {
          totalPages = 0;
          infoRes.errors = hasErrors;
        } else if (!data.event) {
          totalPages = 0;
          infoRes.errors = [{message: i18n.t('error.smashgg.nodata')}];
        } else {
          totalPages = data.event.sets.pageInfo.totalPages;
          const videogameId = data.event.videogame.id;
    
          // -- ne recup que les sets dont stream != null
          for (const set of data.event.sets.nodes) {
            // si au moins élément
            if (set?.games) {
              // si streamé
              if (set.stream) {
                // test si games renseignés (si toutes ne sont pas undefined)
                const onlyUndefinedInfos = set.games.filter(item => item.selections === null).length === set.games.length;
                if (!onlyUndefinedInfos) {
                  let phase = this.getPhase(set.fullRoundText);
        
                  const info = {
                    phase: phase
                  }
        
                  // -- récupére les persos les + utilisés dans le set (parcours de array games)
                  // -- max 2 persos
                  let stat = { };
                  for (const game of set.games) {
                    for (const selection of game.selections) {
                      const entrantId = selection.entrant.id
                      const entrantName = selection.entrant.name
                      const charId = selection.selectionValue;
                      // init array stat joueur
                      if (!stat[entrantId])
                        stat[entrantId] = {name: entrantName, characters : []}
                      
                      // recherche index du perso joué 
                      let index = stat[entrantId].characters.findIndex(el => el.id === charId);
                      
                      if (index < 0) {
                        stat[entrantId].characters.push({
                          'id': charId,
                          'nb': 1
                        });
                      } else {
                        stat[entrantId].characters[index].nb++
                      }
                    }
                  }
                  
                  // tri par nb d'occurence des characters
                  for (const id of Object.keys(stat))
                  stat[id].characters.sort((a, b) => b.nb - a.nb);
                  
                  // init info player
                  Object.keys(stat).forEach(id => {
                    const statPlayer = stat[id];
                    // on init joueur
                    let player = {
                      duo: []
                    }
                    // pseudo
                    player.tag = statPlayer.name;
                    // 2 persos le + utilisé
                    for (let i = 0; i < 2; i++) {
                      const element = statPlayer.characters[i];
                      if (element)
                      player.duo.push(this.findCharacter(videogameId, element.id));
                    }
                    // personnage solo, a ne plus utiliser
                    player.characters = this.findCharacter(videogameId, statPlayer.characters[0].id)
                    
                    if (!info.p1)
                    info.p1 = player
                    else
                    info.p2 = player
                  });
                  infoRes.infos.push(info);
                }
              }
            }
          }
  
          page++;
        }
      }

      // si requete ok MAIS aucune donnée => aucun set "streamé"
      if (totalPages !== 0 && infoRes.infos.length === 0) {
        infoRes.errors = [{message: i18n.t('error.smashgg.noSetStreamed')}];
      }

      return infoRes;
    },

    // décompose la phase provenant de smashgg
    getPhase(fullPhase) {
      let phase1 = 'Winners', phase2 = '', value = '';
      if (fullPhase.match(/winner/i)) {
        phase1 = "Winners"
        value = "W"
      } else if (fullPhase.match(/loser/i)) {
        phase1 = "Losers"
        value = "L"
      } else if (fullPhase.match(/grand/i)) {
        phase1 = 'Grand'
        value = "G";
      }
      
      if (fullPhase.match(/round/i)) {
        // -- recup X
        const matchRound = fullPhase.match(/round ([0-9]*)/i);
        phase2 = `Round ${matchRound[1]}`
        value += `R${matchRound[1]}`
      } else if (fullPhase.match(/quarter/i)) {
        phase2 = "Quarters"
        value += "Q"
      } else if (fullPhase.match(/semi/i)) {
        phase2 = "Semis"
        value += "S"
      } else if (fullPhase.match(/final/i)) {
        phase2 = "Finals"
        value += "F"
      }
      
      const res = {
        phase1: phase1,
        phase2: phase2,
        value: value
      }
      return res;
    },

    findCharacter(videogameId, value) {
      // on prend random au cas où on ne trouve pas le jeu/perso
      let character = stocks.GAMES[videogameId].filter(char => char.formatName === 'random')[0];
      // teste si CHARACTERS[videogameId] et GAMES[videogameId] existe
      if (characters[videogameId] && stocks.GAMES[videogameId]) {
        let charnameSmashGG = characters[videogameId].character.filter(char => char.id === value)[0].name;
        // TODO si pas trouvé => error 
        character = stocks.GAMES[videogameId].filter(char => char.name === charnameSmashGG)[0];
      }

      return character;
    }
}

export default sgg;