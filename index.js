const TelelgramApi = require('node-telegram-bot-api');

const token = '5500171530:AAH35RnaPjD5palKHi9dF4iB3mJggX-0zpE';

const bot = new TelelgramApi(token, {polling: true});

const sequelize = require('./db');

const chats = {};

const gameOptions = {
	reply_markup: JSON.stringify({
		inline_keyboard: [
			[{ text: '1', callback_data: '1' }, { text: '2', callback_data: '2' }],
			[{ text: '3', callback_data: '3' }, { text: '4', callback_data: '4' }],
			[{ text: '5', callback_data: '5' }, { text: '6', callback_data: '6' }],
			[{ text: '7', callback_data: '7' }, { text: '8', callback_data: '8' }],
			[{ text: '9', callback_data: '9' }],
		]
	})
}

const start = async () => {

	try {
		await sequelize.authenticate()
		await sequelize.sync()
	} catch (e) {
		console.log('Ошибка подключения!', e);
	}

	bot.setMyCommands([
		{ command: '/game', description: 'Начать игру' },
	]);

	bot.on('message', async msg => {
		const chatId = msg.chat.id;
		const text = msg.text;

		if (text === '/info') {
			return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`);
		}

		if (text === '/game') {
			await bot.sendMessage(chatId, `Давай поиграем в игру. Угадай число от 0 до 9`);
			const randomNumber = Math.floor(Math.random() * 10);
			chats[chatId] = randomNumber;
			return bot.sendMessage(chatId, 'Отгадывай', gameOptions);
		}

		return bot.sendMessage(chatId, 'Я тебя не понимаю!');
	})

	bot.on('callback_query', async msg => {
		const data = msg.data;
		const chatId = msg.message.chat.id;

		if (data == chats[chatId]) {
			return await bot.sendMessage(chatId, `Ты угадал! Это была цифра ${chats[chatId]}`)
		} else {
			return await bot.sendMessage(chatId, `Ты проиграл -_- Это была цифра ${chats[chatId]}`)
		}
	})
}

start();