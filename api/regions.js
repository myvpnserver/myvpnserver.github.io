//regions.js

import { shortBaseUrl } from './config.js';

export async function getRegions() {
  try {
    const res = await fetch(shortBaseUrl, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({path:'/api/regions'})
    });
    const data = await res.json();
    const flags = {
        'Франция': 'icons/flags/FR.svg',
        'США': 'icons/flags/US.svg',
        'Великобритания': 'icons/flags/GB.svg',
        'ОАЭ': 'icons/flags/AE.svg',
        'Россия': 'icons/flags/RU.svg',
        'Испания': 'icons/flags/ES.svg',
        'Германия': 'icons/flags/DE.svg',
        'Италия': 'icons/flags/IT.svg',
        'Китай': 'icons/flags/CN.svg',
        'Авто': 'icons/flags/WW.svg',
        'Турция': 'icons/flags/TR.svg',
        'Казахстан': 'icons/flags/KZ.svg',
        'Нидерланды': 'icons/flags/NL.svg',
        'Румыния': 'icons/flags/RO.svg',
        'Канада': 'icons/flags/CA.svg',
        'Армения': 'icons/flags/AM.svg'
      };
      const ruToCode = {
        'Авто':           'auto',
        'Армения':        'am',
        'Канада':         'ca',
        'Китай':          'cn',
        'Германия':       'de',
        'Франция':        'fr',
        'Великобритания': 'gb',
        'США':            'usa',
        'ОАЭ':            'uae',
        'Турция':         'tr',
        'Италия':         'it',
        'Испания':        'es',
        'Нидерланды':     'nl',
        'Румыния':        'ro',
        'Россия':         'ru',
        'Казахстан':      'kz'
      };
      
      const regions = data.map(r => {
        const code = ruToCode[r.ruName] || 'auto';
        return {
          ...r,
          flag:   flags[r.ruName] || 'icons/flags/WW.svg',
          code
        };
      });
      return({ success: true, regions });
  } catch { 
    return({ success: false, regions: [] });
  }
}