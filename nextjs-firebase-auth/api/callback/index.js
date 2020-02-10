const jwt = require('jsonwebtoken');
const request = require('request');

async function callback(req, res){
    const url = 'https://api.line.me/oauth2/v2.1/token';
    const params = {
        grant_type:"authorization_code",
        code: req.query.code,
        redirect_uri: 'http://localhost:3001/callback',
        client_id: "",
        client_secret: ""
    };
    const header = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    const result = await postData(params, url, header);
    const profile = jwt.decode(result.id_token, {
        'typ': 'JWT',
        'alg': 'HS256'
    });
    
    let email = '';
    if(profile.email){
        email = profile.email;
    }

    res.writeHead(302, {
        'Location': `http://localhost:3000/line?name=${profile.name}&profile=${profile.picture}&email=${email}`
    });
    res.end();

};

function postData(param, url, headers){
    return new Promise(resolve =>{
        request.post({
            headers: headers,
            url: url,
            form: param
        },
            (err, httpResponse, body) => {
                if (err) {
                    console.log('err:::', err);
                    resolve(null);
                }else{
                    resolve(JSON.parse(body));
                }
            },
        );
    });
};

module.exports = {
    callback
}