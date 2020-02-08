exports.hendler = function(event, context, callback){
    callback(null, {
        statusCode:200,
        body:"Welocome to the super secret area!"
    })
}