-- Insert new custom (non-TOCFL) words from the PAVC1 word list
-- 45 new cards, 46 total senses
-- (a few characters have >1 sense and become one card with multiple senses)

INSERT OR IGNORE INTO tags (name) VALUES ('pavc1');

-- 不一定 -- 1 sense(s): uncertain, not for sure, 
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('不一定', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='不一定' ORDER BY id DESC LIMIT 1), 'bùyídìng', 'ADV', 'uncertain, not for sure, not necessarily', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='不一定' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 德國 -- 1 sense(s): Germany, German
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('德國', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='德國' ORDER BY id DESC LIMIT 1), 'Déguó', 'N', 'Germany, German', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='德國' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 德文 -- 1 sense(s): the German language
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('德文', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='德文' ORDER BY id DESC LIMIT 1), 'Déwén', 'N', 'the German language', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='德文' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 點鐘 -- 1 sense(s): o'clock
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('點鐘', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='點鐘' ORDER BY id DESC LIMIT 1), 'diǎn zhōng', 'M', 'o''clock', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='點鐘' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 兒 -- 2 sense(s): son; a suffix
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('兒', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='兒' ORDER BY id DESC LIMIT 1), 'ér', 'BF', 'son', 0);
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='兒' ORDER BY id DESC LIMIT 1), '-r', 'P', 'a suffix', 1);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='兒' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 法 -- 1 sense(s): transliteration of the F 
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('法', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='法' ORDER BY id DESC LIMIT 1), 'Fǎ', 'BF', 'transliteration of the F in France', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='法' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 法國 -- 1 sense(s): France, French
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('法國', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='法國' ORDER BY id DESC LIMIT 1), 'Fǎguó', 'N', 'France, French', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='法國' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 飯廳 -- 1 sense(s): dining room
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('飯廳', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='飯廳' ORDER BY id DESC LIMIT 1), 'fàntīng', 'N', 'dining room', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='飯廳' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 法文 -- 1 sense(s): the French language
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('法文', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='法文' ORDER BY id DESC LIMIT 1), 'Fǎwén', 'N', 'the French language', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='法文' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 公車站 -- 1 sense(s): bus stand, bus stop
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('公車站', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='公車站' ORDER BY id DESC LIMIT 1), 'gōngchēzhàn', 'N', 'bus stand, bus stop', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='公車站' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 好幾 -- 1 sense(s): quite a few
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('好幾', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='好幾' ORDER BY id DESC LIMIT 1), 'hǎojǐ', 'ADV-NU', 'quite a few', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='好幾' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 好看 -- 1 sense(s): to be good-looking
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('好看', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='好看' ORDER BY id DESC LIMIT 1), 'hǎokàn', 'SV', 'to be good-looking', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='好看' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 好聽 -- 1 sense(s): to be nice to listen, ple
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('好聽', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='好聽' ORDER BY id DESC LIMIT 1), 'hǎotīng', 'SV', 'to be nice to listen, pleasant-sounding', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='好聽' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 話 -- 1 sense(s): words, spoken language
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('話', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='話' ORDER BY id DESC LIMIT 1), 'huà', 'N', 'words, spoken language', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='話' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 畫畫 -- 1 sense(s): to paint, to draw
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('畫畫', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='畫畫' ORDER BY id DESC LIMIT 1), 'huàhuà(r)', 'VO', 'to paint, to draw', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='畫畫' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 回來 -- 1 sense(s): to return, to come back
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('回來', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='回來' ORDER BY id DESC LIMIT 1), 'huílái', 'V', 'to return, to come back', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='回來' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 回去 -- 1 sense(s): to leave, to go back
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('回去', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='回去' ORDER BY id DESC LIMIT 1), 'huíqù', 'V', 'to leave, to go back', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='回去' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 貨 -- 1 sense(s): goods, products, a commod
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('貨', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='貨' ORDER BY id DESC LIMIT 1), 'huò', 'N', 'goods, products, a commodity', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='貨' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 火車站 -- 1 sense(s): train station
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('火車站', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='火車站' ORDER BY id DESC LIMIT 1), 'huǒchēzhàn', 'N', 'train station', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='火車站' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 機 -- 1 sense(s): machine
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('機', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='機' ORDER BY id DESC LIMIT 1), 'jī', 'BF', 'machine', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='機' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 季 -- 1 sense(s): season
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('季', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='季' ORDER BY id DESC LIMIT 1), 'jì', 'N/M', 'season', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='季' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 覺 -- 1 sense(s): sleep
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('覺', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='覺' ORDER BY id DESC LIMIT 1), 'jiào', 'N', 'sleep', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='覺' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 看到 -- 1 sense(s): to see
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('看到', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='看到' ORDER BY id DESC LIMIT 1), 'kàndào', 'V', 'to see', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='看到' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 美國人 -- 1 sense(s): American
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('美國人', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='美國人' ORDER BY id DESC LIMIT 1), 'Měiguórén', 'N', 'American', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='美國人' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 們 -- 1 sense(s): used after pronouns 我, 你,
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('們', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='們' ORDER BY id DESC LIMIT 1), 'men', 'BF', 'used after pronouns 我, 你, 他 or certain nouns denoting a group of persons', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='們' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 男孩子 -- 1 sense(s): boy
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('男孩子', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='男孩子' ORDER BY id DESC LIMIT 1), 'nánháizi', 'N', 'boy', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='男孩子' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 男朋友 -- 1 sense(s): boyfriend
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('男朋友', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='男朋友' ORDER BY id DESC LIMIT 1), 'nánpéngyǒu', 'N', 'boyfriend', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='男朋友' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 那邊 -- 1 sense(s): there, over there
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('那邊', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='那邊' ORDER BY id DESC LIMIT 1), 'nèibiān', 'N (PW)', 'there, over there', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='那邊' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 女孩子 -- 1 sense(s): girl
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('女孩子', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='女孩子' ORDER BY id DESC LIMIT 1), 'nǚháizi', 'N', 'girl', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='女孩子' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 女朋友 -- 1 sense(s): girlfriend
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('女朋友', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='女朋友' ORDER BY id DESC LIMIT 1), 'nǚpéngyǒu', 'N', 'girlfriend', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='女朋友' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 日文 -- 1 sense(s): the Japanese language
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('日文', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='日文' ORDER BY id DESC LIMIT 1), 'Rìwén', 'N', 'the Japanese language', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='日文' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 什麼時候 -- 1 sense(s): when, what time
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('什麼時候', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='什麼時候' ORDER BY id DESC LIMIT 1), 'shénmeshíhòu', 'ADV (QW)', 'when, what time', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='什麼時候' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 睡 -- 1 sense(s): to sleep
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('睡', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='睡' ORDER BY id DESC LIMIT 1), 'shuì', 'V', 'to sleep', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='睡' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 停車 -- 1 sense(s): to park a car
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('停車', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='停車' ORDER BY id DESC LIMIT 1), 'tíngchē', 'VO', 'to park a car', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='停車' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 晚飯 -- 1 sense(s): dinner, supper
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('晚飯', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='晚飯' ORDER BY id DESC LIMIT 1), 'wǎnfàn', 'N', 'dinner, supper', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='晚飯' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 午 -- 1 sense(s): noon, midday
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('午', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='午' ORDER BY id DESC LIMIT 1), 'wǔ', 'BF', 'noon, midday', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='午' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 午飯  -- 1 sense(s): lunch
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('午飯 ', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='午飯 ' ORDER BY id DESC LIMIT 1), 'wǔfàn,zhōngfàn', 'N', 'lunch', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='午飯 ' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 夏季 -- 1 sense(s): summer
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('夏季', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='夏季' ORDER BY id DESC LIMIT 1), 'xiàjì', 'ADV/N (TW)', 'summer', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='夏季' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 寫字 -- 1 sense(s): to write characters
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('寫字', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='寫字' ORDER BY id DESC LIMIT 1), 'xiězì', 'VO', 'to write characters', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='寫字' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 英國 -- 1 sense(s): England, Britain
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('英國', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='英國' ORDER BY id DESC LIMIT 1), 'Yīngguó', 'N', 'England, Britain', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='英國' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 早飯 -- 1 sense(s): breakfast
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('早飯', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='早飯' ORDER BY id DESC LIMIT 1), 'zǎofàn', 'N', 'breakfast', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='早飯' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 這邊 -- 1 sense(s): here, over here
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('這邊', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='這邊' ORDER BY id DESC LIMIT 1), 'zhèibiān', 'N (PW)', 'here, over here', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='這邊' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 中秋節 -- 1 sense(s): Mid-Autumn Festival
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('中秋節', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='中秋節' ORDER BY id DESC LIMIT 1), 'Zhōngqiūjié', 'N', 'Mid-Autumn Festival', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='中秋節' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 子 -- 1 sense(s): a noun suffix
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('子', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='子' ORDER BY id DESC LIMIT 1), 'zi', 'P', 'a noun suffix', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='子' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';

-- 做飯 -- 1 sense(s): to cook
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('做飯', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES ((SELECT id FROM cards WHERE hz='做飯' ORDER BY id DESC LIMIT 1), 'zuòfàn', 'VO', 'to cook', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT (SELECT id FROM cards WHERE hz='做飯' ORDER BY id DESC LIMIT 1), id FROM tags WHERE name='pavc1';
