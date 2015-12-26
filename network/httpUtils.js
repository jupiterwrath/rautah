module.exports = {
  code: require('../codepacks/codeUtil.js'),

  host: function(req){
    var tmp = module.exports.code.util.chop(req.headers.host, '.'),
        len = tmp.index,
        dom = '',
        sub = '';
    if(len){
        dom = tmp.value[len-2]+'.'+tmp.value[len-1];
    }else{
        dom = req.headers.host;
    }return {'full': req.headers.host, 'domain': dom, 'subdomain': sub}; 
  },

  getRemote: function(req){
    var tmp = req.connection.remoteAddress,
        add = tmp.split(':');
    return add[add.length - 1];
  },

  filters: function(req){
    var blk = require('../conf/block.json'),
        ste = require('../conf/sites.json'),
        chk = 0;
    for(var i = 0, len = Object.keys(blk.sites).length; i < len; i++){
      if(req === blk.sites[i]){
        chk = 1; break;
    } }if(!chk){
    for(var i = 0, len = Object.keys(ste.sites).length; i < len; i++){
      if(req === Object.keys(ste.sites)[i]){
        chk = 2; break;
    } } }
      return chk;
    },

  checkRequest: function(req){
    var host = module.exports.host(req),
        user = module.exports.getRemote(req),
        test = module.exports.filters(host.full),
        time = require ('time'),
        date = new time.Date();
        date.setTimezone('UTC');
    return {"status":test, "time":date.toString(), "ip": module.exports.code.util.zero(user, 15, ' ', true), "target":host.full};
  },

  makeLog: function(log, msg){
    var file = require('fs');
    switch(log){
      case 0: log = 'missed';
        break;
      case 1: log = 'blocked';
        break;
      case 2: log = 'access';
        break;
    } file.appendFile('../logs/'+log+'.log', (msg + "\n"), function(err){
        if(err) throw err;
        console.log(msg);
      });
  },

  handleRequest: function(req, res){
    var check = module.exports.checkRequest(req),
      path = '',
      send = null;
    switch(check.status){
      case 0: path = 'MISSING ('+req.url+')';
        break;
      case 1: path = 'BLOCKED ('+req.url+')';
        break;
      case 2: path = req.url;
              send = ' :: Path: '+path;
        break;
    }
    if(req.url !== '/favicon.ico'){
      module.exports.makeLog(check.status,
        '    '+check.time+
        '    '+check.ip+
        '    '+check.target+
        ' -> '+path);
    } res.end(send);
  }
};