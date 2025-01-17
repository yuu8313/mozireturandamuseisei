// グローバル変数
let passwordLength = 16;
let selectedCharacterSets = new Set();

// 文字セット定義の場所
const CHAR_SETS = {
    漢字JP: { start: 0x4E00, end: 0x9FFF, label: '漢字（JP）' },
    漢字繁体字: [
        { start: 0x3400, end: 0x4DBF },
        { start: 0x20000, end: 0x2A6DF },
        { start: 0x2A700, end: 0x2B73F },
        { start: 0x2B740, end: 0x2B81F },
        { start: 0x2B820, end: 0x2CEAF }
    ],
    漢字簡体字: [
        { start: 0x4E00, end: 0x9FFF },
        { start: 0x3400, end: 0x4DBF },
        { start: 0x20000, end: 0x2A6DF }
    ],
    数字アラビア: { start: 0x0030, end: 0x0039 },
    漢数字: { 
        ranges: [
            { start: 0x4E00, end: 0x9FFF }
        ],
        values: {
            "一": "1",
            "二": "2",
            "三": "3",
            "四": "4",
            "五": "5",
            "六": "6",
            "七": "7",
            "八": "8",
            "九": "9",
            "十": "10",
            "百": "100",
            "千": "1000",
            "万": "10000"
        }
    },
    ローマ数字: { start: 0x2160, end: 0x2188 },
    デーヴァナーガリー数字: { start: 0x0966, end: 0x096F },
    ヒンディー数字: { start: 0x0966, end: 0x096F },
    クメール数字: { start: 0x17E0, end: 0x17E9 },
    タイ数字: { start: 0x0E50, end: 0x0E59 },
    エチオピア数字: { start: 0x1369, end: 0x1371 },
    ひらがな: { start: 0x3040, end: 0x309F },
    カタカナ: { start: 0x30A0, end: 0x30FF },
    半角カタカナ: { start: 0xFF66, end: 0xFF9F },
    アルファベット: [
        { start: 0x0041, end: 0x005A },
        { start: 0x0061, end: 0x007A }
    ],
    全角アルファベット: [
        { start: 0xFF21, end: 0xFF3A },
        { start: 0xFF41, end: 0xFF5A }
    ],
    キリル文字: { start: 0x0400, end: 0x04FF },
    アラビア文字: { start: 0x0600, end: 0x06FF },
    ギリシャ文字: { start: 0x0370, end: 0x03FF },
    ヘブライ文字: { start: 0x0590, end: 0x05FF },
    デーヴァナーガリー文字: { start: 0x0900, end: 0x097F },
    ルーン文字: { start: 0x16A0, end: 0x16FF },
    ブラーフミー文字: { start: 0x11000, end: 0x1107F },
    モンゴル文字: { start: 0x1800, end: 0x18AF },
    ミャンマー文字: { start: 0x1000, end: 0x109F },
    タイ文字: { start: 0x0E00, end: 0x0E7F },
    アルメニア文字: { start: 0x0530, end: 0x058F },
    チベット文字: { start: 0x0F00, end: 0x0FFF },
    エチオピア文字: { start: 0x1200, end: 0x137F },
    カナダ音節文字: { start: 0x1400, end: 0x167F },
    絵文字: [
        { start: 0x1F300, end: 0x1F5FF },
        { start: 0x1F600, end: 0x1F64F },
        { start: 0x1F680, end: 0x1F6FF }
    ],
    絵文字国旗: { start: 0x1F1E6, end: 0x1F1FF },
    特殊記号: [
        { start: 0x2000, end: 0x206F },
        { start: 0x2070, end: 0x209F },
        { start: 0x20A0, end: 0x20CF }
    ],
    ンコ文字: { start: 0x07C0, end: 0x07FF },
    ヴァイ文字: { start: 0xA500, end: 0xA63F },
    バンバラ文字: { start: 0x07C0, end: 0x07FF },
    ターナ文字: { start: 0x0780, end: 0x07BF },
    カヤーリ文字: { start: 0xA900, end: 0xA92F },
    リス文字: { start: 0xA4D0, end: 0xA4FF },
    チャンスー文字: { start: 0xAA00, end: 0xAA5F },
    ジャワ文字: { start: 0xA980, end: 0xA9DF },
    シッダマートリカー文字: { start: 0x11580, end: 0x115FF },
    グランタ文字: { start: 0x11300, end: 0x1137F },
    シャーラダー文字: { start: 0x11180, end: 0x111DF },
    タクリー文字: { start: 0x11680, end: 0x116CF },
    ウガリット文字: { start: 0x10380, end: 0x1039F },
    フェニキア文字: { start: 0x10900, end: 0x1091F },
    古ペルシア楔形文字: { start: 0x103A0, end: 0x103DF },
    エラム文字: { start: 0x12480, end: 0x1254F },
    エジプトヒエログリフ: { start: 0x13000, end: 0x1342F },
    グラゴル文字: { start: 0x2C00, end: 0x2C5F },
    ゴート文字: { start: 0x10330, end: 0x1034F },
    オガム文字: { start: 0x1680, end: 0x169F },
    タガログ文字: { start: 0x1700, end: 0x171F },
    ブヒッド文字: { start: 0x1740, end: 0x175F },
    ハヌノオ文字: { start: 0x1720, end: 0x173F },
    チェロキー文字: { start: 0x13A0, end: 0x13FF },
    オセージ文字: { start: 0x104B0, end: 0x104FF },
    カロシュティ文字: { start: 0x10A00, end: 0x10A5F },
    マンダ文字: { start: 0x0840, end: 0x085F },
    サマリタン文字: { start: 0x0800, end: 0x083F },
    バリ文字: { start: 0x1B00, end: 0x1B7F },
    ライティ文字: { start: 0xA930, end: 0xA95F },
    オルチキ文字: { start: 0x1C50, end: 0x1C7F },
    すべて: { start: 0x0000, end: 0x10FFFF }
};

// DOM要素
const passwordOutput = document.getElementById('passwordOutput');
const unicodeOutput = document.getElementById('unicodeOutput');
const lengthInput = document.getElementById('passwordLength');
const generateButton = document.getElementById('generateButton');
const copyButton = document.getElementById('copyButton');
const copyUnicodeButton = document.getElementById('copyUnicodeButton');
const toast = document.getElementById('toast');
const charsetContainer = document.getElementById('charset-container');
const deselectAllButton = document.getElementById('deselectAllButton');

// パスワードの長さ入力処理
lengthInput.addEventListener('input', (e) => {
    const value = e.target.value;
    if (value === '' || isNaN(value)) {
        e.target.value = '16';
        passwordLength = 16;
    } else {
        passwordLength = Math.max(1, parseInt(value));
        e.target.value = passwordLength.toString();
    }
});

// すべて選択解除ボタンの処理
deselectAllButton.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('#charset-container input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    selectedCharacterSets.clear();
    showToast('すべての選択を解除しました');
});

// 文字セット選択UIの生成
function createCharsetSelectors() {
    Object.entries(CHAR_SETS).forEach(([key, value]) => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `charset-${key}`;
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                selectedCharacterSets.add(key);
            } else {
                selectedCharacterSets.delete(key);
            }
        });
        
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(key));
        charsetContainer.appendChild(label);
    });
}

// Unicode範囲から文字を生成する関数
function generateCharFromRange(start, end) {
    const codePoint = Math.floor(Math.random() * (end - start + 1)) + start;
    try {
        return String.fromCodePoint(codePoint);
    } catch (e) {
        return '';
    }
}

// パスワード生成関数
function generatePassword() {
    if (selectedCharacterSets.size === 0) {
        showToast('少なくとも1つの文字セットを選択してください');
        return '';
    }

    let password = '';
    let unicodeValues = [];
    const selectedSets = Array.from(selectedCharacterSets);

    while (password.length < passwordLength) {
        const setKey = selectedSets[Math.floor(Math.random() * selectedSets.length)];
        const charSet = CHAR_SETS[setKey];

        if (setKey === '漢数字') {
            const keys = Object.keys(charSet.values);
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            password += randomKey;
            unicodeValues.push(randomKey.codePointAt(0).toString(16).toUpperCase());
        } else if (Array.isArray(charSet)) {
            const range = charSet[Math.floor(Math.random() * charSet.length)];
            const char = generateCharFromRange(range.start, range.end);
            if (char) {
                password += char;
                unicodeValues.push(char.codePointAt(0).toString(16).toUpperCase());
            }
        } else if (charSet.start !== undefined) {
            const char = generateCharFromRange(charSet.start, charSet.end);
            if (char) {
                password += char;
                unicodeValues.push(char.codePointAt(0).toString(16).toUpperCase());
            }
        }
    }

    // Unicode値の表示を更新
    if (password) {
        const kansuujiValues = selectedCharacterSets.has('漢数字') ? 
            JSON.stringify(CHAR_SETS.漢数字.values, null, 2) : '';
        
        unicodeOutput.value = `Unicode値: ${unicodeValues.join(', ')}\n\n` +
            (kansuujiValues ? `漢数字マッピング:\n${kansuujiValues}` : '');
    }

    return password;
}

// スライダーのイベントリスナー
lengthInput.addEventListener('input', (e) => {
    passwordLength = parseInt(e.target.value);
});

// 生成ボタンのイベントリスナー
generateButton.addEventListener('click', () => {
    const password = generatePassword();
    if (password) {
        passwordOutput.value = password;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showToast('パスワードを生成しました');
    }
});

// コピーボタンのイベントリスナー
copyButton.addEventListener('click', () => {
    if (!passwordOutput.value) {
        showToast('コピーするパスワードがありません');
        return;
    }

    navigator.clipboard.writeText(passwordOutput.value)
        .then(() => showToast('クリップボードにコピーしました'))
        .catch(() => showToast('コピーに失敗しました'));
});

// Unicode値コピーボタンのイベントリスナー
copyUnicodeButton.addEventListener('click', () => {
    if (!unicodeOutput.value) {
        showToast('コピーするUnicode値がありません');
        return;
    }

    navigator.clipboard.writeText(unicodeOutput.value)
        .then(() => showToast('Unicode値をクリップボードにコピーしました'))
        .catch(() => showToast('コピーに失敗しました'));
});

// トースト通知表示関数
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// 初期化
window.addEventListener('load', () => {
    createCharsetSelectors();
    const password = generatePassword();
    if (password) {
        passwordOutput.value = password;
    }
});
