// koa JSend
// Simple structured JSON responses for your API
// Based on JSend (http://labs.omniti.com/labs/jsend)

module.exports = function (){
  return function *(next){
    // koa context
    var that = this;
    

    /**
     * Augment koa context to have success response.
     *
     * @param {object} data
     */
    that.success = function (data){
      that.body = {
        status: 'success',
        data: data || null
      };
    };


    /**
     * Augment koa context to have `fail` response.
     *
     * @param {object} errors
     */
    that.fail = function (errors){
      that.body = {
        status: 'fail',
        data: errors
      };
    };


    /**
     * Augment koa context to have `error` response.
     *
     * @param {string/error} message
     * @param {object} data optional
     * @param {string/number} code optional
     */
    that.error = function (message, data, code){

      if (!(message instanceof Error) && (typeof message !== 'string'))
        throw new Error('Invalid message. Must be error object or string.');

      that.body = {
        status: 'error'
      };

      if (message instanceof Error)
        that.body.message = message.message;

      if (typeof message === 'string')
        that.body.message = message;

      if (data && typeof(data) === 'object') 
        that.body.data = data;

      if (code && (typeof(code) === 'string' || typeof(code) === 'number')) 
        that.body.code = code;
    };


    /**
     * Send `success` or `error` JSend response.
     *
     * @param {string/error/null} err
     * @param {object} data
     * @param {string/number} code
     */
    that.jsend = function (err, data, code){
      if (err)
        return that.error(err, data, code);

      that.success(data);
    };

    yield next;
  };
};