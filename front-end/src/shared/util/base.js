export const Base = {
    resolveURLParam(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [undefined, ''])[1].replace(/\+/g, '%20')) || null;
    }
};
