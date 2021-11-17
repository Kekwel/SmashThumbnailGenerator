
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
            if (set.stream) {
              let phase = this.getPhase(set.fullRoundText);
    
              const info = {
                p1: {
                  duo: []
                },
                p2: {
                  duo: []
                },
                phase: phase
              }
    
              // -- récupére les persos les + utilisés dans le set (parcours de array games)
              // -- max 2 persos
              let stat = {
                p1: [],
                p2: []
              };
              for (const game of set.games) {
                // j1
                const idCharJ1 = game.selections[0].selectionValue;

                let index = stat.p1.findIndex(el => el.id === idCharJ1);
                if (index < 0) {
                  stat.p1.push({
                    'id': idCharJ1,
                    'nb': 1
                  });
                } else {
                  stat.p1[index].nb++
                }
                
                // j2
                const idCharJ2 = game.selections[1].selectionValue;
                index = stat.p2.findIndex(el => el.id === idCharJ2);
                if (index < 0) {
                  stat.p2.push({
                    'id': idCharJ2,
                    'nb': 1
                  });
                } else {
                  stat.p2[index].nb++
                }
              }
              // tri par nb d'occurence des characters
              stat.p1.sort((a, b) => b.nb - a.nb);
              stat.p2.sort((a, b) => b.nb - a.nb);
              
              // TODO récupérer les 2 + utilisés (si taille > 2)
              //this.getMaxCharUsed(stat.p2);
  
              // J1
              info.p1.tag = set.games[0].selections[0].entrant.name;

              for (let i = 0; i < 2; i++) {
                const element = stat.p1[i];
                if (element)
                  info.p1.duo.push(this.findCharacter(videogameId, element.id));
              }
              info.p1.characters = this.findCharacter(videogameId, set.games[0].selections[0].selectionValue)
    
              // J2
              info.p2.tag = set.games[0].selections[1].entrant.name;

              for (let i = 0; i < 2; i++) {
                const element = stat.p2[i];
                if (element)
                  info.p2.duo.push(this.findCharacter(videogameId, element.id));
              }
              info.p2.characters = this.findCharacter(videogameId, set.games[0].selections[1].selectionValue)
    
              infoRes.infos.push(info);
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
      let phase1 = '', phase2 = '', value = '';
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
      // TODO tester si CHARACTERS[videogameId] existe
      const charnameSmashGG = characters.CHARACTERS[videogameId].character.filter(char => char.id === value)[0].name;

      // TODO si pas trouvé => random 
      let character = stocks.GAMES[videogameId].filter(char => char.name === charnameSmashGG)[0];
      return character;
    }
}

export default sgg;