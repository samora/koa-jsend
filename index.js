// koa JSend
// Simple structured JSON responses for your API
// Based on JSend (http://labs.omniti.com/labs/jsend)

module.exports = function (){
  return async function(ctx, next){
  
    /**
     * Augment koa context to have success response.
     *
     * @param {object} data
     */
    ctx.success = function (data){
      ctx.body = {
        status: 'success',
        data: data || null
      };
    };
    

    /**
     * Augment koa context to have `fail` response.
     *
     * @param {object} errors
     */
    ctx.fail = function (errors){
      ctx.body = {
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
    ctx.error = function (message, data, code){

      if (!(message instanceof Error) && (typeof message !== 'string'))
        throw new Error('Invalid message. Must be error object or string.');

      ctx.body = {
        status: 'error'
      };

      if (message instanceof Error)
        ctx.body.message = message.message;

      if (typeof message === 'string')
        ctx.body.message = message;

      if (data && typeof(data) === 'object') 
        ctx.body.data = data;

      if (code && (typeof(code) === 'string' || typeof(code) === 'number')) 
        ctx.body.code = code;
    };


    /**
     * Send `success` or `error` JSend response.
     *
     * @param {string/error/null} err
     * @param {object} data
     * @param {string/number} code
     */
    ctx.jsend = function (err, data, code){
      if (err)
        return ctx.error(err, data, code);

      ctx.success(data);
    };

    await next();
  };
};