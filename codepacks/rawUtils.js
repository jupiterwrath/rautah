// Fail-safe version of the 'Split' function
  module.exports.chop = function(str, spl){
    if(str.indexOf(spl)){
      var tmp = str.split(spl),
          arr = {'index': tmp.length,
                'value': []};
          for(var i = 0; i < arr.index; i++){
            arr.value[i] = tmp[i];
          }
      return arr;
    }else{
      return {'index': 0, 'value': str};
  } };

// Zerofill function providing various options.
  module.exports.zero = function(str, num, chr, end){
    var len = str.length;
    if(!chr){chr='0';}
    if(len < num){
      for(var i=0; i < (num - len); i++){
        if(!end){
          str = chr + str;
        }else{
          str = str + chr;
  } } } return str; };