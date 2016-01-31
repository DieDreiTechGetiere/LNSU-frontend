$.fn.serializeObject = function()
{
  console.log("serializeObject triggered");
  var o = {};
  var a = this.serializeArray();
  $.each(a, function(){
    if(o[this.name] !== undefined)
    {
      if(!o[this.name].push)
      {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
      console.log("serializeObject triggered");
    }
    else
    {
      o[this.name] = this.value || '';
    }
  });
  return o;
};