function CountDown(obj){
  var _this = this;
  _this.curTime = obj && obj.curTime || 1450850493.727;
  _this.tarTime = obj && obj.tarTime || 1451005199.000;
  _this.format = obj && obj.format || 'yy-mm-dd-hh-mi-se';
  _this.dValue = _this.tarTime - _this.curTime;

  if(_this.dValue <= 0) return {invalid:false};

  _this.curTime = new Date(_this.curTime*1000);
  _this.tarTime = new Date(_this.tarTime*1000);
  _this.dateDvalue = _this.initDvalue();
  
  if(_this.curTime.getMonth() == _this.tarTime.getMonth()){
    _this.getDvalue()
    return _this.dateDvalue
  }else{
    console.log('Sorry, it\'s only support the \'curTime\' and \'tarTime\' in the one month currently! \n  I will add the \'across month\' in the next version!')
    return {invalid:false};
  }
}
CountDown.prototype.OneMonth = function() {
  
};
CountDown.prototype.initDvalue = function() {
  // 检测format格式
  var data = this.format.split('-');
  var dateDvalue = {};
  data.forEach(function(i){
    dateDvalue[i]='00';
  })
  dateDvalue.invalid = true;
  return dateDvalue;
};
CountDown.prototype.getDvalue = function() {
  if(this.dateDvalue.hasOwnProperty('se')) this.dateDvalue.se = this.zero(this.dValue % 60);
  if(this.dateDvalue.hasOwnProperty('mi')) this.dateDvalue.mi = this.zero(Math.floor(this.dValue / 60) % 60);
  if(this.dateDvalue.hasOwnProperty('hh')) this.dateDvalue.hh = this.zero(Math.floor(this.dValue / 3600) % 24);
  if(this.dateDvalue.hasOwnProperty('dd')) this.dateDvalue.dd = this.zero(Math.floor(this.dValue / (3600*24)) % 30);
};
CountDown.prototype.zero = function(n) {
  var n = parseInt(n, 10);
  if(n > 0){
    if(n <= 9){
      n = "0" + n;  
    }
    return String(n);
  }else{
    return "00";  
  }
};