import i18next from 'i18next'

i18next.init({
  lng: 'de',
  resources: {
    de: {
      translation: {
        'start': 'Hallo i bims, 1 LeetBot. I zaehl euere Leetposts vong Heaufigkiet hern.',
        'enable chat': 'Hallo zusammen! Ich überwache diesen Channel nun. Frohes leeten!',
        'disable chat': 'Leeten ist vorbei. Tschüssi!',
        'call out asshole': 'DUUU DRECKIGERS STUK SCHEIẞE WARUM MACHST DU SWOWAS\nMACH DES JA NET NOCHMAL DO SCHMOK WAS DA LOS\nALLE AMBARSCH NACH HAUSE LEET ZEIT IS VORBEI WGEEN {{asshole, uppercase}}',
        'report': {
          'leetCount': 'Heute haben wir {{count}} Posts erreicht!',
          'newRecord': 'Fuck yea, das ist ein neuer Rekord! Wir haben uns um {{delta}} gesteigert! :tada:',
          'participants': 'Teilnehmer waren: {{participants}}.',
          'winner': '1337 |-|4><0R des Tages: {{winner}}!!',
          'congratulations': 'Glückwunsch!'
        },
        'language unknown': 'Sorry, die Sprache "{{language}}" kenne ich nicht.',
        'language changed': 'Ok, ab jetzt schreibe ich Deutsch.',
        'info': {
          'chatActive': 'Ich bin in diesem Chat aktiv. Gib /disable ein, um mich zu deaktivieren.',
          'chatInactive': 'Ich bin in diesen Chat nicht aktiv. Gib /enable ein, um mich zu aktivieren.',
          'leetTime': 'Leet-Time ist um {{hours}}:{{minutes}} in {{- timezone}}.',
          'version': 'Aktuelle Version: {{version}} (Commit: {{commit}})',
          'currentLanguage': 'Aktuelle Sprache: {{language}}',
          'currentRecord': 'Aktueller Rekord: {{record}}'
        },
        'already enabled': 'Ich bin bereits aktiv!',
        'already disabled': 'Ich bin bereits deaktiviert!',
        'error': 'Upsi, irgendwas ist schiefgelaufen. Sag bitte @yeldiR bescheid, damit der Knecht meine Logs checkt.',
        'leet reminder': 'doooods',
        'debug': {
          'stateReset': 'Ich habe versucht, es aus und wieder an zu schalten. Sollte jetzt passen.'
        }
      }
    },
    en: {
      translation: {
        'start': 'Hello, I\'m the LeetBot. I count your leeting.',
        'enable chat': 'Hi everyone! I am now watching this channel. Hayy leeting!',
        'disable chat': 'Leeting is over. Bye!',
        'call out asshole': 'YOU FUCKING ASSHOLE YOU WHYY DO YOU DO THAT DON\'T DO THAT AGAIN\nEVERYBODY GO HOME LEET TIME IS OVER BECAUSE OF {{asshole, uppercase}}!!1!',
        'report': {
          'leetCount': 'Today we reached {{count}} posts!',
          'newRecord': 'Fuck yea, that\'s a new record! That\'s {{delta}} more than last time! :tada:',
          'participants': 'Participants were: {{participants}}.',
          'winner': 'The winner of the day is: {{winner}}!!',
          'congratulations': 'Congratulations!'
        },
        'language unknown': 'Sorry, I don\'t know the language "{{language}}.',
        'language changed': 'Ok, I\'ll write English from now on.',
        'info': {
          'chatActive': 'I am active in this chat. Enter /disable to deactivate me.',
          'chatInactive': 'I am not active in this. Enter /enable to activate me.',
          'leetTime': 'Leet-Time is at {{hours}}:{{minutes}} in {{- timezone}}.',
          'version': 'Current version: {{version}} (Commit: {{commit}})',
          'currentLanguage': 'Current language: {{language}}',
          'currentRecord': 'Current record: {{record}}'
        },
        'already enabled': 'I\'m already enabled!',
        'already disabled': 'I\'m already disabled!',
        'error': 'Whoops, something went wrong. Please tell @yeldiR to check my logs.',
        'leet reminder': 'doooods',
        'debug': {
          'stateReset': 'I tried turning it off and on again. Should be fine now.'
        }
      }
    }
  },
  interpolation: {
    format: (value, format, lng) => {
      if (format === 'uppercase') {
        return value.toUpperCase()
      }
    }
  }
})

export default i18next
