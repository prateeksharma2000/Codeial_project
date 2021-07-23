const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');

const log_directory=path.join(__dirname, '../production_logs');
fs.existsSync(log_directory)||fs.mkdirSync(log_directory);//clever way to write code!

const accessLogStream=rfs.createStream('access.log', {
    interval:'1d',
    path:log_directory,
});

const development =
{
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahSomething',
    database_name: 'comspace_express_development',
    smtp:
    {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'ps1077211@gmail.com',
            pass: 'prateek2000'
        }
    },
    google_client_id: '747203871405-u8fkguq8bm97ganl3hve29s9khopllpj.apps.googleusercontent.com',
    google_client_Secret: '1KIDCb18mYh42wv2gJquHzEI',
    google_callbackURL: 'http://localhost:8000/users/auth/google/callback',
    jwt_secret_or_key:'Comspace_Express',
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
}
const production = {
    name:"production",
    asset_path : process.env.CODEIAL_ASSET_PATH,
    session_secret_key : process.env.CODEIAL_SESSION_SECRET,
    db: process.env.CODEIAL_DB_NAME,
    smtp : {
     service: process.env.CODEIAL_SMTP_SERVICE,
     host: process.env.CODEIAL_SMTP_HOST,
     port: 587,
     secure: false,
     auth:{
         user: process.env.CODEIAL_AUTH_USER,
         pass: process.env.CODEIAL_AUTH_PASS
     }
   },
   google_clientID: process.env.CODEIAL_GOOGLE_CLIENTID,
   google_clientSecret:process.env.CODEIAL_GOOGLE_CLIENTSECRET,
   google_callbackURL:'http://localhost:8000/user/auth/google/callback',
   jwt_secret : process.env.CODEIAL_JWT_SECRET,
   morgan:{
     mode: 'combined',
     options:{stream:accessLogStream}
   }
 }

// module.exports = eval(process.env.NODE_ENV)==undefined?development:eval(process.env.NODE_ENV);
module.exports = development;