const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');
const md5 = require('js-md5');

function onError(error) {
    console.log('⚠️  An error occurred while executing the request: ');
    console.log('');
    console.error(error.message);

    if (error.response.data) {
        console.error(error.response.data);
    }

    console.log('');
    process.exit();
}

async function isTokenValid(token) {
    try {
        let response = await axios.get('https://api.telegram.org/bot' + token + '/getMe', { validateStatus: false });
        let result = response.data;

        return result.ok;
    } catch (error) {
        onError(error);
        return false;
    }
}

async function main() {
    let zip = './dist/ShaitanDelayLatest.zip';

    if(!fs.existsSync(zip)) {
        console.log('⚠️  ZIP-file not found.');
        console.log('');
        process.exit();
    }

    let token = process.argv[2] ?? null;
    let chatID = process.argv[3] ?? null;
    let isChannel = process.argv[4] ? process.argv[4] === 'channel' : false;

    if (token !== null) {
        let tokenValid = await isTokenValid(token);

        if (tokenValid !== null) {
            if (chatID) {
                let telegramAPI = "https://api.telegram.org/bot" + token;
                try {
                    const formData = new FormData();

                    if (isChannel)
                        chatID = '-' + chatID;

                    console.log('⏳ Uploading to Telegram... Please wait');

                    formData.append('chat_id', chatID);
                    formData.append('document', fs.createReadStream(zip));
                    formData.append('caption', "*🔮 Build ID:*\n#" + md5(Date.now().toString()));
                    formData.append('parse_mode', 'markdown')

                    const response = await axios.post(`${telegramAPI}/sendDocument`, formData, {
                        headers: formData.getHeaders(),
                        validateStatus: false
                    });

                    if (response?.data) {
                        if (response.data.ok) {
                            console.log('✅ File uploaded successfuly!');
                            console.log('');
                        } else {
                            console.log('⚠️  Upload failed: ');
                            console.log('');
                            console.error(response.data);
                            console.log('');
                        }
                    } else {
                        console.log('⚠️  Upload failed: ');
                        console.error('Empty response.');
                        console.log('');
                    }
                } catch (error) {
                    onError(error);
                }
            } else {
                console.log('⚠️  ChatID is empty.');
            }
        } else {
            console.log('⚠️  Token is invalid.');
        }

    } else {
        console.log('⚠️  Token is empty.');
    }

    console.log('');
}

main();

