const sql = require('mssql');
class MeController
{
    viewUsers(req, res)
    {
        const request = new sql.Request();
        request.query('select * from Users where delete_at IS NULL ORDER BY id ASC',(error, data)=>
        {
            if(error) console.log(error);
            else 
            {
                const {recordset}= data;
                res.render('me/home', {data:recordset});
            }
        })
    }
    updateUser(req, res)
    {
       
        const request = new sql.Request();
        const sqlString = 'select * from Users where uid =@uid';
        request
        .input('uid',  sql.VarChar(100), req.params.uid)
        .query(sqlString,(error, data)=>
        {
            if(error) console.log(error);
            else 
            {
                const {recordset}= data;
                res.render('me/update', {data:recordset});
            }
        })
    }
    authUser(req ,res)
    {

        const request = new sql.Request();
        const sqlString = 'exec update_user @uid,@fisrt_name,  @last_name, @user_name, @photo_url, @bio, @website_url,@facebook_url, @youtube_url, @twitter_url ,@instagram_url';
        request
        .input('uid', sql.VarChar(100), req.params.uid)
        .input('fisrt_name', sql.NVarChar(20), req.body.first_name)
        .input('last_name', sql.NVarChar(10), req.body.last_name)
        .input('user_name', sql.VarChar(50), req.body.user_name)
        .input('photo_url', sql.VarChar(200), req.body.photo_url)
        .input('bio', sql.NVarChar(500), req.body.bio)
        .input('website_url', sql.VarChar(200), req.body.website_url)
        .input('facebook_url', sql.VarChar(200), req.body.facebook_url)
        .input('youtube_url', sql.VarChar(200), req.body.youtube_url)
        .input('twitter_url', sql.VarChar(200), req.body.twitter_url)
        .input('instagram_url', sql.VarChar(200), req.body.instagram_url)
        .query(sqlString, (error, data)=>
        {
            if(error) console.log(error);
            else res.redirect('/me');
        })
    }
    async softDeleteUser(req, res)
    {
        const request =new sql.Request();
        const sqlString ='update Users set  delete_at = GETDATE() where uid =@uid';
        request
        .input('uid', sql.VarChar(100), req.params.uid)
        .query(sqlString,  (error, data)=>
        {
            if(error) console.log(error);
            else  res.redirect('/me');
        })
    }
    
    recycleBin(req,res)
    {
        const request= new sql.Request();
        request.query('select * from Users where delete_at IS NOT NULL', (error, data)=>
        {
            if(error) console.log(error);
            else 
            {
                const {recordset} =data;
                console.log(recordset);
                res.render('me/bin',  {data:recordset});
            }
        })  
    }
    restoreUser(req,  res)
    {
        const request = new sql.Request();
        request.query(`update Users set delete_at =NULL where uid =${req.params.uid}`, (error,  data)=>
        {
            if(error) console.log(error);
            else res.redirect('/me/recycle-bin');
        });
    }
    deleteUser(req, res)
    {
        const request= new sql.Request();
        const sqlString = 'DELETE FROM Users WHERE uid = @uid';
        request
        .input('uid', sql.VarChar(100), req.params.uid)
        .query(sqlString, (error, data)=>
        {
            if(error) console.log(error);
            else res.redirect('/me/recycle-bin');
        })
    }
    newUser(req, res)
    {
        res.render('me/new');
    }
    addUser(req, res)
    {
        const request = new sql.Request();
        const sqlString = 'exec INSERT_USER @uid, @first_name, @last_name, @user_name, @photo_url, @bio,@website_url, @facebook_url, @youtube_url, @twitter_url, @instagram_url';
        request
        .input('uid', sql.VarChar(100),req.body.uid)
        .input('first_name', sql.NVarChar(20),req.body.first_name)
        .input('last_name', sql.NVarChar(10),req.body.last_name)
        .input('user_name', sql.VarChar(50),req.body.user_name)
        .input('photo_url', sql.VarChar(200),req.body.photo_url)
        .input('bio', sql.NVarChar(500),req.body.bio)
        .input('website_url', sql.VarChar(200),req.body.website_url)
        .input('facebook_url', sql.VarChar(200),req.body.facebook_url)
        .input('youtube_url', sql.VarChar(200),req.body.youtube_url)
        .input('twitter_url', sql.VarChar(200),req.body.twitter_url)
        .input('instagram_url', sql.VarChar(200),req.body.instagram_url)
        .query(sqlString, (error, data)=>
        {
            if(error) console.log(error);
            else res.redirect('/me/new');
        })
    }


};

module.exports= new MeController;   