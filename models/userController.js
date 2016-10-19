/**
 * Created by zmz on 07/10/16.
 */
var User = require('./user');

exports.getUser = function(tagId, cb){
    var result = {};
    User.find({tagId: tagId}).exec(function(err, data){
        if(err){
            console.log(err);
            result.success = false;
            cb(result);
        } else {
            console.log(data);
            result.success = true;
            result.data = data;
            cb(result);
        }
    });
}