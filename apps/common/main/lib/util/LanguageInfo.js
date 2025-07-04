/*
 * (c) Copyright Ascensio System SIA 2010-2024
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */
/**
 *    LanguageInfo.js
 *
 *    Created on 31 January 2014
 *
 */

if ( window.Common === undefined ) {
    window.Common = {};
}

// TODO: move to Common.Utils
Common.util = Common.util||{};

Common.util.LanguageInfo = new(function() {
    var localLanguageName = { // code: [short-name, native-name, english-name] - fill 3 field when need to add language to editor interface
        0x0036 : ["af", "Afrikaans"],
        0x0436 : ["af-ZA", "Afrikaans (Suid Afrika)", "Afrikaans (South Africa)"],
        0x001C : ["sq", "Shqipe"],
        0x041C : ["sq-AL", "Shqipe (Shqipëria)", "Albanian (Albania)"],
        0x0084 : ["gsw", "Elsässisch"],
        0x0484 : ["gsw-FR", "Elsässisch (Frànkrisch)", "Alsatian (France)"],
        0x005E : ["am", "አማርኛ"],
        0x045E : ["am-ET", "አማርኛ (ኢትዮጵያ)", "Amharic (Ethiopia)"],
        0x0001 : ["ar", "العربية‏"],
        0x1401 : ["ar-DZ", "العربية (الجزائر)‏", "Arabic (Algeria)"],
        0x3C01 : ["ar-BH", "العربية (البحرين)‏", "Arabic (Bahrain)"],
        0x0C01 : ["ar-EG", "العربية (مصر)‏", "Arabic (Egypt)"],
        0x0801 : ["ar-IQ", "العربية (العراق)‏", "Arabic (Iraq)"],
        0x2C01 : ["ar-JO", "العربية (الأردن)‏", "Arabic (Jordan)"],
        0x3401 : ["ar-KW", "العربية (الكويت)‏", "Arabic (Kuwait)"],
        0x3001 : ["ar-LB", "العربية (لبنان)‏", "Arabic (Lebanon)"],
        0x1001 : ["ar-LY", "العربية (ليبيا)‏", "Arabic (Libya)"],
        0x1801 : ["ar-MA", "العربية (المملكة المغربية)‏", "Arabic (Morocco)"],
        0x2001 : ["ar-OM", "العربية (عمان)‏", "Arabic (Oman)"],
        0x4001 : ["ar-QA", "العربية (قطر)‏", "Arabic (Qatar)"],
        0x0401 : ["ar-SA", "العربية (المملكة العربية السعودية)‏", "Arabic (Saudi Arabia)"],
        0x2801 : ["ar-SY", "العربية (سوريا)‏", "Arabic (Syria)"],
        0x1C01 : ["ar-TN", "العربية (تونس)‏", "Arabic (Tunisia)"],
        0x3801 : ["ar-AE", "العربية (الإمارات العربية المتحدة)‏", "Arabic (U.A.E.)"],
        0x2401 : ["ar-YE", "العربية (اليمن)‏", "Arabic (Yemen)"],
        0x002B : ["hy", "Հայերեն"],
        0x042B : ["hy-AM", "Հայերեն (Հայաստան)", "Armenian (Armenia)"],
        0x004D : ["as", "অসমীয়া"],
        0x044D : ["as-IN", "অসমীয়া (ভাৰত)", "Assamese (India)"],
        0x002C : ["az", "Azərbaycan­ılı"],
        0x742C : ["az-Cyrl", "Азәрбајҹан дили"],
        0x082C : ["az-Cyrl-AZ", "Азәрбајҹан (Азәрбајҹан)", "Azeri (Cyrillic, Azerbaijan)"],
        0x782C : ["az-Latn", "Azərbaycan­ılı"],
        0x042C : ["az-Latn-AZ", "Azərbaycan­ılı (Azərbaycan)", "Azeri (Latin, Azerbaijan)"],
        0x006D : ["ba", "Башҡорт"],
        0x046D : ["ba-RU", "Башҡорт (Россия)", "Bashkir (Russia)"],
        0x002D : ["eu", "Euskara"],
        0x042D : ["eu-ES", "Euskara (Euskara)", "Basque (Basque)"],
        0x0023 : ["be", "Беларуская"],
        0x0423 : ["be-BY", "Беларуская (Беларусь)", "Belarusian (Belarus)"],
        0x0045 : ["bn", "বাংলা"],
        0x0845 : ["bn-BD", "বাংলা (বাংলাদেশ)", "Bengali (Bangladesh)"],
        0x0445 : ["bn-IN", "বাংলা (ভারত)", "Bengali (India)"],
        0x781A : ["bs", "bosanski"],
        0x641A : ["bs-Cyrl", "Босански (Ћирилица)"],
        0x201A : ["bs-Cyrl-BA", "Босански (Босна и Херцеговина)", "Bosnian (Cyrillic, Bosnia and Herzegovina)"],
        0x681A : ["bs-Latn", "Bosanski (Latinica)"],
        0x141A : ["bs-Latn-BA", "Bosanski (Bosna i Hercegovina)", "Bosnian (Latin, Bosnia and Herzegovina)"],
        0x007E : ["br", "Brezhoneg"],
        0x047E : ["br-FR", "Brezhoneg (Frañs)", "Breton (France)"],
        0x0002 : ["bg", "Български"],
        0x0402 : ["bg-BG", "Български (България)", "Bulgarian (Bulgaria)"],
        0x0003 : ["ca", "Català"],
        0x0403 : ["ca-ES", "Català (Català)", "Catalan (Catalan)"],
        0x0803 : ["ca-ES-valencia", "Català (Valencià)", "Catalan (Valencia)"],
        0x7804 : ["zh", "中文"],
        0x0004 : ["zh-Hans", "中文(简体)", "Chinese (Simplified)"],
        0x0804 : ["zh-CN", "中文(中华人民共和国)", "Chinese (People's Republic of China)"],
        0x1004 : ["zh-SG", "中文(新加坡)", "Chinese (Simplified, Singapore)"],
        0x7C04 : ["zh-Hant", "中文(繁體)", "Chinese (Traditional)"],
        0x0C04 : ["zh-HK", "中文(香港特別行政區)", "Chinese (Traditional, Hong Kong S.A.R.)"],
        0x1404 : ["zh-MO", "中文(澳門特別行政區)", "Chinese (Traditional, Macao S.A.R.)"],
        0x0404 : ["zh-TW", "中文(台灣)", "Chinese (Traditional, Taiwan)"],
        0x0083 : ["co", "Corsu"],
        0x0483 : ["co-FR", "Corsu (France)", "Corsican (France)"],
        0x001A : ["hr", "Hrvatski"],
        0x041A : ["hr-HR", "Hrvatski (Hrvatska)", "Croatian (Croatia)"],
        0x101A : ["hr-BA", "Hrvatski (Bosna i Hercegovina)", "Croatian (Bosnia and Herzegovina)"],
        0x0005 : ["cs", "Čeština"],
        0x0405 : ["cs-CZ", "Čeština (Česká republika)", "Czech (Czech Republic)"],
        0x0006 : ["da", "Dansk"],
        0x0406 : ["da-DK", "Dansk (Danmark)", "Danish (Denmark)"],
        0x008C : ["prs", "درى‏"],
        0x048C : ["prs-AF", "درى (افغانستان)‏", "Dari (Afghanistan)"],
        0x0065 : ["dv", "ދިވެހިބަސް‏"],
        0x0465 : ["dv-MV", "ދިވެހިބަސް (ދިވެހި ރާއްޖެ)‏", "Divehi (Maldives)"],
        0x0013 : ["nl", "Nederlands"],
        0x0813 : ["nl-BE", "Nederlands (België)", "Dutch (Belgium)"],
        0x0413 : ["nl-NL", "Nederlands (Nederland)", "Dutch (Netherlands)"],
        0x0009 : ["en", "English"],
        0x0C09 : ["en-AU", "English (Australia)", "English (Australia)"],
        0x2809 : ["en-BZ", "English (Belize)", "English (Belize)"],
        0x1009 : ["en-CA", "English (Canada)", "English (Canada)"],
        0x2409 : ["en-029", "English (Caribbean)", "English (Caribbean)"],
        0x4009 : ["en-IN", "English (India)", "English (India)"],
        0x1809 : ["en-IE", "English (Ireland)", "English (Ireland)"],
        0x2009 : ["en-JM", "English (Jamaica)", "English (Jamaica)"],
        0x4409 : ["en-MY", "English (Malaysia)", "English (Malaysia)"],
        0x1409 : ["en-NZ", "English (New Zealand)", "English (New Zealand)"],
        0x3409 : ["en-PH", "English (Philippines)", "English (Philippines)"],
        0x4809 : ["en-SG", "English (Singapore)", "English (Singapore)"],
        0x1C09 : ["en-ZA", "English (South Africa)", "English (South Africa)"],
        0x2C09 : ["en-TT", "English (Trinidad y Tobago)", "English (Trinidad y Tobago)"],
        0x0809 : ["en-GB", "English (United Kingdom)", "English (United Kingdom)"],
        0x0409 : ["en-US", "English (United States)", "English (United States)"],
        0x3009 : ["en-ZW", "English (Zimbabwe)", "English (Zimbabwe)"],
        0x3c09 : ["en-HK", "English (Hong Kong)", "English (Hong Kong)"],
        0x3809 : ["en-ID", "English (Indonesia)", "English (Indonesia)"],
        0x0025 : ["et", "Eesti"],
        0x0425 : ["et-EE", "Eesti (Eesti)", "Estonian (Estonia)"],
        0x0038 : ["fo", "Føroyskt"],
        0x0438 : ["fo-FO", "Føroyskt (Føroyar)", "Faroese (Faroe Islands)"],
        0x0064 : ["fil", "Filipino"],
        0x0464 : ["fil-PH", "Filipino (Pilipinas)", "Filipino (Philippines)"],
        0x000B : ["fi", "Suomi"],
        0x040B : ["fi-FI", "Suomi (Suomi)", "Finnish (Finland)"],
        0x000C : ["fr", "Français"],
        0x080C : ["fr-BE", "Français (Belgique)", "French (Belgium)"],
        0x0C0C : ["fr-CA", "Français (Canada)", "French (Canada)"],
        0x040C : ["fr-FR", "Français (France)", "French (France)"],
        0x140C : ["fr-LU", "Français (Luxembourg)", "French (Luxembourg)"],
        0x180C : ["fr-MC", "Français (Principauté de Monaco)", "French (Principality of Monaco)"],
        0x100C : ["fr-CH", "Français (Suisse)", "French (Switzerland)"],
        0x3c0c : ["fr-HT", "Français (Haïti)", "French (Haiti)"],
        0x240c : ["fr-CG", "Français (Congo-Brazzaville)", "French (Congo)"],
        0x300c : ["fr-CI", "Français (Côte d’Ivoire)", "French (Cote d'Ivoire)"],
        0x2c0c : ["fr-CM", "Français (Cameroun)", "French (Cameroon)"],
        0x380c : ["fr-MA", "Français (Maroc)", "French (Morocco)"],
        0x340c : ["fr-ML", "Français (Mali)", "French (Mali)"],
        0x200c : ["fr-RE", "Français (La Réunion)", "French (Reunion)"],
        0x280c : ["fr-SN", "Français (Sénégal)", "French (Senegal)"],
        0x1c0c : ["fr-West", "French"],
        0x0062 : ["fy", "Frysk"],
        0x0462 : ["fy-NL", "Frysk (Nederlân)", "Frisian (Netherlands)"],
        0x0056 : ["gl", "Galego"],
        0x0456 : ["gl-ES", "Galego (Galego)", "Galician (Galician)"],
        0x0037 : ["ka", "ქართული"],
        0x0437 : ["ka-GE", "ქართული (საქართველო)", "Georgian (Georgia)"],
        0x0007 : ["de", "Deutsch"],
        0x0C07 : ["de-AT", "Deutsch (Österreich)", "German (Austria)"],
        0x0407 : ["de-DE", "Deutsch (Deutschland)", "German (Germany)"],
        0x1407 : ["de-LI", "Deutsch (Liechtenstein)", "German (Liechtenstein)"],
        0x1007 : ["de-LU", "Deutsch (Luxemburg)", "German (Luxembourg)"],
        0x0807 : ["de-CH", "Deutsch (Schweiz)", "German (Switzerland)"],
        0x0008 : ["el", "Ελληνικά"],
        0x0408 : ["el-GR", "Ελληνικά (Ελλάδα)", "Greek (Greece)"],
        0x006F : ["kl", "Kalaallisut"],
        0x046F : ["kl-GL", "Kalaallisut (Kalaallit Nunaat)", "Greenlandic (Greenland)"],
        0x0047 : ["gu", "ગુજરાતી"],
        0x0447 : ["gu-IN", "ગુજરાતી (ભારત)", "Gujarati (India)"],
        0x0068 : ["ha", "Hausa"],
        0x7C68 : ["ha-Latn", "Hausa (Latin)"],
        0x0468 : ["ha-Latn-NG", "Hausa (Nigeria)", "Hausa (Latin, Nigeria)"],
        0x000D : ["he", "עברית‏"],
        0x040D : ["he-IL", "עברית (ישראל)‏", "Hebrew (Israel)"],
        0x0039 : ["hi", "हिंदी"],
        0x0439 : ["hi-IN", "हिंदी (भारत)", "Hindi (India)"],
        0x000E : ["hu", "Magyar"],
        0x040E : ["hu-HU", "Magyar (Magyarország)", "Hungarian (Hungary)"],
        0x000F : ["is", "Íslenska"],
        0x040F : ["is-IS", "Íslenska (Ísland)", "Icelandic (Iceland)"],
        0x0070 : ["ig", "Igbo"],
        0x0470 : ["ig-NG", "Igbo (Nigeria)", "Igbo (Nigeria)"],
        0x0021 : ["id", "Bahasa Indonesia"],
        0x0421 : ["id-ID", "Bahasa Indonesia (Indonesia)", "Indonesian (Indonesia)"],
        0x005D : ["iu", "Inuktitut"],
        0x7C5D : ["iu-Latn", "Inuktitut (Qaliujaaqpait)"],
        0x085D : ["iu-Latn-CA", "Inuktitut (Kanatami, kanata)", "Inuktitut (Latin, Canada)"],
        0x785D : ["iu-Cans", "ᐃᓄᒃᑎᑐᑦ (ᖃᓂᐅᔮᖅᐸᐃᑦ)"],
        0x045D : ["iu-Cans-CA", "ᐃᓄᒃᑎᑐᑦ (ᑲᓇᑕᒥ)", "Inuktitut (Canada)"],
        0x003C : ["ga", "Gaeilge"],
        0x083C : ["ga-IE", "Gaeilge (Éire)", "Irish (Ireland)"],
        0x0034 : ["xh", "isiXhosa"],
        0x0434 : ["xh-ZA", "isiXhosa (uMzantsi Afrika)", "isiXhosa (South Africa)"],
        0x0035 : ["zu", "isiZulu"],
        0x0435 : ["zu-ZA", "isiZulu (iNingizimu Afrika)", "isiZulu (South Africa)"],
        0x0010 : ["it", "Italiano"],
        0x0410 : ["it-IT", "Italiano (Italia)", "Italian (Italy)"],
        0x0810 : ["it-CH", "Italiano (Svizzera)", "Italian (Switzerland)"],
        0x0011 : ["ja", "日本語"],
        0x0411 : ["ja-JP", "日本語 (日本)", "Japanese (Japan)"],
        0x004B : ["kn", "ಕನ್ನಡ"],
        0x044B : ["kn-IN", "ಕನ್ನಡ (ಭಾರತ)", "Kannada (India)"],
        0x003F : ["kk", "Қазақ"],
        0x043F : ["kk-KZ", "Қазақ (Қазақстан)", "Kazakh (Kazakhstan)"],
        0x0053 : ["km", "ខ្មែរ"],
        0x0453 : ["km-KH", "ខ្មែរ (កម្ពុជា)", "Khmer (Cambodia)"],
        0x0086 : ["qut", "K'iche"],
        0x0486 : ["qut-GT", "K'iche (Guatemala)", "K'iche (Guatemala)"],
        0x0087 : ["rw", "Kinyarwanda"],
        0x0487 : ["rw-RW", "Kinyarwanda (Rwanda)", "Kinyarwanda (Rwanda)"],
        0x0041 : ["sw", "Kiswahili"],
        0x0441 : ["sw-KE", "Kiswahili (Kenya)", "Kiswahili (Kenya)"],
        0x0057 : ["kok", "कोंकणी"],
        0x0457 : ["kok-IN", "कोंकणी (भारत)", "Konkani (India)"],
        0x0012 : ["ko", "한국어"],
        0x0412 : ["ko-KR", "한국어 (대한민국)", "Korean (Korea)"],
        0x0040 : ["ky", "Кыргыз"],
        0x0440 : ["ky-KG", "Кыргыз (Кыргызстан)", "Kyrgyz (Kyrgyzstan)"],
        0x0054 : ["lo", "ລາວ"],
        0x0454 : ["lo-LA", "ລາວ (ສ.ປ.ປ. ລາວ)", "Lao (Lao P.D.R.)"],
        0x0026 : ["lv", "Latviešu"],
        0x0426 : ["lv-LV", "Latviešu (Latvija)", "Latvian (Latvia)"],
        0x0027 : ["lt", "Lietuvių"],
        0x0427 : ["lt-LT", "Lietuvių (Lietuva)", "Lithuanian (Lithuania)"],
        0x7C2E : ["dsb", "Dolnoserbšćina"],
        0x082E : ["dsb-DE", "Dolnoserbšćina (Nimska)", "Lower Sorbian (Germany)"],
        0x006E : ["lb", "Lëtzebuergesch"],
        0x046E : ["lb-LU", "Lëtzebuergesch (Luxembourg)", "Luxembourgish (Luxembourg)"],
        0x042F : ["mk-MK", "Македонски јазик (Македонија)", "Macedonian (Macedonia)"],
        0x002F : ["mk", "Македонски јазик"],
        0x003E : ["ms", "Bahasa Melayu"],
        0x083E : ["ms-BN", "Bahasa Melayu (Brunei Darussalam)", "Malay (Brunei Darussalam)"],
        0x043E : ["ms-MY", "Bahasa Melayu (Malaysia)", "Malay (Malaysia)"],
        0x004C : ["ml", "മലയാളം"],
        0x044C : ["ml-IN", "മലയാളം (ഭാരതം)", "Malayalam (India)"],
        0x003A : ["mt", "Malti"],
        0x043A : ["mt-MT", "Malti (Malta)", "Maltese (Malta)"],
        0x0081 : ["mi", "Reo Māori"],
        0x0481 : ["mi-NZ", "Reo Māori (Aotearoa)", "Maori (New Zealand)"],
        0x007A : ["arn", "Mapudungun"],
        0x047A : ["arn-CL", "Mapudungun (Chile)", "Mapudungun (Chile)"],
        0x004E : ["mr", "मराठी"],
        0x044E : ["mr-IN", "मराठी (भारत)", "Marathi (India)"],
        0x007C : ["moh", "Kanien'kéha"],
        0x047C : ["moh-CA", "Kanien'kéha (Canada)", "Mohawk (Canada)"],
        0x0050 : ["mn", "Монгол хэл"],
        0x7850 : ["mn-Cyrl", "Монгол хэл"],
        0x0450 : ["mn-MN", "Монгол хэл (Монгол улс)", "Mongolian (Cyrillic, Mongolia)"],
        0x7C50 : ["mn-Mong", "ᠮᠤᠨᠭᠭᠤᠯ ᠬᠡᠯᠡ"],
        0x0850 : ["mn-Mong-CN", "ᠮᠤᠨᠭᠭᠤᠯ ᠬᠡᠯᠡ (ᠪᠦᠭᠦᠳᠡ ᠨᠠᠢᠷᠠᠮᠳᠠᠬᠤ ᠳᠤᠮᠳᠠᠳᠤ ᠠᠷᠠᠳ ᠣᠯᠣᠰ)", "Mongolian (People's Republic of China)"],
        0x0061 : ["ne", "नेपाली"],
        0x0461 : ["ne-NP", "नेपाली (नेपाल)", "Nepali (Nepal)"],
        0x0861 : ["ne-IN", "नेपाली (भारत)", "Nepali (India)"],
        0x0014 : ["no", "Norsk"],
        0x7C14 : ["nb", "Norsk (bokmål)"],
        0x0414 : ["nb-NO", "Norsk, bokmål (Norge)", "Norwegian, Bokmål (Norway)"],
        0x7814 : ["nn", "Norsk (Nynorsk)"],
        0x0814 : ["nn-NO", "Norsk, nynorsk (Noreg)", "Norwegian, Nynorsk (Norway)"],
        0x0082 : ["oc", "Occitan"],
        0x0482 : ["oc-FR", "Occitan (França)", "Occitan (France)"],
        0x0048 : ["or", "ଓଡ଼ିଆ"],
        0x0448 : ["or-IN", "ଓଡ଼ିଆ (ଭାରତ)", "Oriya (India)"],
        0x0063 : ["ps", "پښتو‏"],
        0x0463 : ["ps-AF", "پښتو (افغانستان)‏", "Pashto (Afghanistan)"],
        0x0029 : ["fa", "فارسى‏"],
        0x0429 : ["fa-IR", "فارسى (ایران)‏", "Persian (Iran)"],
        0x0015 : ["pl", "Polski"],
        0x0415 : ["pl-PL", "Polski (Polska)", "Polish (Poland)"],
        0x0016 : ["pt", "Português"],
        0x0416 : ["pt-BR", "Português (Brasil)", "Portuguese (Brazil)"],
        0x0816 : ["pt-PT", "Português (Portugal)", "Portuguese (Portugal)"],
        0x0046 : ["pa", "ਪੰਜਾਬੀ"],
        0x0446 : ["pa-IN", "ਪੰਜਾਬੀ (ਭਾਰਤ)", "Punjabi (India)"],
        0x006B : ["quz", "Runasimi"],
        0x046B : ["quz-BO", "Runasimi (Qullasuyu)", "Quechua (Bolivia)"],
        0x086B : ["quz-EC", "Runasimi (Ecuador)", "Quechua (Ecuador)"],
        0x0C6B : ["quz-PE", "Runasimi (Piruw)", "Quechua (Peru)"],
        0x0018 : ["ro", "Română"],
        0x0418 : ["ro-RO", "Română (România)", "Romanian (Romania)"],
        0x0818 : ["ro-MD", "Română (Moldova)", "Romanian (Republic of Moldova)"],
        0x0017 : ["rm", "Rumantsch"],
        0x0417 : ["rm-CH", "Rumantsch (Svizra)", "Romansh (Switzerland)"],
        0x0019 : ["ru", "Русский"],
        0x0419 : ["ru-RU", "Русский (Россия)", "Russian (Russia)"],
        0x0819 : ["ru-MD", "Русский (Молдавия)", "Russian (Republic of Moldova)"],
        0x703B : ["smn", "Sämikielâ"],
        0x243B : ["smn-FI", "Sämikielâ (Suomâ)", "Sami (Inari, Finland)"],
        0x7C3B : ["smj", "Julevusámegiella"],
        0x103B : ["smj-NO", "Julevusámegiella (Vuodna)", "Sami (Lule, Norway)"],
        0x143B : ["smj-SE", "Julevusámegiella (Svierik)", "Sami (Lule, Sweden)"],
        0x003B : ["se", "Davvisámegiella"],
        0x0C3B : ["se-FI", "Davvisámegiella (Suopma)", "Sami (Northern, Finland)"],
        0x043B : ["se-NO", "Davvisámegiella (Norga)", "Sami (Northern, Norway)"],
        0x083B : ["se-SE", "Davvisámegiella (Ruoŧŧa)", "Sami (Northern, Sweden)"],
        0x743B : ["sms", "Sääm´ǩiõll"],
        0x203B : ["sms-FI", "Sääm´ǩiõll (Lää´ddjânnam)", "Sami (Skolt, Finland)"],
        0x783B : ["sma", "åarjelsaemiengiele"],
        0x183B : ["sma-NO", "åarjelsaemiengiele (Nöörje)", "Sami (Southern, Norway)"],
        0x1C3B : ["sma-SE", "åarjelsaemiengiele (Sveerje)", "Sami (Southern, Sweden)"],
        0x004F : ["sa", "संस्कृत"],
        0x044F : ["sa-IN", "संस्कृत (भारतम्)", "Sanskrit (India)"],
        0x0091 : ["gd", "Gàidhlig"],
        0x0491 : ["gd-GB", "Gàidhlig (An Rìoghachd Aonaichte)", "Scottish Gaelic (United Kingdom)"],
        0x7C1A : ["sr", "Srpski"],
        0x6C1A : ["sr-Cyrl", "Српски (Ћирилица)"],
        0x1C1A : ["sr-Cyrl-BA", "Српски (Босна и Херцеговина)", "Serbian (Cyrillic, Bosnia and Herzegovina)"],
        0x301A : ["sr-Cyrl-ME", "Српски (Црна Гора)", "Serbian (Cyrillic, Montenegro)"],
        0x0C1A : ["sr-Cyrl-CS", "Српски (Србија и Црна Гора (Претходно))", "Serbian (Cyrillic, Serbia and Montenegro (Former))"],
        0x281A : ["sr-Cyrl-RS", "Српски (Србија)", "Serbian (Cyrillic, Serbia)"],
        0x701A : ["sr-Latn", "Srpski (Latinica)"],
        0x181A : ["sr-Latn-BA", "Srpski (Bosna i Hercegovina)", "Serbian (Latin, Bosnia and Herzegovina)"],
        0x2C1A : ["sr-Latn-ME", "Srpski (Crna Gora)", "Serbian (Latin, Montenegro)"],
        0x081A : ["sr-Latn-CS", "Srpski (Srbija i Crna Gora (Prethodno))", "Serbian (Latin, Serbia and Montenegro (Former))"],
        0x241A : ["sr-Latn-RS", "Srpski (Srbija, Latinica)", "Serbian (Latin, Serbia)"],
        0x006C : ["nso", "Sesotho sa Leboa"],
        0x046C : ["nso-ZA", "Sesotho sa Leboa (Afrika Borwa)", "Sesotho sa Leboa (South Africa)"],
        0x0032 : ["tn", "Setswana"],
        0x0432 : ["tn-ZA", "Setswana (Aforika Borwa)", "Setswana (South Africa)"],
        0x005B : ["si", "සිංහ"],
        0x045B : ["si-LK", "සිංහල (ශ්‍රී ලංකාව)", "Sinhala (Sri Lanka)"],
        0x001B : ["sk", "Slovenčina"],
        0x041B : ["sk-SK", "Slovenčina (Slovenská republika)", "Slovak (Slovakia)"],
        0x0024 : ["sl", "Slovenski"],
        0x0424 : ["sl-SI", "Slovenski (Slovenija)", "Slovenian (Slovenia)"],
        0x000A : ["es", "Español"],
        0x2C0A : ["es-AR", "Español (Argentina)", "Spanish (Argentina)"],
        0x400A : ["es-BO", "Español (Bolivia)", "Spanish (Bolivia)"],
        0x340A : ["es-CL", "Español (Chile)", "Spanish (Chile)"],
        0x240A : ["es-CO", "Español (Colombia)", "Spanish (Colombia)"],
        0x140A : ["es-CR", "Español (Costa Rica)", "Spanish (Costa Rica)"],
        0x1C0A : ["es-DO", "Español (República Dominicana)", "Spanish (Dominican Republic)"],
        0x300A : ["es-EC", "Español (Ecuador)", "Spanish (Ecuador)"],
        0x440A : ["es-SV", "Español (El Salvador)", "Spanish (El Salvador)"],
        0x100A : ["es-GT", "Español (Guatemala)", "Spanish (Guatemala)"],
        0x480A : ["es-HN", "Español (Honduras)", "Spanish (Honduras)"],
        0x080A : ["es-MX", "Español (México)", "Spanish (Mexico)"],
        0x4C0A : ["es-NI", "Español (Nicaragua)", "Spanish (Nicaragua)"],
        0x180A : ["es-PA", "Español (Panamá)", "Spanish (Panama)"],
        0x3C0A : ["es-PY", "Español (Paraguay)", "Spanish (Paraguay)"],
        0x280A : ["es-PE", "Español (Perú)", "Spanish (Peru)"],
        0x500A : ["es-PR", "Español (Puerto Rico)", "Spanish (Puerto Rico)"],
        0x0C0A : ["es-ES", "Español (España, alfabetización internacional)", "Spanish (Spain)"],
        0x540A : ["es-US", "Español (Estados Unidos)", "Spanish (United States)"],
        0x380A : ["es-UY", "Español (Uruguay)", "Spanish (Uruguay)"],
        0x200A : ["es-VE", "Español (Republica Bolivariana de Venezuela)", "Spanish (Venezuela)"],
        0x040a : ["es-ES_tradnl", "Spanish"],
        0x580a : ["es-419", "Español (América Latina y el Caribe)", "Spanish (Latin America and the Caribbean)"],
        0x5C0a : ["es-CU",  "Español (Cuba)", "Spanish (Cuba)"],
        0x001D : ["sv", "Svenska"],
        0x081D : ["sv-FI", "Svenska (Finland)", "Swedish (Finland)"],
        0x041D : ["sv-SE", "Svenska (Sverige)", "Swedish (Sweden)"],
        0x005A : ["syr", "ܣܘܪܝܝܐ‏"],
        0x045A : ["syr-SY", "ܣܘܪܝܝܐ (سوريا)‏", "Syriac (Syria)"],
        0x0028 : ["tg", "Тоҷикӣ"],
        0x7C28 : ["tg-Cyrl", "Тоҷикӣ"],
        0x0428 : ["tg-Cyrl-TJ", "Тоҷикӣ (Тоҷикистон)", "Tajik (Cyrillic, Tajikistan)"],
        0x005F : ["tzm", "Tamazight"],
        0x7C5F : ["tzm-Latn", "Tamazight (Latin)"],
        0x085F : ["tzm-Latn-DZ", "Tamazight (Djazaïr)", "Tamazight (Latin, Algeria)"],
        0x0049 : ["ta", "தமிழ்"],
        0x0449 : ["ta-IN", "தமிழ் (இந்தியா)", "Tamil (India)"],
        0x0044 : ["tt", "Татар"],
        0x0444 : ["tt-RU", "Татар (Россия)", "Tatar (Russia)"],
        0x004A : ["te", "తెలుగు"],
        0x044A : ["te-IN", "తెలుగు (భారత దేశం)", "Telugu (India)"],
        0x001E : ["th", "ไทย"],
        0x041E : ["th-TH", "ไทย (ไทย)", "Thai (Thailand)"],
        0x0051 : ["bo", "བོད་ཡིག"],
        0x0451 : ["bo-CN", "བོད་ཡིག (ཀྲུང་ཧྭ་མི་དམངས་སྤྱི་མཐུན་རྒྱལ་ཁབ།)", "Tibetan (People's Republic of China)"],
        0x0851 : ["bo-BT", "Tibetan (Bhutan)", "Tibetan (Bhutan)"],
        0x001F : ["tr", "Türkçe"],
        0x041F : ["tr-TR", "Türkçe (Türkiye)", "Turkish (Turkey)"],
        0x0042 : ["tk", "Türkmençe"],
        0x0442 : ["tk-TM", "Türkmençe (Türkmenistan)", "Turkmen (Turkmenistan)"],
        0x0022 : ["uk", "Українська"],
        0x0422 : ["uk-UA", "Українська (Україна)", "Ukrainian (Ukraine)"],
        0x002E : ["hsb", "Hornjoserbšćina"],
        0x042E : ["hsb-DE", "Hornjoserbšćina (Němska)", "Upper Sorbian (Germany)"],
        0x0020 : ["ur", "اُردو‏"],
        0x0420 : ["ur-PK", "اُردو (پاکستان)‏", "Urdu (Islamic Republic of Pakistan)"],
        0x0820 : ["ur-IN", "اُردو (بھارت)‏", "Urdu (India)"],
        0x0080 : ["ug", "ئۇيغۇر يېزىقى‏"],
        0x0480 : ["ug-CN", "ئۇيغۇر يېزىقى (جۇڭخۇا خەلق جۇمھۇرىيىتى)‏", "Uighur (People's Republic of China)"],
        0x7843 : ["uz-Cyrl", "Ўзбек"],
        0x0843 : ["uz-Cyrl-UZ", "Ўзбек (Ўзбекистон)", "Uzbek (Cyrillic, Uzbekistan)"],
        0x0043 : ["uz", "U'zbek"],
        0x7C43 : ["uz-Latn", "U'zbek"],
        0x0443 : ["uz-Latn-UZ", "U'zbek (U'zbekiston Respublikasi)", "Uzbek (Latin, Uzbekistan)"],
        0x002A : ["vi", "Tiếng Việt"],
        0x042A : ["vi-VN", "Tiếng Việt (Việt Nam)", "Vietnamese (Vietnam)"],
        0x0052 : ["cy", "Cymraeg"],
        0x0452 : ["cy-GB", "Cymraeg (y Deyrnas Unedig)", "Welsh (United Kingdom)"],
        0x0088 : ["wo", "Wolof"],
        0x0488 : ["wo-SN", "Wolof (Sénégal)", "Wolof (Senegal)"],
        0x0085 : ["sah", "Саха"],
        0x0485 : ["sah-RU", "Саха (Россия)", "Yakut (Russia)"],
        0x0078 : ["ii", "ꆈꌠꁱꂷ"],
        0x0478 : ["ii-CN", "ꆈꌠꁱꂷ (ꍏꉸꏓꂱꇭꉼꇩ)", "Yi (People's Republic of China)"],
        0x006A : ["yo", "Yoruba"],
        0x046A : ["yo-NG", "Yoruba (Nigeria)", "Yoruba (Nigeria)"],
        0x0466 : ["bin-NG", "Bini (Nigeria)", "Bini (Nigeria)"],
        0x045c : ["chr-US", "ᏣᎳᎩ (ᏌᏊ ᎢᏳᎾᎵᏍᏔᏅ ᏍᎦᏚᎩ)", "Cherokee (United States)"],
        0x0467 : ["fuv-NG", "Nigerian Fulfulde (Nigeria)", "Nigerian Fulfulde (Nigeria)"],
        0x0472 : ["gaz-ET", "West Central Oromo (Ethiopia)", "West Central Oromo (Ethiopia)"],
        0x0474 : ["gn-PY", "Guarani (Paraguay)", "Guarani (Paraguay)"],
        0x0475 : ["haw-US", "ʻŌlelo Hawaiʻi (ʻAmelika Hui Pū ʻIa)", "Hawaiian (United States)"],
        0x0469 : ["ibb-NG", "Ibibio (Nigeria)", "Ibibio (Nigeria)"],
        0x0471 : ["kr-NG", "Kanuri (Nigeria)", "Kanuri (Nigeria)"],
        0x0458 : ["mni", "Manipuri", "Manipuri"],
        0x0455 : ["my-MM", "Burmese (Myanmar)", "Burmese (Myanmar)"],
        0x0479 : ["pap-AN", "Papiamento, Netherlands Antilles", "Papiamento, Netherlands Antilles"],
        0x0846 : ["pa-PK", "Panjabi (Pakistan)", "Panjabi (Pakistan)"],
        0x048d : ["plt-MG", "Plateau Malagasy (Madagascar)", "Plateau Malagasy (Madagascar)"],
        0x0459 : ["sd-IN", "Sindhi (India)", "Sindhi (India)"],
        0x0859 : ["sd-PK", "Sindhi (Pakistan)", "Sindhi (Pakistan)"],
        0x0477 : ["so-SO", "Soomaali (Soomaaliya)", "Somali (Somalia)"],
        0x0430 : ["st-ZA", "Southern Sotho (South Africa)", "Southern Sotho (South Africa)"],
        0x0473 : ["ti-ER", "ትግርኛ (ኤርትራ)", "Tigrinya (Eritrea)"],
        0x0873 : ["ti-ET", "ትግርኛ (ኢትዮጵያ)", "Tigrinya (Ethiopia)"],
        0x045f : ["tmz", "Tamanaku"],
        0x0c5f : ["tmz-MA", "Tamaziɣt n laṭlaṣ (Meṛṛuk)", "Tamanaku (Morocco)"],
        0x0431 : ["ts-ZA", "Tsonga (South Africa)", "Tsonga (South Africa)"],
        0x0433 : ["ven-ZA", "South Africa", "South Africa"]
    };

    var defLanguages = {
        'ar': 0x0401, // ar-SA
        'az': 0x042C, // az-Latn-AZ
        'en': 0x0409, // en-US
        'sr': 0x241A, // sr-Latn-RS
        'zh': 0x0004, // zh-Hans
    };

    var _getLocalLanguageCode = function(name) {
        if (name) {
            for (var code in localLanguageName) {
                if (localLanguageName[code][0].toLowerCase()===name.toLowerCase())
                    return code;
            }
        }
        return null;
    };

    return {
        getLocalLanguageName: function(code) {
            return localLanguageName[code] || ['', code];
        },

        getLocalLanguageCode: _getLocalLanguageCode,

        /**
         * @typedef {Object} LangDisplayName
         * @property {string} native - Native name
         * @property {string} english - English name
         */
        /**
         * @param {string} code - Language code (example - 1025, 1026, ...).
         * @returns {LangDisplayName|null} Object with a native language name (native) and an English name (english).
         * If the English name is missing, returns an object with an empty string for English.
         * Returns `null` if no language code is found.
         */
        getLocalLanguageDisplayName: function(code) {
            var lang = localLanguageName[code];
            if(lang) {
                var nativeName = lang[1];
                var englishName = lang[2];
                function replaceBrackets(text) {
                    let newText = text.replace('(', '– ');
                    let lastCloseBracketIndex = newText.lastIndexOf(')');
                    if (lastCloseBracketIndex !== -1) {
                        newText = newText.slice(0, lastCloseBracketIndex) + newText.slice(lastCloseBracketIndex + 1);
                    }
                    return newText;
                }

                if(englishName) {
                    return { native: replaceBrackets(nativeName), english: replaceBrackets(englishName) };
                } else {
                    return { native: nativeName, english: ''};
                }
            }
            return null;
        },

        getDefaultLanguageCode: function(name) {
            name = name.toLowerCase();
            if (defLanguages[name])
                return defLanguages[name];
            name += '-' + name.toUpperCase();
            return _getLocalLanguageCode(name);
        },

        getLanguages: function() {
            return localLanguageName;
        }
    }
})();
