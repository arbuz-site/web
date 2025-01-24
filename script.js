let tg = window.Telegram.WebApp;
const chatId = tg.initDataUnsafe.user ? tg.initDataUnsafe.user.id : null;

if (chatId) {
    console.log("Chat ID пользователя:", chatId);
} else {
    const noChatMessage = document.createElement("div");
    noChatMessage.textContent = "Используйте Telegram";
    noChatMessage.style.fontSize = "20px";
    noChatMessage.style.fontWeight = "bold";
    noChatMessage.style.color = "#ff0000";
    document.body.appendChild(noChatMessage); // Выводим сообщение на страницу
    console.error("Не удалось получить Chat ID пользователя.");
}

const token = "8009417628:AAH7sSFio0PPoOV3bTsvwxW7RaFqooGABHk";
const apiUrl = `https://api.telegram.org/bot${token}/`;

let isSending = false; // Флаг для предотвращения многократных отправок

// Функция отправки сообщения
async function sendMessage(text) {
    if (!chatId) {
        console.error("Chat ID пользователя не найден.");
        return;
    }

    if (isSending) { // Проверка флага, чтобы избежать многократных отправок
        console.log("Подождите, сообщение уже отправляется...");
        return;
    }

    isSending = true; // Устанавливаем флаг отправки

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
            const errorText = await response.text();
            console.error("Ошибка отправки сообщения", errorText);
            alert("Ошибка при отправке сообщения. Попробуйте позже.");
        }
    } catch (error) {
        console.error("Ошибка:", error);
        alert("Произошла ошибка. Попробуйте позже.");
    } finally {
        isSending = false; // Снимаем флаг после завершения отправки
    }
}

// Функция добавления сообщения в чат
function addMessageToChat(message) {
    const messagesList = document.getElementById("messages");
    const messageElement = document.createElement("li");
    messageElement.textContent = message;
    messagesList.appendChild(messageElement);
}

// Обработчик клика на кнопку отправки
document.getElementById("sendMessage").addEventListener("click", () => {
    const input = document.getElementById("messageInput");
    const message = input.value.trim();

    if (message) {
        sendMessage(message);
        input.value = ""; // Очищаем поле ввода после отправки
    } else {
        alert("Пожалуйста, введите сообщение.");
    }
});

// Автоматическая отправка сообщения при нажатии Enter
document.getElementById("messageInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        const input = document.getElementById("messageInput");
        const message = input.value.trim();

        if (message) {
            sendMessage(message);
            input.value = "";
        } else {
            alert("Пожалуйста, введите сообщение.");
        }
    }
});
