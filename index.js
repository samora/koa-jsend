// Koa JSend
// Simple structured JSON responses for your API
// Based on JSend (http://labs.omniti.com/labs/jsend)

module.exports = function (){
  return function *(next){

    var that = this;
    that.jsend = {

      // @param data: (object/array)
      success: function (data){
        that.body = {
          status: 'success',
          data: data || null
        };
      },

      // @param errors: (object)
      fail: function (errors){
        that.body = {
          status: 'fail',
          data: errors
        };
      },

      // @param message: (string)
      // @param data: (object) - optional
      // @param code: (string/number) - optional
      error: function (message, data, code){
        that.body = {
          status: 'error',
          message: String(message)
        };

        if (data && typeof(data) === 'object') 
          that.body.data = data;

        if (code && (typeof(code) === 'string' || typeof(code) === 'number')) 
          that.body.code = code;
      },

    };

    yield next;
  };
};