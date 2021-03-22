
//Generate verification digit 
export const verificationDigit = rut => {
  var s = rut.split('').reverse(),
      j = 2,
      t = 0,
      v = '',
      l = s.length,
      i;

  for (i = 0; i < l; i++) {
    if (8 === j) { j=2; }
    s[i] *= j++;
    t += s[i];
  }

  t %= 11;
  t = 11 - t;

  if (10 === t) v='K';
  else if (11 === t) v='0';
  else v = t.toString();

  return v;
}

//Verify if rut is correct and return the format 12345678-9
export const verifyRut = (value, company) => {
  var rut = value.replace(/[^kK\d]/g, ''), // solo deja nums y k
      len = rut.length,
      r = rut.substring(0, len-1).replace(/[kK]/g, ''), // sin digito verificador y quita las k
      d = rut.substring(len-1).toUpperCase(), // digito verificador
      valid,
      v;

  len = r.length;

  if (0 < len) {
    v = verificationDigit(r);
    r = r.substring(len-9, len);
    value = r + '-' + d;

    if (v !== d) {
      valid = false;
    } else if (company && 50000000 > parseInt(r, 10)) {
      valid = false;
    } else {
      valid = true;
    }

  } else {
    value = '';
  }
  
  return valid;
}
