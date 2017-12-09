(function() {
  "use strict";

  var button = document.getElementById('btnGetGender');
  button.addEventListener('click', getGenderClick);

  function getGenderClick(evt) {
    evt.preventDefault();
    var name = document.getElementById('name').value;
    if (typeof name !== 'undefined' && name !== '') {
      alert(getGenderByName(name));
    }
  }

  const DATA = [
    {
      last_letter: 'a',
      default: 0,
      exceptions: ['bliw','br','civ','clim','diem','dnar','du','err','fa','h|','hc','ho','hpa','htan','ile|','iledr','imer','ja','jr','ka','kk','la|','lg','lit','liv','loc','lro','man','may','mini','mlaj','mn','mru','muz','ng','nnat','np','om','raj','rat','raug','rieb','riev','rik','riu','rp','ruj','rum','rut','sa','ssa','ssu','tai|','tano','tari','tel','terp','toj','tsi','ua','ud','uh','uq','va','vd','vi|','vlis','vo','vr','w','yan','zuo']
    },
    {
      last_letter: 'b',
      default: 1,
      exceptions: ['adani']
    },
    {
      last_letter: 'c',
      default: 1,
      exceptions: ['il','it']
    },
    {
      last_letter: 'd',
      default: 1,
      exceptions: ['ade','ir']
    },
    {
      last_letter: 'e',
      default: 0,
      exceptions: ['ad','aj','ak','bao','bu','cal','ced','cilef','ciru','cn','curb','dad','deb','di|','dia|','diat','dic','dila','div','dla','dlih','dlinesa','dn','do','el','g|','ge','go','gr','gu','hp','ib','ile','ill','in','j','ke','ki','klo','kn','ko','ks','ku','lat','lau','lav','lc','ledr','leg','leit','len','less','leu','lh','libat','lil','lir','lled','lo','ly','ma','mea','med','mi','ml','mr','ms','mu','my','nahp','nan','navi','navla','navle','navlig','navo','ned','neico','neit','nelig','nelsu','ner|','niav','niaw','nidla','nidu','nim','nin','nio','nitr','nnav','nner','nnh','nnoi','noc','nod','noe','nof','noice','noicla','noide','noih','noj','nor','not','nr','nu','oi','on','pe','pi','po','pp','py','ras','rb','rd','reb','red','rf','ria','rih','ro','rr','rt','sd','se','sieg','sliw','soj','sr','sse','ssu','su','tea','tedlaw','tedoi','teds','teia','tesin','teze','tezin','tided','tiu','tl','tna','tne','tra','treal','treh','trei','tser','ua','ug','uo','uqa','uqe','uqia','uqini','uqir','uql','uqo','uqr','use','uso','uzo','vat','vi','vo','w','y','z|','za','ze','zu']
    },
    {
      last_letter: 'f',
      default: 1,
      exceptions: []
    },
    {
      last_letter: 'g',
      default: 1,
      exceptions: ['ie','neh','nipm','nob','nuj']
    },
    {
      last_letter: 'h',
      default: 1,
      exceptions: ['ak','an','ar','s','teb','ter','tes','tezil','tezir','tide|','tidu','tur']
    },
    {
      last_letter: 'i',
      default: 1,
      exceptions: ['ale','ana','ano','ba','cajd','calg','caram','cari|','carid','carol','cedli','cen|','cia','cira','cle|','cn','co','cu','dak','diel','dir','duh','elrih','elris','em|','enir','ha','j|','ki','kusi','kuy|','lag','lar','legn','lei','lek','lel','len','les','leu','lev','lez','li','lleh','llek','lra','lrednaw','mah','mei','meo','mor','mt','muss','muy','muz','nab','nai','nari','nas','nat','naul','nav|','navi|','navli','nay','ne|','nec','neg','nel','neru','neso|','nev','nez','nic','nie','nil','nnej','nom','nu','ram','rev','rh','roa','ruya','sl','sr','sseg','tor','ts','tter','tteu','ua','vai','z|','zaz','zus']
    },
    {
      last_letter: 'j',
      default: 1,
      exceptions: []
    },
    {
      last_letter: 'k',
      default: 1,
      exceptions: ['an']
    },
    {
      last_letter: 'l',
      default: 1,
      exceptions: ['am','eb|','ebam','ebar','ebas','ebaz','ehca','eht','euq','iag','inel','lem','o','eirum|','eira|','eird']
    },
    {
      last_letter: 'm',
      default: 1,
      exceptions: ['ailil','air','aiv','arim','ee','eleu','em','er']
    },
    {
      last_letter: 'n',
      default: 1,
      exceptions: ['ailil','aillil','airam','airi','airy','aivi','ale','alir','asu','avin','avira','ayri','azu','eho','ekc','ele','ell','em','era','ets','ielr','ilek','ilev','ims','ir','itsi','itsr','na|','ny','orah','uk','us','y']
    },
    {
      last_letter: 'o',
      default: 1,
      exceptions: ['acie','ce','cim','cit','d|','h|','ico','ka','ke','kiek','kies','kihc','kihs','kika','kiku','kim','kir','kit','ko','kur','kus','kuy','kuzi','leu','nats','niruam','rro','tej','tnem','ul']
    },
    {
      last_letter: 'p',
      default: 1,
      exceptions: ['iy']
    },
    {
      last_letter: 'q',
      default: 1,
      exceptions: []
    },
    {
      last_letter: 'r',
      default: 1,
      exceptions: ['al','amal','amaz','amicy','amidi','amidue','amilo','amisl','amizl','amsire','anide','effi','efi','ehta','ehts','epse','etse|','iadam','ialce','ialo','ian|','icalg','idan|','idel','inav|','inave|','inec|','inele','inez','inoi','oif','onoe','ycar']
    },
    {
      last_letter: 's',
      default: 1,
      exceptions: ['adinu','aitak','ecr','edec','edio','edlia','edred','edru','eduel','edui','egri','ekl','eleg','enele','eng','eni|','enia','enid|','enir','ep','ered','erim|','erima','ero','even','iah','ial','iat','ida','ila','ile|','ili','ill','ily','inedl','inna','io','ira','irc|','iri|','irim','iris','irod','iry','isi','itr','iz','orieh','yd','yni','yr']
    },
    {
      last_letter: 't',
      default: 1,
      exceptions: ['eb','er','ide|','ig','se','ten','ti']
    },
    {
      last_letter: 'u',
      default: 1,
      exceptions: ['d|','la','rahim|','s|']
    },
    {
      last_letter: 'v',
      default: 1,
      exceptions: []
    },
    {
      last_letter: 'w',
      default: 1,
      exceptions: []
    },
    {
      last_letter: 'x',
      default: 1,
      exceptions: []
    },
    {
      last_letter: 'y',
      default: 1,
      exceptions: ['am','ana','anoi','cal','cara|','cari|','carod','cav','cira','clao','cn','cren','cu','dal','deh','elrih','enar','g','ha','htor','lat','lea','lecu','leg','lek','len','les','leu','lev','lez','lia','lir','lle','lram','mat','nai','nari','nas','nau','navl','naw','neg','nel','neu','nna','nom','ram','remi','rems','ri','ror','si','so','su','t','leira']
    },
    {
      last_letter: 'z',
      default: 1,
      exceptions: ['eni|','enir','ered','il','ir','u']
    },
  ]; 

  function getGenderByName(name) {

    name = removeAccents(name);
    var last_letter = name.slice(-1);
    var search_string = reverseString(name.toLowerCase().slice(0, -1)) + '|';
    var data = findObjectByAttribute(DATA, 'last_letter', last_letter);
    if (data) {
      var gender = data.default;
      var exception = findException(data.exceptions, search_string);
      if (exception) {
        gender = ((gender === 0)? 1 : 0);
      }
      return ((gender === 0)? 'female' : 'male');
    }
    return null;
  }

  function reverseString(str) {
      return str.split("").reverse().join("");
  }

  function findObjectByAttribute (items, attribute, value) {
    for (var i = 0; i < items.length; i++) {
      if (items[i][attribute] === value) {
        return items[i];
      }
    }
    return null;
  }

  function findException (exceptions, search_string) {
    for (var i = 0; i < exceptions.length; i++) {
      if (search_string.indexOf(exceptions[i]) == 0) {
        return exceptions[i];
      }
    }
    return null;
  }

  function removeAccents(string) {
    var mapHex  = {
      a : /[\xE0-\xE6]/g,
      e : /[\xE8-\xEB]/g,
      i : /[\xEC-\xEF]/g,
      o : /[\xF2-\xF6]/g,
      u : /[\xF9-\xFC]/g,
      c : /\xE7/g,
      n : /\xF1/g
    };
    for (var letter in mapHex) {
      var regexpress = mapHex[letter];
      string = string.replace( regexpress, letter);
    }
    return string;
  }

})();
