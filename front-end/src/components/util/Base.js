/**
 * @param {string} namespace
 */
export function register(namespace) {
    let nsArr = namespace.split('.');
    let nsStr = '', codeStr = '';
    for (let [i, v] of nsArr.entries()) {
        nsStr += (i === 0 ? v : '.' + v);
        codeStr += `if (typeof ${nsStr} === "undefined") { ${nsStr} = {}; }`;
    }
    codeStr && eval(codeStr);
}

/**
 * @param {string} url
 * @param {object?} params
 * @param {function} callback
 */
export function jsonp(url, params, callback) {
    // arguments是类似数组的对象而并不是真正意义上的Javascript数组
    let args = Array.prototype.slice.call(arguments);
    // 移除数组中的第一个元素并返回该元素
    url = args.shift();
    // 移除数组中的最后一个元素并返回该元素
    if (typeof args[args.length - 1] === 'function') {
        callback = args.pop();
    }
    // 如果args中仍有元素, 那就是可选参数, 使用以下方法逐个取出
    params = args.length > 0 ? args.shift() : {};
    Object.assign(params, {callback: `_${Date.now()}`});
    const head = document.querySelector('head');
    const script = document.createElement('script');
    script.src = url + (url.indexOf('?') === -1 ? '?' : '&') + encodeURLParams(params);
    window[params.callback] = (json) => {
        window[params.callback] = undefined; // 执行该函数后需要销毁
        head.removeChild(script);
        callback && callback(json);
    };
    head.appendChild(script);
}

/**
 * @param {array|object} params
 * @returns {string}
 */
export function encodeURLParams(params) {
    const parts = [];

    const add = (key, value) => {
        value = typeof value === 'function' ? value() : (value == null ? '' : value);
        parts[parts.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
    };

    const buildParams = (prefix, obj, add) => {
        if (Array.isArray(obj)) {
            for (let [i, v] of obj.entries()) {
                if (/\[]$/.test(prefix)) {
                    add(prefix, v);
                } else {
                    buildParams(prefix + '[' + (typeof v === 'object' ? i : '') + ']', v, add);
                }
            }
        } else if (typeof obj === 'object') {
            for (let [k, v] of Object.entries(obj)) {
                buildParams(prefix + '[' + k + ']', v, add);
            }
        } else {
            add(prefix, obj);
        }
    };

    // If an array was passed in, assume that it is an array of form elements.
    if (Array.isArray(params)) {
        // Serialize the form elements
        for (let e of params) {
            add(e.name, e.value);
        }
    } else {
        for (let [k, v] of Object.entries(params)) {
            buildParams(k, v, add);
        }
    }

    return parts.join('&').replace(/%20/g, '+');
}

/**
 * @param {string} serializedParams
 * @returns {object}
 * @see https://github.com/jupiterjs/jquerymx/blob/master/lang/string/deparam/deparam.js
 */
export function decodeURLParams(serializedParams) {
    let digitTest = /^\d+$/,
        keyBreaker = /([^[\]]+)|(\[\])/g,
        plus = /\+/g,
        paramTest = /([^?#]*)(#.*)?$/;

    if (!serializedParams || !paramTest.test(serializedParams)) {
        return {};
    }
    let data = {},
        pairs = serializedParams.split('&'),
        current;

    for (let i = 0; i < pairs.length; i++) {
        current = data;
        let pair = pairs[i].split('=');

        // if we find foo=1+1=2
        if (pair.length !== 2) {
            pair = [pair[0], pair.slice(1).join('=')];
        }

        let key = decodeURIComponent(pair[0].replace(plus, ' ')),
            value = decodeURIComponent(pair[1].replace(plus, ' ')),
            parts = key.match(keyBreaker);

        for (let j = 0; j < parts.length - 1; j++) {
            let part = parts[j];
            if (!current[part]) {
                // if what we are pointing to looks like an array
                current[part] = digitTest.test(parts[j + 1]) || parts[j + 1] === '[]' ? [] : {};
            }
            current = current[part];
        }
        let lastPart = parts[parts.length - 1];
        if (lastPart === '[]') {
            current.push(value);
        } else {
            current[lastPart] = value;
        }
    }
    return data;
}
