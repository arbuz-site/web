document.getElementById('messageForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const message = document.getElementById('userMessage').value;
    const chatId = 'YOUR_CHAT_ID'; // Замените на ID чата или используйте ID админа
    const botToken = '-1002328129351'; // Ваш токен бота
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const params = new URLSearchParams();
    params.append('chat_id', chatId);
    params.append('text', message);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString()
        });
        if (!response.ok) throw new Error('Ошибка отправки');
        alert('Сообщение отправлено!');
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Не удалось отправить сообщение');
    }
});
