/*
实现一个arrange函数，可以进行时间和工作调度

*/

function arrange(str){
  var org_value=str;
  var action_type ='';
  var push_action = function(){
      return 'Start to '+action_type;
  };
  var commit_action = function(){
      return 'Start to '+action_type;
  };

  var default_action = function(){
      var result = org_value+'  is not notified';
      console.log(result);
      return result;
  };

  var do_spect_action = function(){
      var result = '';
      switch(action_type){
          case 'push':{
              result = push_action();
              break;
          }
          case 'commit':{
              result = commit_action();
              break;
          }
          default:{
              result = default_action();
              break;
          }
      };
      console.log(result);
      return result;
  };

  var _wait_ = function(waitTime){
      var that =this;
      default_action();
      if(action_type){
          setTimeout(function(){
              console.log('等待' + waitTime+'秒后 ');
              do_spect_action();
          },waitTime*1000);
      }
    return that;
  };
  
  var _waitFirst_ = function(waitTime){
    var that =this;
    if(action_type){
      setTimeout(function(){
        console.log('等待' + waitTime+'秒后 ');
        do_spect_action();
        default_action();
      },waitTime*1000);
    }
    return that;
  };
  
  var _real_action_ = do_spect_action;
      
  return {
      wait:function(waitTime){
          _real_action_ = _wait_.bind(this,waitTime);
          return this;
      },
  
      waitFirst:function(waitTime){
          _real_action_ = _waitFirst_.bind(this,waitTime);
          return this;
      },
      do:function(actionType){
        action_type = actionType;
        _real_action_();
        return this;
      },
          
      valueOf:function(){
          return default_action();
      },
      toString:function(){
          return default_action();
      }
  }
}

arrange('William').wait(5).do('commit');
arrange('William').waitFirst(5).do('push');