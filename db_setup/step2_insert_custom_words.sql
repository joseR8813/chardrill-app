-- Insert 46 new custom (non-TOCFL) words from the PAVC1 word list
-- Each word = 1 new card + 1 new sense + 1 tag link

INSERT OR IGNORE INTO tags (name) VALUES ('pavc1');

-- 不一定 (bùyídìng) -- uncertain, not for sure, not necessarily
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('不一定', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'bùyídìng', 'ADV', 'uncertain, not for sure, not necessarily', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 德國 (Déguó) -- Germany, German
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('德國', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'Déguó', 'N', 'Germany, German', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 德文 (Déwén) -- the German language
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('德文', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'Déwén', 'N', 'the German language', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 點鐘 (diǎn zhōng) -- o'clock
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('點鐘', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'diǎn zhōng', 'M', 'o''clock', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 兒 (ér) -- son
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('兒', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'ér', 'BF', 'son', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 法 (Fǎ) -- transliteration of the F in France
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('法', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'Fǎ', 'BF', 'transliteration of the F in France', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 法國 (Fǎguó) -- France, French
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('法國', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'Fǎguó', 'N', 'France, French', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 飯廳 (fàntīng) -- dining room
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('飯廳', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'fàntīng', 'N', 'dining room', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 法文 (Fǎwén) -- the French language
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('法文', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'Fǎwén', 'N', 'the French language', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 公車站 (gōngchēzhàn) -- bus stand, bus stop
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('公車站', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'gōngchēzhàn', 'N', 'bus stand, bus stop', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 好幾 (hǎojǐ) -- quite a few
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('好幾', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'hǎojǐ', 'ADV-NU', 'quite a few', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 好看 (hǎokàn) -- to be good-looking
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('好看', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'hǎokàn', 'SV', 'to be good-looking', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 好聽 (hǎotīng) -- to be nice to listen, pleasant-sounding
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('好聽', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'hǎotīng', 'SV', 'to be nice to listen, pleasant-sounding', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 話 (huà) -- words, spoken language
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('話', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'huà', 'N', 'words, spoken language', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 畫畫 (huàhuà(r)) -- to paint, to draw
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('畫畫', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'huàhuà(r)', 'VO', 'to paint, to draw', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 回來 (huílái) -- to return, to come back
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('回來', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'huílái', 'V', 'to return, to come back', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 回去 (huíqù) -- to leave, to go back
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('回去', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'huíqù', 'V', 'to leave, to go back', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 貨 (huò) -- goods, products, a commodity
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('貨', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'huò', 'N', 'goods, products, a commodity', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 火車站 (huǒchēzhàn) -- train station
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('火車站', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'huǒchēzhàn', 'N', 'train station', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 機 (jī) -- machine
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('機', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'jī', 'BF', 'machine', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 季 (jì) -- season
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('季', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'jì', 'N/M', 'season', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 覺 (jiào) -- sleep
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('覺', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'jiào', 'N', 'sleep', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 看到 (kàndào) -- to see
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('看到', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'kàndào', 'V', 'to see', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 美國人 (Měiguórén) -- American
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('美國人', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'Měiguórén', 'N', 'American', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 們 (men) -- used after pronouns 我, 你, 他 or certain n
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('們', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'men', 'BF', 'used after pronouns 我, 你, 他 or certain nouns denoting a group of persons', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 男孩子 (nánháizi) -- boy
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('男孩子', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'nánháizi', 'N', 'boy', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 男朋友 (nánpéngyǒu) -- boyfriend
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('男朋友', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'nánpéngyǒu', 'N', 'boyfriend', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 那邊 (nèibiān) -- there, over there
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('那邊', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'nèibiān', 'N (PW)', 'there, over there', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 女孩子 (nǚháizi) -- girl
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('女孩子', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'nǚháizi', 'N', 'girl', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 女朋友 (nǚpéngyǒu) -- girlfriend
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('女朋友', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'nǚpéngyǒu', 'N', 'girlfriend', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 兒 (-r) -- a suffix
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('兒', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), '-r', 'P', 'a suffix', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 日文 (Rìwén) -- the Japanese language
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('日文', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'Rìwén', 'N', 'the Japanese language', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 什麼時候 (shénmeshíhòu) -- when, what time
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('什麼時候', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'shénmeshíhòu', 'ADV (QW)', 'when, what time', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 睡 (shuì) -- to sleep
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('睡', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'shuì', 'V', 'to sleep', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 停車 (tíngchē) -- to park a car
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('停車', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'tíngchē', 'VO', 'to park a car', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 晚飯 (wǎnfàn) -- dinner, supper
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('晚飯', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'wǎnfàn', 'N', 'dinner, supper', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 午 (wǔ) -- noon, midday
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('午', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'wǔ', 'BF', 'noon, midday', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 午飯  (wǔfàn,zhōngfàn) -- lunch
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('午飯 ', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'wǔfàn,zhōngfàn', 'N', 'lunch', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 夏季 (xiàjì) -- summer
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('夏季', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'xiàjì', 'ADV/N (TW)', 'summer', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 寫字 (xiězì) -- to write characters
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('寫字', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'xiězì', 'VO', 'to write characters', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 英國 (Yīngguó) -- England, Britain
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('英國', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'Yīngguó', 'N', 'England, Britain', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 早飯 (zǎofàn) -- breakfast
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('早飯', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'zǎofàn', 'N', 'breakfast', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 這邊 (zhèibiān) -- here, over here
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('這邊', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'zhèibiān', 'N (PW)', 'here, over here', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 中秋節 (Zhōngqiūjié) -- Mid-Autumn Festival
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('中秋節', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'Zhōngqiūjié', 'N', 'Mid-Autumn Festival', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 子 (zi) -- a noun suffix
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('子', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'zi', 'P', 'a noun suffix', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';

-- 做飯 (zuòfàn) -- to cook
INSERT INTO cards (hz, level, pile, streak, source, book_source) VALUES ('做飯', NULL, 'new', 0, 'custom', 'Practical Audio-Visual Chinese, 3rd Edition, Vol. 1');
INSERT INTO senses (card_id, py, pos, meaning, "order") VALUES (last_insert_rowid(), 'zuòfàn', 'VO', 'to cook', 0);
INSERT OR IGNORE INTO card_tags (card_id, tag_id) SELECT last_insert_rowid(), id FROM tags WHERE name='pavc1';
