SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";
--
-- Baza danych: `bogusz2_blog-site`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `posts`
--
CREATE TABLE `posts` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` TEXT CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `second-title` TEXT CHARACTER SET utf8 COLLATE utf8_polish_ci DEFAULT NULL,
  `desc` TEXT CHARACTER SET utf8 COLLATE utf8_polish_ci DEFAULT NULL,
  `img-scr` TEXT CHARACTER SET utf8 COLLATE utf8_polish_ci DEFAULT NULL,
  `background-color` TEXT CHARACTER SET utf8 COLLATE utf8_polish_ci DEFAULT NULL,
  `link` TEXT CHARACTER SET utf8 COLLATE utf8_polish_ci DEFAULT NULL,
  `time-added` DATETIME,
  `time-edited` DATETIME
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_polish_ci;

-- --------------------------------------------------------

--
-- inicjalizacja tabeli `posts`
--

INSERT INTO `posts` (`title`, `second-title`, `desc`,`img-scr`, `background-color`, `link`, `time-added`) VALUES
('Game Snake',
'Gra snake - moj pierwszy projekt stworzony w JS!', 
'Opis gry:\r\nJest to klasyczny snake. Aby opanować trochę podstawy JS którego się uczę postanowiłem zrobić cośco mi w tym pomoże.Nie chciałem słuchać na sucho tutoriali stąd pomysł by stworzyć coś prostego przy czym sie czegoś nauczę.\r\n\r\nW grze chodzi o to by zebrać jak najwięcej owoców wraz z nimi długość węża rośnie. Miłej zabawy!', 
'snake-game.PNG', 
'364244', 
'snake/snake.html',
'2019-02-08 09:00:00'),
('Weather app', 
'Sprawdz jaką mamy dziś pogode i jak się ubrać! Node.js wita!', 
'Aplikacja do pogody:\r\nJest to mój pierwszy projekt wykorzystyjący możliwości jakie daje mi node.js. Aplikacja wykorzystuje takie api jak geocode od google i api do pogody darksky.\r\n\r\nObługi tych api nauczyłem sie z kursu node.js na udemy, który tak na marginesie był bardzo dobry. Teraz aplikacja ma nabrać bardziej praktycznego oblicza poprzez połączenie jej ze frontendem. To jaką dziś mamy pogode?', 
'weather.png', 
'c6c6c6', 
'weather/weather.html',
'2019-02-08 09:00:00');

COMMIT; -- <-- musi być przy każdej inicjalizacji