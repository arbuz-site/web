let tg = window.Telegram.WebApp;
const chatId = tg.initDataUnsafe.user ? tg.initDataUnsafe.user.id : null;
if (chatId) {
    console.log("Chat ID пользователя:", chatId);
} else {
    console.error("Не удалось получить Chat ID пользователя.");
}

const token = "8009417628:AAH7sSFio0PPoOV3bTsvwxW7RaFqooGABHk";
const apiUrl = `https://api.telegram.org/bot${token}/`;

async function sendMessage(text) {
    if (!chatId) {
        console.error("Chat ID пользователя не найден.");
        return;
    }
    const url = `${apiUrl}sendMessage`;
    const payload = {
        chat_id: chatId,
        text,
        parse_mode: "HTML",
    };
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        if (response.ok) {
            console.log("Сообщение отправлено");
            addMessageToChat(`Вы: ${text}`);
        } else {
            console.error("Ошибка отправки сообщения", await response.text());
        }
    } catch (error) {
        console.error("Ошибка:", error);
    }
}
function addMessageToChat(message) {
    const messagesList = document.getElementById("messages");
    const messageElement = document.createElement("li");
    messageElement.textContent = message;
    messagesList.appendChild(messageElement);
}
document.getElementById("sendMessage").addEventListener("click", () => {
    const input = document.getElementById("messageInput");
    const message = input.value.trim();
    if (message) {
        sendMessage(message);
        input.value = "";
    }
});
