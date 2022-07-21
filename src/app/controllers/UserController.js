const sql = require('mssql');

class userController 
{
    getCurrentUser(req, res)
    {
        const request = new sql.Request();
        request.query('select * from dbo.currentUser', (err, data)=>
        {
            if(err) console.log(err);
            else 
            {
                res.send(data);
            }
        })
    }
    async insertCurrentUser(req,  res)
    {
        const  uid = JSON.parse(Object.keys(req.body)[0]).uid;
        const request = new sql.Request();

        await request.query(`exec insert_currentUser ${uid}`);
        await request.query('select * from dbo.currentUser', (error, data)=>
        {
            if(error) console.log(error);
            else 
            {
                res.send(data);
            }
        })

    }
    async deleteCurrentUser(req, res)
    {
        const  uid = JSON.parse(Object.keys(req.body)[0]).uid;
        await request.query(`exec delete_currentUser ${uid}`);
    }
    searchUser(req, res)
    {
        const request = new sql.Request();
        let sqlString;
        console.log(req.query.q);
        
            if(req.query.type==='less') 
                sqlString = `SELECT  TOP 5 user_name, first_name, last_name, full_name, photo_url, bio, tick FROM  Users WHERE user_name LIKE N'%${req.query.q}%' OR full_name LIKE N'%${req.query.q}%'`;
            else if(req.query.type==='more')
                sqlString = `SELECT  user_name, first_name, last_name, full_name, photo_url, bio, tick FROM  Users WHERE user_name LIKE N'%${req.query.q}%' OR full_name LIKE N'%${req.query.q}%'`;
            request
            .query(sqlString, (error, data)=>
            {
                if(error) console.log(error);
                else 
                {
                    res.send(data);
                }
            })
    }
};

module.exports = new userController;