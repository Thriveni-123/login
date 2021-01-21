const constants = require('../constants');
var Database = require("../database/database");
var nodemailer = require('nodemailer');

module.exports.Login=  async (req,callback) => { 
    try {    
           await Database.connectionPool.getConnection(async function(err, connection){ 
                connection.changeUser({
                    database : Database.databaseName
                }, function(err) {
                    if (err) {
                        console.log("Database is not selected");
                        callback(new Error(err),null,null);
                    }
                    else {
                         var timestamp = Number(new Date());// current time as number
                         var file = req.files.profile.name;
                         profile = timestamp+"-"+file;
                        var selectUserDetails = "SELECT * FROM login_user WHERE profile='"+profile+"'";
                        connection.query(selectUserDetails, async function (err, result, fields) { //query   
                         if (err){
                         console.log("Query  is not executed");
                         callback(new Error(err),null,null);
                         }
                        else {    
                            Object.keys(result).forEach(async function(key) {
                                var LoginDetails = result[key]; 
                            if(result.length == 0) { 
                                 var insertSocialmediaAccount  = "INSERT INTO login_user(profile)VALUES('"+profile+"')"; 
                                 connection.query(insertSocialmediaAccount, async function (err, result,fields) {
                                        if (err){
                                            console.log("Query  is not executed");
                                            callback(new Error(err),null,null);
                                        }
                                        else {
                                        callback(null,LoginDetails,2);
                                        }
                                    });
                            }
                            else{              
                                var selectquery="SELECT * FROM login_user WHERE profile='"+profile+"'"
                                connection.query(selectquery,async function (err, result, fields){
                                if(err){
                                  console.log("Query  is not executed");
                                  callback(new Error(err),null,null);
                                }
                                else{
                                    Object.keys(result).forEach(async function(key) {
                                         var LoginDetails = result[key];
                                            callback(null,LoginDetails,1)
                                                    });
                                                }
                                                
                                            });
                                        } 
                                    });
                        }
                        });//end of connection.query
                    } // end of if database is selected
                connection.release();//release the connection
            }); // end of getConnection  
        });
    }catch(error){
        console.log('Something went wrong: Service: Login',error);
        //throw new Error(error);
        callback(new Error(error),null,null);
    }
}