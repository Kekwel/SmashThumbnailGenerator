const messages = {
  fr: {
    credits: {
      icon: 'Icônes Smash Bros',
      custom: '- custom stock icones RoA par moi-même',
      fonts: 'Polices d\'écriture',
      characters: 'Tous les éléments des jeux appartiennent à leurs créateurs respectifs'
    },
    component: {
      player: {
        background: 'Fond joueur {nb}',
        tag: 'Bandeau pseudo joueur {nb}',
        char: 'Personnage joueur {nb}'
      },
      versus: 'VS',
      phase: 'Bandeau phase {nb}'
    },
    button: {
      export: 'EXPORT',
      import: 'IMPORT'
    },
    label: {
      bindTag: 'Couleur bandeau lié (Tag, Phases)',
      color: 'Choix couleur...',
      img: {
        new: 'Nouvel image..'
      },
      layouts: 'Layouts',
      grid: 'Affichage Grid',
      timestamp: 'Affichage Timestamp Youtube',
      clippath: {
        player: 'ClipPath J{opt}',
        phase: 'ClipPath Phase {opt}',
      },
      size: 'Taille',
      bold: 'Gras',
      italic: 'Italique',
      font: {
        custom: 'Custom Font'
      },
      angle: 'Angle',
      blur: 'Flou',
      shortcut: {
        tab: 'Valide le choix du champ courant et passe au suivant',
        ctrlEnter: 'Créer une nouvelle entrée'
      }
    },
    title: {
      tagAndPhases: 'Tag & Phases',
      fond: 'Fond',
      phase: 'Phase {nb}',
      player: 'Joueur {nb}',
      tag: 'Tag',
      tagPlayer : 'Tag J{nb}',
      export: 'Export/Import layout',
      grid: 'Grid',
      timestamp: 'Timestamp',
      match: 'Match',
      options: 'Options',
      shadow: {
        character: 'Ombre personnage',
        banner: 'Ombre bandeau'
      },
      versus: 'Versus',
      default: 'Par défaut',
      quickAdd: 'Ajout rapide',
      shortcut: 'Raccourcis'
    },
    placeholder: {
      image: 'Choisissez une image'
    },
    error: {
      smashgg: {
        nodata: 'Aucune donnée trouvée ! Vérifiez le lien',
        noSetStreamed: 'Aucun set streamé trouvé ! ',
      }
    },
    notification: {
      smashgg: {
        importOk: '{nb} sets importés !'
      }
    },
    tooltip: {
      random: 'Personnages aléatoires !',
      clippath: 'Empêche un élément d\'être affiché sur une zone',
      btn: {
        reset: 'Réinitialisation',
        add: 'Ajout'
      },
      help: {
        import: {
          smashgg: 'Lien de l\'évenement (https://smash.gg/tournament/TOURNAMENT_ID/event/EVENT_ID)'
        },
      },
      menu: {
        quick: 'Ajout rapide',
        credits: 'Credits',
        twitter: 'Twitter',
        discord: 'ID Discord',
        github: 'Github Repo'
      }
    }
  },

  en: {
    credits: {
      icon: 'Smash Bros Icons',
      custom: '- custom stock icones RoA made by myself',
      fonts: 'Fonts',
      characters: 'All game assets belong to their respective creators'
    },
    button: {
      export: 'EXPORT',
      import: 'IMPORT'
    },
    label: {
      bindTag: 'Banner Color (Tag, Phases)',
      color: 'Choose a color...',
      img: {
        new: 'New picture..'
      },
      layouts: 'Layouts',
      grid: 'Grid Display',
      timestamp: 'Youtube Timestamp Display',
      clippath: {
        player: 'ClipPath P{opt}',
        phase: 'ClipPath Phase {opt}',
      },
      size: 'Size',
      bold: 'Bold',
      italic: 'Italic',
      font: {
        custom: 'Custom Font'
      },
      angle: 'Angle',
      blur: 'Blur',
      shortcut: {
        tab: 'Validate the choice of the current field and go to the next one',
        ctrlEnter: 'Create a new entry'
      }
    },
    title: {
      tagAndPhases: 'Tag & Phases',
      fond: 'Background',
      phase: 'Phase {nb}',
      player: 'Player {nb}',
      tag: 'Tag',
      tagPlayer : 'Tag P{nb}',
      export: 'Export/Import layout',
      grid: 'Grid',
      timestamp: 'Timestamp',
      match: 'Match',
      options: 'Options',
      shadow: {
        character: 'Character shadow',
        banner: 'Banner shadow'
      },
      versus: 'Versus',
      default: 'Default',
      quickAdd: 'Quick add',
      shortcut: 'Shortcuts'
    },
    placeholder: {
      image: 'Choose a picture'
    },
    error: {
      smashgg: {
        nodata: 'No data found ! Please check the smashgg link',
        noSetStreamed: 'No streamed sets found !',
      }
    },
    notification: {
      smashgg: {
        importOk: '{nb} imported sets !'
      }
    },
    tooltip: {
      random: 'Random characters !',
      clippath: 'Prevents an element from being displayed on an area',
      btn: {
        reset: 'Reset',
        add: 'Add'
      },
      help: {
        import: {
          smashgg: 'Event link (https://smash.gg/tournament/TOURNAMENT_ID/event/EVENT_ID)'
        },
      },
      menu: {
        quick: 'Quick add',
        credits: 'Credits',
        twitter: 'Twitter',
        discord: 'Discord ID',
        github: 'Github Repo'
      }
    }
  }
}

export default {
  message: messages,
}