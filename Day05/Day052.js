const matchers = [
  /(a|A)/g,
  /(b|B)/g,
  /(c|C)/g,
  /(d|D)/g,
  /(e|E)/g,
  /(f|F)/g,
  /(g|G)/g,
  /(h|H)/g,
  /(i|I)/g,
  /(j|J)/g,
  /(k|K)/g,
  /(l|L)/g,
  /(m|M)/g,
  /(n|N)/g,
  /(o|O)/g,
  /(p|P)/g,
  /(q|Q)/g,
  /(r|R)/g,
  /(s|S)/g,
  /(t|T)/g,
  /(u|U)/g,
  /(v|V)/g,
  /(w|W)/g,
  /(x|X)/g,
  /(y|Y)/g,
  /(z|Z)/g
];

const matcher =
  /(aA|Aa|bB|Bb|cC|Cc|dD|Dd|eE|Ee|fF|Ff|gG|Gg|hH|Hh|iI|Ii|jJ|Jj|kK|Kk|lL|Ll|mM|Mm|nN|Nn|oO|Oo|pP|Pp|qQ|Qq|rR|Rr|sS|Ss|tT|Tt|uU|Uu|vV|Vv|wW|Ww|xX|Xx|yY|Yy|zZ|Zz)/g;

module.exports = (input) => {
  return matchers.map((match, index) => {

    return input.replace(match, '');
  }).map((matchesRemoved) => {
    let reacted = matchesRemoved;

    while (reacted.match(matcher)) {
      reacted = reacted.replace(matcher, '');
    }

    return reacted;
  }).reduce((acc, curr) => {
    if (acc === 0) {
      acc = curr.length;
    } else if (curr.length < acc) {
      acc = curr.trim().length;
    }

    return acc;
  }, 0);
};
