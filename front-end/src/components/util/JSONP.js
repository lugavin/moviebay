/**
 * @param {array|object} params
 * @returns {string}
 */
function encodeURLParams(params) {
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
 * @param {string} url
 * @param {object?} params
 * @param {function} callback
 */
const get = function (url, params, callback) {
    // arguments是类似数组的对象而并不是真正意义上的Javascript数组
    let args = Array.prototype.slice.call(arguments);
    // 移除数组中的第一个元素并返回该元素
    url = args.shift();
    // 移除数组中的最后一个元素并返回该元素
    if (typeof args[args.length - 1] === 'function') {
        callback = args.pop();
    }
    // 如果args中仍有元素, 那就是可选参数, 使用以下方法逐个取出
    params = args.length > 0 ? args.shift() : null;

    if (params) {
        url = url + (url.indexOf('?') === -1 ? '?' : '&') + encodeURLParams(params);
    }
    let match = /callback=(\w+)/.exec(url);
    let name = match && match[1] ? match[1] : 'jsonpCallback';
    const head = document.querySelector('head');
    const script = document.createElement('script');
    script.src = url + (url.indexOf('?') === -1 ? '?' : '&') + 'callback=' + name;
    window[name] = (json) => {
        window[name] = undefined; // 执行该函数后需要销毁
        head.removeChild(script);
        callback && callback(json);
    };
    head.appendChild(script);
};

export default {get}