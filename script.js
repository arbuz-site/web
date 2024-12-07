// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Настройка Web App
tg.expand();
document.body.style.backgroundColor = tg.themeParams.bg_color || "#ffffff";

// Создание интерфейса
const appDiv = document.getElementById("app");

// Поле для ввода сообщения
const textarea = document.createElement("textarea");
textarea.placeholder = "Введите сообщение...";
textarea.style.width = "90%";
textarea.style.margin = "20px auto";
textarea.style.display = "block";
textarea.style.height = "100px";

// Кнопка для отправки сообщения
const sendButton = document.createElement("button");
sendButton.textContent = "Отправить боту";
sendButton.style.display = "block";
sendButton.style.margin = "10px auto";
sendButton.style.padding = "10px 20px";
sendButton.style.cursor = "pointer";

// Поле для вывода ответа от бота
const outputDiv = document.createElement("div");
outputDiv.style.width = "90%";
outputDiv.style.margin = "20px auto";
outputDiv.style.padding = "10px";
outputDiv.style.border = "1px solid #ccc";
outputDiv.style.borderRadius = "5px";
outputDiv.style.minHeight = "50px";
outputDiv.style.backgroundColor = "#f9f9f9";
outputDiv.style.textAlign = "left";
outputDiv.textContent = "Ответ от бота будет здесь.";

// Логика отправки данных
sendButton.addEventListener("click", () => {
    const message = textarea.value.trim();
    if (message) {
        tg.sendData(message); // Отправка данных боту
        outputDiv.textContent = "Сообщение отправлено боту. Ожидайте ответ...";
        textarea.value = ""; // Очистка поля ввода
    } else {
        alert("Введите сообщение!");
    }
});

// Добавление элементов на страницу
appDiv.appendChild(textarea);
appDiv.appendChild(sendButton);
appDiv.appendChild(outputDiv);

// Слушатель событий для получения ответа от бота (например, через REST API)
tg.onEvent("dataReceived", (data) => {
    outputDiv.textContent = `Ответ от бота: ${data}`;
});

// Поддержка изменения темы Telegram
tg.onEvent("themeChanged", () => {
    document.body.style.backgroundColor = tg.themeParams.bg_color || "#ffffff";
});
