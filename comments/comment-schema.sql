SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";
--
-- Baza danych: `bogusz2_blog-site`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `comments`
--
CREATE TABLE `comments` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idPost` INT NOT NULL,
  `user_name` TEXT CHARACTER SET utf8 COLLATE utf8_polish_ci,
  `message` TEXT CHARACTER SET utf8 COLLATE utf8_polish_ci,
  `time_added` DATETIME
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_polish_ci;

-- --------------------------------------------------------

--
-- inicjalizacja tabeli `comments`
--



COMMIT; -- <-- musi być przy każdej inicjalizacji