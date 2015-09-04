/**
 * Created by dongyin on 9/3/15.
 */
module.exports = function(req,res,next){
    console.log('login');
    res.redirect('/management');
}