const LESSONS = {
  1: {
    title: "第一課　您貴姓？",
    dialogues: [
      {
        heading: "對話一",
        audio: "/static/audio/reading/ch1_p1.wav",
        lines: [
          { hz: "A：先生，您貴姓？", zy: "ㄒㄧㄢ ㄕㄥ，ㄋㄧㄣˊ ㄍㄨㄟˋ ㄒㄧㄥˋ？", py: "Xiānsheng, nín guìxìng?" },
          { hz: "B：我姓王。您貴姓？", zy: "ㄨㄛˇ ㄒㄧㄥˋ ㄨㄤˊ。ㄋㄧㄣˊ ㄍㄨㄟˋ ㄒㄧㄥˋ？", py: "Wǒ xìng Wáng. Nín guìxìng?" },
          { hz: "A：我姓李，叫大衛。", zy: "ㄨㄛˇ ㄒㄧㄥˋ ㄌㄧˇ，ㄐㄧㄠˋ ㄉㄚˋ ㄨㄟˋ。", py: "Wǒ xìng Lǐ, jiào Dàwèi." },
          { hz: "B：李先生，您好。", zy: "ㄌㄧˇ ㄒㄧㄢ ㄕㄥ，ㄋㄧㄣˊ ㄏㄠˇ。", py: "Lǐ Xiānsheng, nín hǎo." },
          { hz: "A：您好。您是美國人嗎？", zy: "ㄋㄧㄣˊ ㄏㄠˇ。ㄋㄧㄣˊ ㄕˋ ㄇㄟˇ ㄍㄨㄛˊ ㄖㄣˊ ㄇㄚ˙？", py: "Nín hǎo. Nín shì Měiguó rén ma?" },
          { hz: "B：不是，我是英國人。", zy: "ㄅㄨˊ ㄕˋ，ㄨㄛˇ ㄕˋ ㄧㄥ ㄍㄨㄛˊ ㄖㄣˊ。", py: "Búshì, wǒ shì Yīngguó rén." },
        ]
      },
      {
        heading: "對話二",
        audio: "/static/audio/reading/ch1_p2.wav",
        lines: [
          { hz: "A：你好。", zy: "ㄋㄧˇ ㄏㄠˇ。", py: "Nǐ hǎo." },
          { hz: "B：你好。", zy: "ㄋㄧˇ ㄏㄠˇ。", py: "Nǐ hǎo." },
          { hz: "A：我叫李愛美。你叫什麼名字？", zy: "ㄨㄛˇ ㄐㄧㄠˋ ㄌㄧˇ ㄞˋ ㄇㄟˇ。ㄋㄧˇ ㄐㄧㄠˋ ㄕㄣˊ ㄇㄜ˙ ㄇㄧㄥˊ ㄗˋ？", py: "Wǒ jiào Lǐ Àiměi. Nǐ jiào shénme míngzi?" },
          { hz: "B：我叫王珍妮。", zy: "ㄨㄛˇ ㄐㄧㄠˋ ㄨㄤˊ ㄓㄣ ㄋㄧ。", py: "Wǒ jiào Wáng Zhēnnī." },
          { hz: "A：珍妮，你是哪國人？", zy: "ㄓㄣ ㄋㄧ，ㄋㄧˇ ㄕˋ ㄋㄚˇ ㄍㄨㄛˊ ㄖㄣˊ？", py: "Zhēnnī, nǐ shì nǎguó rén?" },
          { hz: "B：我是美國人，你呢？", zy: "ㄨㄛˇ ㄕˋ ㄇㄟˇ ㄍㄨㄛˊ ㄖㄣˊ，ㄋㄧˇ ㄋㄜ˙？", py: "Wǒ shì Měiguó rén, nǐ ne?" },
          { hz: "A：我是台灣人。", zy: "ㄨㄛˇ ㄕˋ ㄊㄞˊ ㄨㄢ ㄖㄣˊ。", py: "Wǒ shì Táiwān rén." },
        ]
      }
    ]
  },
  2: {
    title: "第二課　早，您好",
    dialogues: [
      {
        heading: "對話一",
        audio: "/static/audio/reading/ch2_p1.wav",
        lines: [
          { hz: "趙小姐：張先生，您早。", zy: "ㄓㄠˋ ㄒㄧㄠˇ ㄐㄧㄝˇ：ㄓㄤ ㄒㄧㄢ ㄕㄥ，ㄋㄧㄣˊ ㄗㄠˇ。", py: "Zhào Xiǎojiě: Zhāng Xiānsheng, nín zǎo." },
          { hz: "張先生：早，趙小姐，好久不見，妳好啊！", zy: "ㄓㄤ ㄒㄧㄢ ㄕㄥ：ㄗㄠˇ，ㄓㄠˋ ㄒㄧㄠˇ ㄐㄧㄝˇ，ㄏㄠˇ ㄐㄧㄡˇ ㄅㄨˊ ㄐㄧㄢˋ，ㄋㄧˇ ㄏㄠˇ ㄚ！", py: "Zhāng Xiānsheng: Zǎo, Zhào Xiǎojiě, hǎo jiǔ bújiàn, nǐ hǎo a!" },
          { hz: "趙小姐：很好，謝謝。您好嗎？", zy: "ㄓㄠˋ ㄒㄧㄠˇ ㄐㄧㄝˇ：ㄏㄣˇ ㄏㄠˇ，ㄒㄧㄝˋ ㄒㄧㄝˋ。ㄋㄧㄣˊ ㄏㄠˇ ㄇㄚ˙？", py: "Zhào Xiǎojiě: Hěn hǎo, xièxie. Nín hǎo ma?" },
          { hz: "張先生：我也很好。這是我太太。淑芳，這是趙小姐。", zy: "ㄓㄤ ㄒㄧㄢ ㄕㄥ：ㄨㄛˇ ㄧㄝˇ ㄏㄣˇ ㄏㄠˇ。ㄓㄜˋ ㄕˋ ㄨㄛˇ ㄊㄞˋ ㄊㄞˋ。ㄕㄨˊ ㄈㄤ，ㄓㄜˋ ㄕˋ ㄓㄠˋ ㄒㄧㄠˇ ㄐㄧㄝˇ。", py: "Zhāng Xiānsheng: Wǒ yě hěn hǎo. Zhè shì wǒ tàitai. Shūfāng, zhè shì Zhào Xiǎojiě." },
          { hz: "趙小姐：張太太，您好。", zy: "ㄓㄠˋ ㄒㄧㄠˇ ㄐㄧㄝˇ：ㄓㄤ ㄊㄞˋ ㄊㄞˋ，ㄋㄧㄣˊ ㄏㄠˇ。", py: "Zhào Xiǎojiě: Zhāng Tàitai, nín hǎo." },
          { hz: "張太太：您好，趙小姐。", zy: "ㄓㄤ ㄊㄞˋ ㄊㄞˋ：ㄋㄧㄣˊ ㄏㄠˇ，ㄓㄠˋ ㄒㄧㄠˇ ㄐㄧㄝˇ。", py: "Zhāng Tàitai: Nín hǎo, Zhào Xiǎojiě." },
        ]
      },
      {
        heading: "對話二",
        audio: "/static/audio/reading/ch2_p2.wav",
        lines: [
          { hz: "李愛美：珍妮，大衛，你們好。", zy: "ㄌㄧˇ ㄞˋ ㄇㄟˇ：ㄓㄣ ㄋㄧˊ，ㄉㄚˋ ㄨㄟˋ，ㄋㄧˇ ㄇㄣ˙ ㄏㄠˇ。", py: "Lǐ Àiměi: Zhēnní, Dàwèi, nǐmen hǎo." },
          { hz: "王珍妮：妳好，愛美。", zy: "ㄨㄤˊ ㄓㄣ ㄋㄧˊ：ㄋㄧˇ ㄏㄠˇ，ㄞˋ ㄇㄟˇ。", py: "Wáng Zhēnní: Nǐ hǎo, Àiměi." },
          { hz: "李愛美：天氣好熱啊！", zy: "ㄌㄧˇ ㄞˋ ㄇㄟˇ：ㄊㄧㄢ ㄑㄧˋ ㄏㄠˇ ㄖㄜˋ ㄚ！", py: "Lǐ Àiměi: Tiānqì hǎo rè a!" },
          { hz: "張大衛：是啊！", zy: "ㄓㄤ ㄉㄚˋ ㄨㄟˋ：ㄕˋ ㄚ！", py: "Zhāng Dàwèi: Shì a!" },
          { hz: "李愛美：你們很忙嗎？", zy: "ㄌㄧˇ ㄞˋ ㄇㄟˇ：ㄋㄧˇ ㄇㄣ˙ ㄏㄣˇ ㄇㄤˊ ㄇㄚ˙？", py: "Lǐ Àiměi: Nǐmen hěn máng ma?" },
          { hz: "王珍妮：很忙。妳呢？忙不忙？", zy: "ㄨㄤˊ ㄓㄣ ㄋㄧˊ：ㄏㄣˇ ㄇㄤˊ。ㄋㄧˇ ㄋㄜ˙？ㄇㄤˊ ㄅㄨˋ ㄇㄤˊ？", py: "Wáng Zhēnní: Hěn máng. Nǐ ne? Máng bù máng?" },
          { hz: "李愛美：我不太忙。你們去上課嗎？", zy: "ㄌㄧˇ ㄞˋ ㄇㄟˇ：ㄨㄛˇ ㄅㄨˊ ㄊㄞˋ ㄇㄤˊ。ㄋㄧˇ ㄇㄣ˙ ㄑㄩˋ ㄕㄤˋ ㄎㄜˋ ㄇㄚ˙？", py: "Lǐ Àiměi: Wǒ bú tài máng. Nǐmen qù shàngkè ma?" },
          { hz: "王珍妮、張大衛：是啊，再見。", zy: "ㄨㄤˊ ㄓㄣ ㄋㄧˊ、ㄓㄤ ㄉㄚˋ ㄨㄟˋ：ㄕˋ ㄚ，ㄗㄞˋ ㄐㄧㄢˋ。", py: "Wáng Zhēnní, Zhāng Dàwèi: Shì a, zàijiàn." },
          { hz: "李愛美：再見。", zy: "ㄌㄧˇ ㄞˋ ㄇㄟˇ：ㄗㄞˋ ㄐㄧㄢˋ。", py: "Lǐ Àiměi: Zàijiàn." },
        ]
      }
    ]
  },
  3: {
    title: "第三課　我喜歡看電影",
    dialogues: [
      {
        heading: "對話一",
        audio: "/static/audio/reading/ch3_p1.wav",
        lines: [
          { hz: "A：你喜歡看電影嗎？", zy: "ㄋㄧˇ ㄒㄧˇ ㄏㄨㄢ ㄎㄢˋ ㄉㄧㄢˋ ㄧㄥˇ ㄇㄚ˙？", py: "Nǐ xǐhuān kàn diànyǐng ma?" },
          { hz: "B：很喜歡，你呢？", zy: "ㄏㄣˇ ㄒㄧˇ ㄏㄨㄢ，ㄋㄧˇ ㄋㄜ˙？", py: "Hěn xǐhuān, nǐ ne?" },
          { hz: "A：電影、電視，我都喜歡看。", zy: "ㄉㄧㄢˋ ㄧㄥˇ、ㄉㄧㄢˋ ㄕˋ，ㄨㄛˇ ㄉㄡ ㄒㄧˇ ㄏㄨㄢ ㄎㄢˋ。", py: "Diànyǐng, diànshì, wǒ dōu xǐhuān kàn." },
          { hz: "B：你喜歡看什麼電影？", zy: "ㄋㄧˇ ㄒㄧˇ ㄏㄨㄢ ㄎㄢˋ ㄕㄣˊ ㄇㄜ˙ ㄉㄧㄢˋ ㄧㄥˇ？", py: "Nǐ xǐhuān kàn shénme diànyǐng?" },
          { hz: "A：我喜歡看美國電影，你呢？", zy: "ㄨㄛˇ ㄒㄧˇ ㄏㄨㄢ ㄎㄢˋ ㄇㄟˇ ㄍㄨㄛˊ ㄉㄧㄢˋ ㄧㄥˇ，ㄋㄧˇ ㄋㄜ˙？", py: "Wǒ xǐhuān kàn Měiguó diànyǐng, nǐ ne?" },
          { hz: "B：美國電影、中國電影，我都喜歡。", zy: "ㄇㄟˇ ㄍㄨㄛˊ ㄉㄧㄢˋ ㄧㄥˇ、ㄓㄨㄥ ㄍㄨㄛˊ ㄉㄧㄢˋ ㄧㄥˇ，ㄨㄛˇ ㄉㄡ ㄒㄧˇ ㄏㄨㄢ。", py: "Měiguó diànyǐng, Zhōngguó diànyǐng, wǒ dōu xǐhuān." },
          { hz: "A：你也喜歡看電視嗎？", zy: "ㄋㄧˇ ㄧㄝˇ ㄒㄧˇ ㄏㄨㄢ ㄎㄢˋ ㄉㄧㄢˋ ㄕˋ ㄇㄚ˙？", py: "Nǐ yě xǐhuān kàn diànshì ma?" },
          { hz: "B：電視，我不太喜歡看。", zy: "ㄉㄧㄢˋ ㄕˋ，ㄨㄛˇ ㄅㄨˊ ㄊㄞˋ ㄒㄧˇ ㄏㄨㄢ ㄎㄢˋ。", py: "Diànshì, wǒ bútài xǐhuān kàn." }
        ]
      },
      {
        heading: "對話二",
        audio: "/static/audio/reading/ch3_p2.wav",
        lines: [
          { hz: "A：你有汽車沒有？", zy: "ㄋㄧˇ ㄧㄡˇ ㄑㄧˋ ㄔㄜ ㄇㄟˊ ㄧㄡˇ？", py: "Nǐ yǒu qìchē méiyǒu?" },
          { hz: "B：沒有。", zy: "ㄇㄟˊ ㄧㄡˇ。", py: "Méiyǒu." },
          { hz: "A：你要不要買汽車？", zy: "ㄋㄧˇ ㄧㄠˋ ㄅㄨˊ ㄧㄠˋ ㄇㄞˇ ㄑㄧˋ ㄔㄜ？", py: "Nǐ yàobúyào mǎi qìchē?" },
          { hz: "B：我要買。", zy: "ㄨㄛˇ ㄧㄠˋ ㄇㄞˇ。", py: "Wǒ yào mǎi." },
          { hz: "A：你喜歡哪國車？", zy: "ㄋㄧˇ ㄒㄧˇ ㄏㄨㄢ ㄋㄚˇ ㄍㄨㄛˊ ㄔㄜ？", py: "Nǐ xǐhuān nǎguó chē?" },
          { hz: "B：我喜歡美國車。", zy: "ㄨㄛˇ ㄒㄧˇ ㄏㄨㄢ ㄇㄟˇ ㄍㄨㄛˊ ㄔㄜ。", py: "Wǒ xǐhuān Měiguó chē." },
          { hz: "A：英國車很好看，你不喜歡嗎？", zy: "ㄧㄥ ㄍㄨㄛˊ ㄔㄜ ㄏㄣˇ ㄏㄠˇ ㄎㄢˋ，ㄋㄧˇ ㄅㄨˋ ㄒㄧˇ ㄏㄨㄢ ㄇㄚ˙？", py: "Yīngguó chē hěn hǎokàn, nǐ bù xǐhuān ma?" },
          { hz: "B：我也喜歡，可是英國車太貴。", zy: "ㄨㄛˇ ㄧㄝˇ ㄒㄧˇ ㄏㄨㄢ，ㄎㄜˇ ㄕˋ ㄧㄥ ㄍㄨㄛˊ ㄔㄜ ㄊㄞˋ ㄍㄨㄟˋ。", py: "Wǒ yě xǐhuān, kěshì Yīngguó chē tàiguì." }
        ]
      }
    ]
  },
  4: {
    title: "第四課　這枝筆多少錢？",
    dialogues: [
      {
        heading: "對話一",
        audio: "/static/audio/reading/ch4_p1.wav",
        lines: [
          { hz: "A：先生，您要買什麼？", zy: "ㄒㄧㄢ ㄕㄥ，ㄋㄧㄣˊ ㄧㄠˋ ㄇㄞˇ ㄕㄣˊ ㄇㄜ˙？", py: "Xiānshēng, nín yào mǎi shénme?" },
          { hz: "B：我要買筆。", zy: "ㄨㄛˇ ㄧㄠˋ ㄇㄞˇ ㄅㄧˇ。", py: "Wǒ yào mǎi bǐ." },
          { hz: "A：我們有很多種筆，您喜歡哪種？", zy: "ㄨㄛˇ ㄇㄣ˙ ㄧㄡˇ ㄏㄣˇ ㄉㄨㄛ ㄓㄨㄥˇ ㄅㄧˇ，ㄋㄧㄣˊ ㄒㄧˇ ㄏㄨㄢ ㄋㄚˇ ㄓㄨㄥˇ？", py: "Wǒmen yǒu hěn duō zhǒng bǐ, nín xǐhuān nǎzhǒng?" },
          { hz: "B：這種筆很好看，多少錢一枝？", zy: "ㄓㄜˋ ㄓㄨㄥˇ ㄅㄧˇ ㄏㄣˇ ㄏㄠˇ ㄎㄢˋ，ㄉㄨㄛ ㄕㄠˇ ㄑㄧㄢˊ ㄧˋ ㄓ？", py: "Zhèzhǒng bǐ hěn hǎokàn, duōshǎo qián yìzhī?" },
          { hz: "A：七塊錢一枝，您要幾枝？", zy: "ㄑㄧ ㄎㄨㄞˋ ㄑㄧㄢˊ ㄧˋ ㄓ，ㄋㄧㄣˊ ㄧㄠˋ ㄐㄧˇ ㄓ？", py: "Qīkuàiqián yìzhī, nín yào jǐzhī?" },
          { hz: "B：我要兩枝，兩枝多少錢？", zy: "ㄨㄛˇ ㄧㄠˋ ㄌㄧㄤˇ ㄓ，ㄌㄧㄤˇ ㄓ ㄉㄨㄛ ㄕㄠˇ ㄑㄧㄢˊ？", py: "Wǒ yào liǎngzhī, liǎngzhī duōshǎo qián?" },
          { hz: "A：兩枝十四塊。", zy: "ㄌㄧㄤˇ ㄓ ㄕˊ ㄙˋ ㄎㄨㄞˋ。", py: "Liǎngzhī shísìkuài." },
          { hz: "B：我沒有四塊零錢，我給你二十塊，請你找錢好嗎？", zy: "ㄨㄛˇ ㄇㄟˊ ㄧㄡˇ ㄙˋ ㄎㄨㄞˋ ㄌㄧㄥˊ ㄑㄧㄢˊ，ㄨㄛˇ ㄍㄟˇ ㄋㄧˇ ㄦˋ ㄕˊ ㄎㄨㄞˋ，ㄑㄧㄥˇ ㄋㄧˇ ㄓㄠˇ ㄑㄧㄢˊ ㄏㄠˇ ㄇㄚ˙？", py: "Wǒ méiyǒu sìkuài língqián, wǒ gěi nǐ èrshíkuài, qǐng nǐ zhǎoqián hǎo ma?" },
          { hz: "A：好，找您六塊，謝謝。", zy: "ㄏㄠˇ，ㄓㄠˇ ㄋㄧㄣˊ ㄌㄧㄡˋ ㄎㄨㄞˋ，ㄒㄧㄝˋ ㄒㄧㄝ˙。", py: "Hǎo, zhǎo nín liùkuài, xièxie." }
        ]
      },
      {
        heading: "對話二",
        audio: "/static/audio/reading/ch4_p2.wav",
        lines: [
          { hz: "A：小姐，您要買什麼？", zy: "ㄒㄧㄠˇ ㄐㄧㄝˇ，ㄋㄧㄣˊ ㄧㄠˋ ㄇㄞˇ ㄕㄣˊ ㄇㄜ˙？", py: "Xiǎojiě, nín yào mǎi shénme?" },
          { hz: "B：我要一個漢堡和一杯可樂，一共多少錢？", zy: "ㄨㄛˇ ㄧㄠˋ ㄧˊ ㄍㄜˋ ㄏㄢˋ ㄅㄠˇ ㄏㄢˋ ㄧˋ ㄅㄟ ㄎㄜˇ ㄌㄜˋ，ㄧˊ ㄍㄨㄥˋ ㄉㄨㄛ ㄕㄠˇ ㄑㄧㄢˊ？", py: "Wǒ yào yíge hànbǎo hàn yìbēi kělè, yígòng duōshǎo qián?" },
          { hz: "A：漢堡一個三十八塊，可樂一杯十九塊，一共五十七塊錢。", zy: "ㄏㄢˋ ㄅㄠˇ ㄧˊ ㄍㄜˋ ㄙㄢ ㄕˊ ㄅㄚ ㄎㄨㄞˋ，ㄎㄜˇ ㄌㄜˋ ㄧˋ ㄅㄟ ㄕˊ ㄐㄧㄡˇ ㄎㄨㄞˋ，ㄧˊ ㄍㄨㄥˋ ㄨˇ ㄕˊ ㄑㄧ ㄎㄨㄞˋ ㄑㄧㄢˊ。", py: "Hànbǎo yíge sānshíbākuài, kělè yìbēi shíjiǔkuài, yígòng wǔshíqīkuài qián." },
          { hz: "B：這是六十塊錢。", zy: "ㄓㄜˋ ㄕˋ ㄌㄧㄡˋ ㄕˊ ㄎㄨㄞˋ ㄑㄧㄢˊ。", py: "Zhè shì liùshíkuài qián." },
          { hz: "A：謝謝，找您三塊。", zy: "ㄒㄧㄝˋ ㄒㄧㄝ˙，ㄓㄠˇ ㄋㄧㄣˊ ㄙㄢ ㄎㄨㄞˋ。", py: "Xièxie, zhǎo nín sānkuài." }
        ]
      }
    ]
  },
  5: {
    title: "第五課　我家有五個人",
    dialogues: [
      {
        heading: "對話一",
        audio: "/static/audio/reading/ch5_p1.wav",
        lines: [
          { hz: "A：這是你爸爸媽媽的相片嗎？", zy: "ㄓㄜˋ ㄕˋ ㄋㄧˇ ㄅㄚˋ ㄅㄚ˙ ㄇㄚ ㄇㄚ˙ ˙ㄉㄜ ㄒㄧㄤˋ ㄆㄧㄢˋ ㄇㄚ˙？", py: "Zhè shì nǐ bàba māma de xiàngpiàn ma?" },
          { hz: "B：是啊。", zy: "ㄕˋ ㄚ˙。", py: "Shì a." },
          { hz: "A：你爸爸是老師嗎？", zy: "ㄋㄧˇ ㄅㄚˋ ㄅㄚ˙ ㄕˋ ㄌㄠˇ ㄕ ㄇㄚ˙？", py: "Nǐ bàba shì lǎoshī ma?" },
          { hz: "B：對，他是英文老師。", zy: "ㄉㄨㄟˋ，ㄊㄚ ㄕˋ ㄧㄥ ㄨㄣˊ ㄌㄠˇ ㄕ。", py: "Duì, tā shì Yīngwén lǎoshī." },
          { hz: "A：這張呢？這是你哥哥還是你弟弟？", zy: "ㄓㄜˋ ㄓㄤ ㄋㄜ˙？ㄓㄜˋ ㄕˋ ㄋㄧˇ ㄍㄜ ㄍㄜ˙ ㄏㄞˊ ㄕˋ ㄋㄧˇ ㄉㄧˋ ㄉㄧ˙？", py: "Zhè zhāng ne? Zhè shì nǐ gēge háishì nǐ dìdi?" },
          { hz: "B：是我哥哥，我沒有弟弟。", zy: "ㄕˋ ㄨㄛˇ ㄍㄜ ㄍㄜ˙，ㄨㄛˇ ㄇㄟˊ ㄧㄡˇ ㄉㄧˋ ㄉㄧ˙。", py: "Shì wǒ gēge, wǒ méiyǒu dìdi." },
          { hz: "A：這兩個女孩子都是你姊姊嗎？", zy: "ㄓㄜˋ ㄌㄧㄤˇ ㄍㄜˋ ㄋㄩˇ ㄏㄞˊ ˙ㄗ ㄉㄡ ㄕˋ ㄋㄧˇ ㄐㄧㄝˇ ㄐㄧㄝ˙ ㄇㄚ˙？", py: "Zhè liǎng ge nǚháizi dōu shì nǐ jiějie ma?" },
          { hz: "B：不，這個是我姊姊，那個是我姊姊的朋友。", zy: "ㄅㄨˋ，ㄓㄜˋ ㄍㄜˋ ㄕˋ ㄨㄛˇ ㄐㄧㄝˇ ㄐㄧㄝ˙，ㄋㄚˋ ㄍㄜˋ ㄕˋ ㄨㄛˇ ㄐㄧㄝˇ ㄐㄧㄝ˙ ˙ㄉㄜ ㄆㄥˊ ㄧㄡˇ。", py: "Bù, zhèige shì wǒ jiějie, nèige shì wǒ jiějie de péngyǒu." },
          { hz: "A：你家有幾個人？", zy: "ㄋㄧˇ ㄐㄧㄚ ㄧㄡˇ ㄐㄧˇ ㄍㄜˋ ㄖㄣˊ？", py: "Nǐ jiā yǒu jǐge rén?" },
          { hz: "B：我家有五個人。", zy: "ㄨㄛˇ ㄐㄧㄚ ㄧㄡˇ ㄨˇ ㄍㄜˋ ㄖㄣˊ。", py: "Wǒ jiā yǒu wǔge rén." },
          { hz: "A：你們家的書不少，這些書都是你爸爸的嗎？", zy: "ㄋㄧˇ ㄇㄣ˙ ㄐㄧㄚ ˙ㄉㄜ ㄕㄨ ㄅㄨˋ ㄕㄠˇ，ㄓㄜˋ ㄒㄧㄝ ㄕㄨ ㄉㄡ ㄕˋ ㄋㄧˇ ㄅㄚˋ ㄅㄚ˙ ˙ㄉㄜ ㄇㄚ˙？", py: "Nǐmen jiā de shū bùshǎo, zhèixiē shū dōu shì nǐ bàba de ma?" },
          { hz: "B：有些是我爸爸的，有些不是。", zy: "ㄧㄡˇ ㄒㄧㄝ ㄕˋ ㄨㄛˇ ㄅㄚˋ ㄅㄚ˙ ˙ㄉㄜ，ㄧㄡˇ ㄒㄧㄝ ㄅㄨˊ ㄕˋ。", py: "Yǒude shì wǒ bàba de, yǒude bùshì." }
        ]
      },
      {
        heading: "對話二",
        audio: "/static/audio/reading/ch5_p2.wav",
        lines: [
          { hz: "王大文：爸爸，這是我朋友。", zy: "ㄨㄤˊ ㄉㄚˋ ㄨㄣˊ：ㄅㄚˋ ㄅㄚ˙，ㄓㄜˋ ㄕˋ ㄨㄛˇ ㄆㄥˊ ㄧㄡˇ。", py: "Wáng Dàwén: Bàba, zhè shì wǒ péngyǒu." },
          { hz: "李東尼：王伯伯好。", zy: "ㄌㄧˇ ㄉㄨㄥ ㄋㄧˊ：ㄨㄤˊ ㄅㄛˊ ㄅㄛ˙ ㄏㄠˇ。", py: "Lǐ Dōngní: Wáng bóbo hǎo." },
          { hz: "王先生：好，大文，你這位朋友叫什麼名字？", zy: "ㄨㄤˊ ㄒㄧㄢ ㄕㄥ：ㄏㄠˇ，ㄉㄚˋ ㄨㄣˊ，ㄋㄧˇ ㄓㄜˋ ㄨㄟˋ ㄆㄥˊ ㄧㄡˇ ㄐㄧㄠˋ ㄕㄣˊ ㄇㄜ˙ ㄇㄧㄥˊ ㄗˋ？", py: "Wáng Xiānshēng: Hǎo, Dàwén, nǐ zhèiwèi péngyǒu jiào shénme míngzi?" },
          { hz: "王大文：他的中文名字叫李東尼，他的中文很好。", zy: "ㄨㄤˊ ㄉㄚˋ ㄨㄣˊ：ㄊㄚ ˙ㄉㄜ ㄓㄨㄥ ㄨㄣˊ ㄇㄧㄥˊ ㄗˋ ㄐㄧㄠˋ ㄌㄧˇ ㄉㄨㄥ ㄋㄧˊ，ㄊㄚ ˙ㄉㄜ ㄓㄨㄥ ㄨㄣˊ ㄏㄣˇ ㄏㄠˇ。", py: "Wáng Dàwén: Tāde Zhōngwén míngzi jiào Lǐ Dōngní, tāde Zhōngwén hěn hǎo." },
          { hz: "王先生：東尼，你是哪國人？", zy: "ㄨㄤˊ ㄒㄧㄢ ㄕㄥ：ㄉㄨㄥ ㄋㄧˊ，ㄋㄧˇ ㄕˋ ㄋㄚˇ ㄍㄨㄛˊ ㄖㄣˊ？", py: "Wáng Xiānshēng: Dōngní, nǐ shì nǎguó rén?" },
          { hz: "李東尼：我是美國人，可是我媽媽是台灣人。", zy: "ㄌㄧˇ ㄉㄨㄥ ㄋㄧˊ：ㄨㄛˇ ㄕˋ ㄇㄟˇ ㄍㄨㄛˊ ㄖㄣˊ，ㄎㄜˇ ㄕˋ ㄨㄛˇ ㄇㄚ ㄇㄚ˙ ㄕˋ ㄊㄞˊ ㄨㄢ ㄖㄣˊ。", py: "Lǐ Dōngní: Wǒ shì Měiguó rén, kěshì wǒ māma shì Táiwān rén." }
        ]
      }
    ]
  },
  6: {
    title: "第六課　我想買一個新照相機",
    dialogues: [
      {
        heading: "對話一",
        audio: "/static/audio/reading/ch6_p1.wav",
        lines: [
          { hz: "A：請問，先生，您要買照相機嗎？", zy: "ㄑㄧㄥˇ ㄨㄣˋ，ㄒㄧㄢ ㄕㄥ，ㄋㄧㄣˊ ㄧㄠˋ ㄇㄞˇ ㄓㄠˋ ㄒㄧㄤˋ ㄐㄧ ㄇㄚ˙？", py: "Qǐngwèn, xiānshēng, nín yào mǎi zhàoxiàngjī ma?" },
          { hz: "B：是啊，我的照相機太舊了，我想買一個新的。", zy: "ㄕˋ ㄚ˙，ㄨㄛˇ ˙ㄉㄜ ㄓㄠˋ ㄒㄧㄤˋ ㄐㄧ ㄊㄞˋ ㄐㄧㄡˋ ㄌㄜ˙，ㄨㄛˇ ㄒㄧㄤˇ ㄇㄞˇ ㄧˊ ㄍㄜˋ ㄒㄧㄣ ˙ㄉㄜ。", py: "Shì a, wǒde zhàoxiàngjī tài jiù le, wǒ xiǎng mǎi yíge xīnde." },
          { hz: "A：您喜歡哪國貨？", zy: "ㄋㄧㄣˊ ㄒㄧˇ ㄏㄨㄢ ㄋㄚˇ ㄍㄨㄛˊ ㄏㄨㄛˋ？", py: "Nín xǐhuān nǎguó huò?" },
          { hz: "B：我都看看，好嗎？", zy: "ㄨㄛˇ ㄉㄡ ㄎㄢˋ ㄎㄢˋ，ㄏㄠˇ ㄇㄚ˙？", py: "Wǒ dōu kànkàn, hǎo ma?" },
          { hz: "A：這個是德國貨，您覺得怎麼樣？", zy: "ㄓㄜˋ ㄍㄜˋ ㄕˋ ㄉㄜˊ ㄍㄨㄛˊ ㄏㄨㄛˋ，ㄋㄧㄣˊ ㄐㄩㄝˊ ˙ㄉㄜ ㄗㄣˇ ㄇㄜ˙ ㄧㄤˋ？", py: "Zhège shì Déguó huò, nín juéde zěnmeyàng?" },
          { hz: "B：這個太大了，我喜歡那個小的。", zy: "ㄓㄜˋ ㄍㄜˋ ㄊㄞˋ ㄉㄚˋ ㄌㄜ˙，ㄨㄛˇ ㄒㄧˇ ㄏㄨㄢ ㄋㄚˋ ㄍㄜˋ ㄒㄧㄠˇ ˙ㄉㄜ。", py: "Zhège tài dà le, wǒ xǐhuān nàge xiǎode." },
          { hz: "A：這個小的很好，是日本貨。", zy: "ㄓㄜˋ ㄍㄜˋ ㄒㄧㄠˇ ˙ㄉㄜ ㄏㄣˇ ㄏㄠˇ，ㄕˋ ㄖˋ ㄅㄣˇ ㄏㄨㄛˋ。", py: "Zhège xiǎode hěn hǎo, shì Rìběn huò." },
          { hz: "B：多少錢？", zy: "ㄉㄨㄛ ㄕㄠˇ ㄑㄧㄢˊ？", py: "Duōshǎo qián?" },
          { hz: "A：五千塊。", zy: "ㄨˇ ㄑㄧㄢ ㄎㄨㄞˋ。", py: "Wǔqiān kuài." },
          { hz: "B：太貴了，你們有便宜一點的嗎？", zy: "ㄊㄞˋ ㄍㄨㄟˋ ㄌㄜ˙，ㄋㄧˇ ㄇㄣ˙ ㄧㄡˇ ㄆㄧㄢˊ ㄧˊ ˙ㄉㄜ ㄇㄚ˙？", py: "Tài guì le, nǐmen yǒu piányíde ma?" },
          { hz: "A：這個美國相機也很好，只賣一千五百塊。", zy: "ㄓㄜˋ ㄍㄜˋ ㄇㄟˇ ㄍㄨㄛˊ ㄒㄧㄤˋ ㄐㄧ ㄧㄝˇ ㄏㄣˇ ㄏㄠˇ，ㄓˇ ㄇㄞˋ ㄧˋ ㄑㄧㄢ ㄨˇ ㄅㄞˇ ㄎㄨㄞˋ。", py: "Zhège Měiguó xiàngjī yě hěn hǎo, zhǐ mài yīqiān wǔbǎi kuài." },
          { hz: "B：好，我買這個。", zy: "ㄏㄠˇ，ㄨㄛˇ ㄇㄞˇ ㄓㄜˋ ㄍㄜˋ。", py: "Hǎo, wǒ mǎi zhège." }
        ]
      },
      {
        heading: "對話二",
        audio: "/static/audio/reading/ch6_p2.wav",
        lines: [
          { hz: "A：你們大學有多少學生？", zy: "ㄋㄧˇ ㄇㄣ˙ ㄉㄚˋ ㄒㄩㄝˊ ㄧㄡˇ ㄉㄨㄛ ㄕㄠˇ ㄒㄩㄝˊ ㄕㄥ？", py: "Nǐmen dàxué yǒu duōshǎo xuéshēng?" },
          { hz: "B：有兩萬多學生。", zy: "ㄧㄡˇ ㄌㄧㄤˇ ㄨㄢˋ ㄉㄨㄛ ㄒㄩㄝˊ ㄕㄥ。", py: "Yǒu liǎngwànduō xuéshēng." },
          { hz: "A：有多少老師呢？", zy: "ㄧㄡˇ ㄉㄨㄛ ㄕㄠˇ ㄌㄠˇ ㄕ ㄋㄜ˙？", py: "Yǒu duōshǎo lǎoshī ne?" },
          { hz: "B：我不知道。我想有兩千多位。", zy: "ㄨㄛˇ ㄅㄨˋ ㄓ ㄉㄠˋ。ㄨㄛˇ ㄒㄧㄤˇ ㄧㄡˇ ㄌㄧㄤˇ ㄑㄧㄢ ㄉㄨㄛ ㄨㄟˋ。", py: "Wǒ bù zhīdào. Wǒ xiǎng yǒu liǎngqiān duō wèi." },
          { hz: "A：那真不少。", zy: "ㄋㄚˋ ㄓㄣ ㄅㄨˋ ㄕㄠˇ。", py: "Nà zhēn bùshǎo." },
          { hz: "B：你們學校大不大？有多少學生？", zy: "ㄋㄧˇ ㄇㄣ˙ ㄒㄩㄝˊ ㄒㄧㄠˋ ㄉㄚˋ ㄅㄨˊ ㄉㄚˋ？ㄧㄡˇ ㄉㄨㄛ ㄕㄠˇ ㄒㄩㄝˊ ㄕㄥ？", py: "Nǐmen xuéxiào dà búdà? Yǒu duōshǎo xuéshēng?" },
          { hz: "A：我們大學很小，只有七、八千學生，可是很有名。", zy: "ㄨㄛˇ ㄇㄣ˙ ㄉㄚˋ ㄒㄩㄝˊ ㄏㄣˇ ㄒㄧㄠˇ，ㄓˇ ㄧㄡˇ ㄑㄧ、ㄅㄚ ㄑㄧㄢ ㄒㄩㄝˊ ㄕㄥ，ㄎㄜˇ ㄕˋ ㄏㄣˇ ㄧㄡˇ ㄇㄧㄥˊ。", py: "Wǒmen dàxué hěn xiǎo, zhǐ yǒu qī, bāqiān xuéshēng, kěshì hěn yǒumíng." }
        ]
      }
    ]
  },
  7: {
    title: "第七課　你的法文念得真好聽",
    dialogues: [
      {
        heading: "對話一",
        audio: "/static/audio/reading/ch7_p1.wav",
        lines: [
          { hz: "A：文生，你在念什麼呢？", zy: "ㄨㄣˊ ㄕㄥ，ㄋㄧˇ ㄗㄞˋ ㄋㄧㄢˋ ㄕㄣˊ ㄇㄜ˙ ㄋㄜ˙？", py: "Wénshēng, nǐ zài niàn shénme ne?" },
          { hz: "B：我在念法文。", zy: "ㄨㄛˇ ㄗㄞˋ ㄋㄧㄢˋ ㄈㄚˇ ㄨㄣˊ。", py: "Wǒ zài niàn Fǎwén." },
          { hz: "A：你的法文，念得真好聽。", zy: "ㄋㄧˇ ㄉㄜ˙ ㄈㄚˇ ㄨㄣˊ，ㄋㄧㄢˋ ㄉㄜ˙ ㄓㄣ ㄏㄠˇ ㄊㄧㄥ。", py: "Nǐde Fǎwén, niànde zhēn hǎotīng." },
          { hz: "B：謝謝，可是我學得很慢。", zy: "ㄒㄧㄝˋ ㄒㄧㄝˋ，ㄎㄜˇ ㄕˋ ㄨㄛˇ ㄒㄩㄝˊ ㄉㄜ˙ ㄏㄣˇ ㄇㄢˋ。", py: "Xièxie, kěshì wǒ xuéde hěn màn." },
          { hz: "A：學法文有意思嗎？", zy: "ㄒㄩㄝˊ ㄈㄚˇ ㄨㄣˊ ㄧㄡˇ ㄧˋ ㄙ ㄇㄚ˙？", py: "Xué Fǎwén yǒu yìsi ma?" },
          { hz: "B：很有意思，可是我覺得有一點難。", zy: "ㄏㄣˇ ㄧㄡˇ ㄧˋ ㄙ，ㄎㄜˇ ㄕˋ ㄨㄛˇ ㄐㄩㄝˊ ㄉㄜ˙ ㄧㄡˇ ㄧˋ ㄉㄧㄢˇ ㄋㄢˊ。", py: "Hěn yǒu yìsi, kěshì wǒ juéde yǒuyīdiǎn nán." },
          { hz: "A：我也想學一點法國話，你可以教我嗎？", zy: "ㄨㄛˇ ㄧㄝˇ ㄒㄧㄤˇ ㄒㄩㄝˊ ㄧˋ ㄉㄧㄢˇ ㄈㄚˇ ㄍㄨㄛˊ ㄏㄨㄚˋ，ㄋㄧˇ ㄎㄜˇ ㄧˇ ㄐㄧㄠ ㄨㄛˇ ㄇㄚ˙？", py: "Wǒ yě xiǎng xué yīdiǎn Fǎguó huà, nǐ kěyǐ jiāo wǒ ma?" },
          { hz: "B：現在我的法國話還說得不好，不能教你。", zy: "ㄒㄧㄢˋ ㄗㄞˋ ㄨㄛˇ ㄉㄜ˙ ㄈㄚˇ ㄍㄨㄛˊ ㄏㄨㄚˋ ㄏㄞˊ ㄕㄨㄛ ㄉㄜ˙ ㄅㄨˋ ㄏㄠˇ，ㄅㄨˋ ㄋㄥˊ ㄐㄧㄠ ㄋㄧˇ。", py: "Xiànzài wǒde Fǎguó huà hái shuōde bùhǎo, bùnéng jiāo nǐ." },
          { hz: "A：你會不會唱法國歌？", zy: "ㄋㄧˇ ㄏㄨㄟˋ ㄅㄨˊ ㄏㄨㄟˋ ㄔㄤˋ ㄈㄚˇ ㄍㄨㄛˊ ㄍㄜ？", py: "Nǐ huì búhuì chàng Fǎguó gē?" },
          { hz: "B：我只會唱，\"Frere Jacques, Frere Jacques, Dormez-Vous, Dormez-Vous, ...\"。", zy: "ㄨㄛˇ ㄓˇ ㄏㄨㄟˋ ㄔㄤˋ，\"Frere Jacques, Frere Jacques, Dormez-Vous, Dormez-Vous, ...\"。", py: "Wǒ zhǐ huì chàng, \"Frere Jacques, Frere Jacques, Dormez-Vous, Dormez-Vous, ...\"." },
          { hz: "A：你唱得真好聽。", zy: "ㄋㄧˇ ㄔㄤˋ ㄉㄜ˙ ㄓㄣ ㄏㄠˇ ㄊㄧㄥ。", py: "Nǐ chàngde zhēn hǎotīng." }
        ]
      },
      {
        heading: "對話二",
        audio: "/static/audio/reading/ch7_p2.wav",
        lines: [
          { hz: "A：小張，我想請你吃飯。", zy: "ㄒㄧㄠˇ ㄓㄤ，ㄨㄛˇ ㄒㄧㄤˇ ㄑㄧㄥˇ ㄋㄧˇ ㄔ ㄈㄢˋ。", py: "Xiǎo Zhāng, Wǒ xiǎng qǐng nǐ chīfàn." },
          { hz: "B：好啊。", zy: "ㄏㄠˇ ㄚ。", py: "Hǎo a." },
          { hz: "A：你喜歡吃中國菜還是法國菜？", zy: "ㄋㄧˇ ㄒㄧˇ ㄏㄨㄢ ㄔ ㄓㄨㄥ ㄍㄨㄛˊ ㄘㄞˋ ㄏㄞˊ ㄕˋ ㄈㄚˇ ㄍㄨㄛˊ ㄘㄞˋ？", py: "Nǐ xǐhuān chī Zhōngguó cài háishì Fǎguó cài?" },
          { hz: "B：兩個我都喜歡。", zy: "ㄌㄧㄤˇ ㄍㄜ˙ ㄨㄛˇ ㄉㄡ ㄒㄧˇ ㄏㄨㄢ。", py: "Liǎngge wǒ dōu xǐhuān." },
          { hz: "A：你也喜歡喝酒嗎？", zy: "ㄋㄧˇ ㄧㄝˇ ㄒㄧˇ ㄏㄨㄢ ㄏㄜ ㄐㄧㄡˇ ㄇㄚ˙？", py: "Nǐ yě xǐhuān hē jiǔ ma?" },
          { hz: "B：喜歡，可是我只能喝一點。", zy: "ㄒㄧˇ ㄏㄨㄢ，ㄎㄜˇ ㄕˋ ㄨㄛˇ ㄓˇ ㄋㄥˊ ㄏㄜ ㄧˋ ㄉㄧㄢˇ。", py: "Xǐhuān, kěshì wǒ zhǐ néng hē yīdiǎn." },
          { hz: "A：好，我請你吃中國菜，喝法國酒。", zy: "ㄏㄠˇ，ㄨㄛˇ ㄑㄧㄥˇ ㄋㄧˇ ㄔ ㄓㄨㄥ ㄍㄨㄛˊ ㄘㄞˋ，ㄏㄜ ㄈㄚˇ ㄍㄨㄛˊ ㄐㄧㄡˇ。", py: "Hǎo, wǒ qǐng nǐ chī Zhōngguó cài, hē Fǎguó jiǔ." },
          { hz: "B：那太好了！謝謝！謝謝！", zy: "ㄋㄚˋ ㄊㄞˋ ㄏㄠˇ ㄌㄜ˙！ㄒㄧㄝˋ ㄒㄧㄝˋ！ㄒㄧㄝˋ ㄒㄧㄝˋ！", py: "Nà tài hǎo le! Xièxie! Xièxie!" }
        ]
      }
    ]
  },
  8: {
    title: "第八課　這是我們新買的電視機",
    dialogues: [
      {
        heading: "對話一",
        audio: "/static/audio/reading/ch8_p1.wav",
        lines: [
          { hz: "A：這是你們新買的電視機嗎？", zy: "ㄓㄜˋ ㄕˋ ㄋㄧˇ ㄇㄣ˙ ㄒㄧㄣ ㄇㄞˇ ㄉㄜ˙ ㄉㄧㄢˋ ㄕˋ ㄐㄧ ㄇㄚ˙？", py: "Zhè shì nǐmen xīn mǎide diànshìjī ma?" },
          { hz: "B：是啊。", zy: "ㄕˋ ㄚ。", py: "Shì a." },
          { hz: "A：你常看電視嗎？", zy: "ㄋㄧˇ ㄔㄤˊ ㄎㄢˋ ㄉㄧㄢˋ ㄕˋ ㄇㄚ˙？", py: "Nǐ cháng kàn diànshì ma?" },
          { hz: "B：常看，我最愛看王鶯鶯唱歌。", zy: "ㄔㄤˊ ㄎㄢˋ，ㄨㄛˇ ㄗㄨㄟˋ ㄞˋ ㄎㄢˋ ㄨㄤˊ ㄧㄥ ㄧㄥ ㄔㄤˋ ㄍㄜ。", py: "Cháng kàn, wǒ zuì ài kàn Wáng Yīngyīng chànggē." },
          { hz: "A：對啊，她唱的歌都很好聽。", zy: "ㄉㄨㄟˋ ㄚ，ㄊㄚ ㄔㄤˋ ㄉㄜ˙ ㄍㄜ ㄉㄡ ㄏㄣˇ ㄏㄠˇ ㄊㄧㄥ。", py: "Duì a, tā chàngde gē dōu hěn hǎotīng." },
          { hz: "B：她跳舞，也跳得不錯。", zy: "ㄊㄚ ㄊㄧㄠˋ ㄨˇ，ㄧㄝˇ ㄊㄧㄠˋ ㄉㄜ˙ ㄅㄨˊ ㄘㄨㄛˋ。", py: "Tā tiàowǔ, yě tiàode búcuò." },
          { hz: "A：她穿的衣服，我也喜歡。", zy: "ㄊㄚ ㄔㄨㄢ ㄉㄜ˙ ㄧ ㄈㄨˊ，ㄨㄛˇ ㄧㄝˇ ㄒㄧˇ ㄏㄨㄢ。", py: "Tā chuānde yīfú, wǒ yě xǐhuān." },
          { hz: "B：聽說她還會唱不少外國歌，她的英文、法文也都說得很好。", zy: "ㄊㄧㄥ ㄕㄨㄛ ㄊㄚ ㄏㄞˊ ㄏㄨㄟˋ ㄔㄤˋ ㄅㄨˋ ㄕㄠˇ ㄨㄞˋ ㄍㄨㄛˊ ㄍㄜ，ㄊㄚ ㄉㄜ˙ ㄧㄥ ㄨㄣˊ、ㄈㄚˇ ㄨㄣˊ ㄧㄝˇ ㄉㄡ ㄕㄨㄛ ㄉㄜ˙ ㄏㄣˇ ㄏㄠˇ。", py: "Tīngshuō tā hái huì chàng bùshǎo wàiguó gē, tāde Yīngwén, Fǎwén yě dōu shuōde hěn hǎo." },
          { hz: "A：我想她一定有很多外國朋友。", zy: "ㄨㄛˇ ㄒㄧㄤˇ ㄊㄚ ㄧˊ ㄉㄧㄥˋ ㄧㄡˇ ㄏㄣˇ ㄉㄨㄛ ㄨㄞˋ ㄍㄨㄛˊ ㄆㄥˊ ㄧㄡˇ。", py: "Wǒ xiǎng tā yídìng yǒu hěn duō wàiguó péngyǒu." }
        ]
      },
      {
        heading: "對話二",
        audio: "/static/audio/reading/ch8_p2.wav",
        lines: [
          { hz: "A：你在學中國畫嗎？", zy: "ㄋㄧˇ ㄗㄞˋ ㄒㄩㄝˊ ㄓㄨㄥ ㄍㄨㄛˊ ㄏㄨㄚˋ ㄇㄚ˙？", py: "Nǐ zài xué Zhōngguó huà ma?" },
          { hz: "B：是啊，你看，這張就是我畫的。", zy: "ㄕˋ ㄚ，ㄋㄧˇ ㄎㄢˋ，ㄓㄜˋ ㄓㄤ ㄐㄧㄡˋ ㄕˋ ㄨㄛˇ ㄏㄨㄚˋ ㄉㄜ˙。", py: "Shì a, nǐ kàn, zhèizhāng jiù shì wǒ huàde." },
          { hz: "A：你畫的這張畫真好看。", zy: "ㄋㄧˇ ㄏㄨㄚˋ ㄉㄜ˙ ㄓㄜˋ ㄓㄤ ㄏㄨㄚˋ ㄓㄣ ㄏㄠˇ ㄎㄢˋ。", py: "Nǐ huàde zhèizhāng huà zhēn hǎokàn." },
          { hz: "B：謝謝。", zy: "ㄒㄧㄝˋ ㄒㄧㄝˋ。", py: "Xièxie." },
          { hz: "A：教你中國畫的老師姓什麼？", zy: "ㄐㄧㄠ ㄋㄧˇ ㄓㄨㄥ ㄍㄨㄛˊ ㄏㄨㄚˋ ㄉㄜ˙ ㄌㄠˇ ㄕ ㄒㄧㄥˋ ㄕㄣˊ ㄇㄜ˙？", py: "Jiāo nǐ Zhōngguó huàde lǎoshī xìng shénme?" },
          { hz: "B：他姓錢。他是很有名的畫家。", zy: "ㄊㄚ ㄒㄧㄥˋ ㄑㄧㄢˊ。ㄊㄚ ㄕˋ ㄏㄣˇ ㄧㄡˇ ㄇㄧㄥˊ ㄉㄜ˙ ㄏㄨㄚˋ ㄐㄧㄚ。", py: "Tā xìng Qián. Tā shì hěn yǒumíngde huàjiā." },
          { hz: "A：喔，我知道他，他也教書法嗎？", zy: "ㄡ，ㄨㄛˇ ㄓ ㄉㄠˋ ㄊㄚ，ㄊㄚ ㄧㄝˇ ㄐㄧㄠ ㄕㄨ ㄈㄚˇ ㄇㄚ˙？", py: "Òu, wǒ zhīdào tā, tā yě jiāo shūfǎ ma?" },
          { hz: "B：對，他也教我書法。", zy: "ㄉㄨㄟˋ，ㄊㄚ ㄧㄝˇ ㄐㄧㄠ ㄨㄛˇ ㄕㄨ ㄈㄚˇ。", py: "Duì, tā yě jiāo wǒ shūfǎ." },
          { hz: "A：你為什麼要學書法？", zy: "ㄋㄧˇ ㄨㄟˋ ㄕㄣˊ ㄇㄜ˙ ㄧㄠˋ ㄒㄩㄝˊ ㄕㄨ ㄈㄚˇ？", py: "Nǐ wèishénme yào xué shūfǎ?" },
          { hz: "B：因為我覺得書法很美，所以我想學學。", zy: "ㄧㄣ ㄨㄟˋ ㄨㄛˇ ㄐㄩㄝˊ ㄉㄜ˙ ㄕㄨ ㄈㄚˇ ㄏㄣˇ ㄇㄟˇ，ㄙㄨㄛˇ ㄧˇ ㄨㄛˇ ㄒㄧㄤˇ ㄒㄩㄝˊ ㄒㄩㄝˊ。", py: "Yīnwèi wǒ juéde shūfǎ hěn měi, suǒyǐ wǒ xiǎng xuéxué." }
        ]
      }
    ]
  },
  9: {
    title: "第九課　你們學校在哪裡？",
    dialogues: [
      {
        heading: "對話一",
        audio: "/static/audio/reading/ch9_p1.wav",
        lines: [
          { hz: "A：你們學校在哪裡？", zy: "ㄋㄧˇ ㄇㄣ˙ ㄒㄩㄝˊ ㄒㄧㄠˋ ㄗㄞˋ ㄋㄚˇ ㄌㄧˇ？", py: "Nǐmen xuéxiào zài nǎlǐ?" },
          { hz: "B：在大學路。", zy: "ㄗㄞˋ ㄉㄚˋ ㄒㄩㄝˊ ㄌㄨˋ。", py: "Zài Dàxué Lù." },
          { hz: "A：學生多不多？", zy: "ㄒㄩㄝˊ ㄕㄥ ㄉㄨㄛ ㄅㄨˋ ㄉㄨㄛ？", py: "Xuéshēng duō bùduō?" },
          { hz: "B：不太多，只有五、六千個學生。", zy: "ㄅㄨˊ ㄊㄞˋ ㄉㄨㄛ，ㄓˇ ㄧㄡˇ ㄨˇ、ㄌㄧㄡˋ ㄑㄧㄢ ㄍㄜ˙ ㄒㄩㄝˊ ㄕㄥ。", py: "Bútài duō, zhǐ yǒu wǔ, liùqiān ge xuéshēng." },
          { hz: "A：有宿舍嗎？", zy: "ㄧㄡˇ ㄙㄨˋ ㄕㄜˋ ㄇㄚ˙？", py: "Yǒu sùshè ma?" },
          { hz: "B：有，圖書館後面的大樓就是學生宿舍。", zy: "ㄧㄡˇ，ㄊㄨˊ ㄕㄨ ㄍㄨㄢˇ ㄏㄡˋ ㄇㄧㄢˋ ㄉㄜ˙ ㄉㄚˋ ㄌㄡˊ ㄐㄧㄡˋ ㄕˋ ㄒㄩㄝˊ ㄕㄥ ㄙㄨˋ ㄕㄜˋ。", py: "Yǒu, túshūguǎn hòumiànde dàlóu jiù shì xuéshēng sùshè." },
          { hz: "A：你常在宿舍裡看書嗎？", zy: "ㄋㄧˇ ㄔㄤˊ ㄗㄞˋ ㄙㄨˋ ㄕㄜˋ ㄌㄧˇ ㄎㄢˋ ㄕㄨ ㄇㄚ˙？", py: "Nǐ cháng zài sùshèlǐ kànshū ma?" },
          { hz: "B：不，宿舍裡人太多，我常在圖書館看書。", zy: "ㄅㄨˋ，ㄙㄨˋ ㄕㄜˋ ㄌㄧˇ ㄖㄣˊ ㄊㄞˋ ㄉㄨㄛ，ㄨㄛˇ ㄔㄤˊ ㄗㄞˋ ㄊㄨˊ ㄕㄨ ㄍㄨㄢˇ ㄎㄢˋ ㄕㄨ。", py: "Bù, sùshèlǐ rén tài duō, wǒ cháng zài túshūguǎn kànshū." },
          { hz: "A：學校附近有書店嗎？", zy: "ㄒㄩㄝˊ ㄒㄧㄠˋ ㄈㄨˋ ㄐㄧㄣˋ ㄧㄡˇ ㄕㄨ ㄉㄧㄢˋ ㄇㄚ˙？", py: "Xuéxiào fùjìn yǒu shūdiàn ma?" },
          { hz: "B：有，學校外面有兩家書店，學生都喜歡在那裡買書。", zy: "ㄧㄡˇ，ㄒㄩㄝˊ ㄒㄧㄠˋ ㄨㄞˋ ㄇㄧㄢˋ ㄧㄡˇ ㄌㄧㄤˇ ㄐㄧㄚ ㄕㄨ ㄉㄧㄢˋ，ㄒㄩㄝˊ ㄕㄥ ㄉㄡ ㄒㄧˇ ㄏㄨㄢ ㄗㄞˋ ㄋㄚˋ ㄌㄧˇ ㄇㄞˇ ㄕㄨ。", py: "Yǒu, xuéxiào wàimiàn yǒu liǎngjiā shūdiàn, xuéshēng dōu xǐhuān zài nàlǐ mǎi shū." },
          { hz: "A：那麼，學生看書、買書都很方便。", zy: "ㄋㄚˋ ㄇㄜ˙，ㄒㄩㄝˊ ㄕㄥ ㄎㄢˋ ㄕㄨ、ㄇㄞˇ ㄕㄨ ㄉㄡ ㄏㄣˇ ㄈㄤ ㄅㄧㄢˋ。", py: "Nàme, xuéshēng kànshū, mǎishū dōu hěn fāngbiàn." },
          { hz: "B：是啊。", zy: "ㄕˋ ㄚ。", py: "Shì a." }
        ]
      },
      {
        heading: "對話二",
        audio: "/static/audio/reading/ch9_p2.wav",
        lines: [
          { hz: "A：請問，您這間房子要賣嗎？", zy: "ㄑㄧㄥˇ ㄨㄣˋ，ㄋㄧㄣˊ ㄓㄜˋ ㄐㄧㄢ ㄈㄤˊ ㄗ˙ ㄧㄠˋ ㄇㄞˋ ㄇㄚ˙？", py: "Qǐngwèn, nín zhè jiān fángzi yào mài ma?" },
          { hz: "B：是的。", zy: "ㄕˋ ㄉㄜ˙。", py: "Shìde." },
          { hz: "A：我可以不可以看看？", zy: "ㄨㄛˇ ㄎㄜˇ ㄅㄨˋ ㄎㄜˇ ㄧˇ ㄎㄢˋ ㄎㄢˋ？", py: "Wǒ kě bùkěyǐ kànkàn?" },
          { hz: "B：可以，可以。這是客廳。飯廳在那邊。飯廳旁邊的那間屋子是廚房。", zy: "ㄎㄜˇ ㄧˇ，ㄎㄜˇ ㄧˇ。ㄓㄜˋ ㄕˋ ㄎㄜˋ ㄊㄧㄥ。ㄈㄢˋ ㄊㄧㄥ ㄗㄞˋ ㄋㄚˋ ㄅㄧㄢ。ㄈㄢˋ ㄊㄧㄥ ㄆㄤˊ ㄅㄧㄢ ㄉㄜ˙ ㄋㄚˋ ㄐㄧㄢ ㄨ ㄗ˙ ㄕˋ ㄔㄨˊ ㄈㄤˊ。", py: "Kěyǐ, kěyǐ. Zhè shì kètīng. Fàntīng zài nàbiān. Fàntīng pángbiānde nàjiān wūzi shì chúfáng." },
          { hz: "A：樓上有幾個房間？", zy: "ㄌㄡˊ ㄕㄤˋ ㄧㄡˇ ㄐㄧˇ ㄍㄜ˙ ㄈㄤˊ ㄐㄧㄢ？", py: "Lóushàng yǒu jǐge fángjiān?" },
          { hz: "B：樓上有四個房間，都很大。", zy: "ㄌㄡˊ ㄕㄤˋ ㄧㄡˇ ㄙˋ ㄍㄜ˙ ㄈㄤˊ ㄐㄧㄢ，ㄉㄡ ㄏㄣˇ ㄉㄚˋ。", py: "Lóushàng yǒu sìge fángjiān, dōu hěn dà." },
          { hz: "A：附近有小學嗎？", zy: "ㄈㄨˋ ㄐㄧㄣˋ ㄧㄡˇ ㄒㄧㄠˇ ㄒㄩㄝˊ ㄇㄚ˙？", py: "Fùjìn yǒu xiǎoxué ma?" },
          { hz: "B：有，離這裡不遠。", zy: "ㄧㄡˇ，ㄌㄧˊ ㄓㄜˋ ㄌㄧˇ ㄅㄨˋ ㄩㄢˇ。", py: "Yǒu, lí zhèlǐ bùyuǎn." },
          { hz: "A：在什麼地方？", zy: "ㄗㄞˋ ㄕㄣˊ ㄇㄜ˙ ㄉㄧˋ ㄈㄤ？", py: "Zài shénme dìfāng?" },
          { hz: "B：就在東一路。", zy: "ㄐㄧㄡˋ ㄗㄞˋ ㄉㄨㄥ ㄧ ㄌㄨˋ。", py: "Jiù zài Dōngyī Lù." },
          { hz: "A：這間房子賣多少錢？", zy: "ㄓㄜˋ ㄐㄧㄢ ㄈㄤˊ ㄗ˙ ㄇㄞˋ ㄉㄨㄛ ㄕㄠˇ ㄑㄧㄢˊ？", py: "Zhè jiān fángzi mài duōshǎo qián?" },
          { hz: "B：九百萬。", zy: "ㄐㄧㄡˇ ㄅㄞˇ ㄨㄢˋ。", py: "Jiǔbǎiwàn." },
          { hz: "A：這間房子不錯，可是有一點貴，我要再想一想。謝謝您，再見。", zy: "ㄓㄜˋ ㄐㄧㄢ ㄈㄤˊ ㄗ˙ ㄅㄨˊ ㄘㄨㄛˋ，ㄎㄜˇ ㄕˋ ㄧㄡˇ ㄧˋ ㄉㄧㄢˇ ㄍㄨㄟˋ，ㄨㄛˇ ㄧㄠˋ ㄗㄞˋ ㄒㄧㄤˇ ㄧˋ ㄒㄧㄤˇ。ㄒㄧㄝˋ ㄒㄧㄝ ㄋㄧㄣˊ，ㄗㄞˋ ㄐㄧㄢˋ。", py: "Zhè jiān fángzi búcuò, kěshì yǒu yìdiǎn guì, wǒ yào zài xiǎngyìxiǎng. Xièxie nín, zàijiàn." },
          { hz: "B：再見。", zy: "ㄗㄞˋ ㄐㄧㄢˋ。", py: "Zàijiàn." }
        ]
      }
    ]
  }
};