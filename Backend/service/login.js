const AWS = require('aws-sdk');
AWS.config.update({
    region: 'ap-south-1'
})
const util = require('../utils/util');
const bcrypt = require('bcryptjs')
const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'redOnion';
const auth = require('../utils/auth');
async function login(user) {
    const username = user.username;
    const password = user.password;

    if (!username || !password) {
        return util.buildResponse(401, {
            message: 'Username and Password Required'
        });
    }

    const dynamoUser = await getUser(username.toLowerCase().trim());

    if (!dynamoUser || !dynamoUser.username) {
        return util.buildResponse(403, {
            message: 'User does not exist'
        });
    }

    const isPasswordCorrect = await bcrypt.compare(password, dynamoUser.password);

    const env = dynamoUser.password;
    if (!isPasswordCorrect) {
        return util.buildResponse(403, {
            message: 'Password is incorrect',env,password
        });
    }

    const userInfo = {
        userName: dynamoUser.userName,
        name: dynamoUser.name
    };
    // const token = auth.(userInfo);
    const response = {
        user: userInfo
    };
    return util.buildResponse(200, response);
}

async function getUser(username) {
    const params = {
        TableName: userTable,
        Key: {
            username: username
        }
    }
    return await dynamodb.get(params).promise().then(response => {
        return response.Item;
    }, error => {
        console.error('There is an error getting user: ', error);
    })
}

module.exports.login = login;
