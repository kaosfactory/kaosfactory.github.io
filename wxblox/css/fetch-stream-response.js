class StreamResponseError extends Error {
    constructor(message, details) {
        super(message);
        this.details = details;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

const fetchStreamedResponse = async (options) => {
    let {
        url,
        data,
        messageListener,
        errorHandler,
        method = 'GET',
        headers = {'Content-Type': 'application/json'},
        timeout = 120000
    } = options;

    // Convert data to query string for GET requests
    if (method === 'GET' && data) {
        const queryParams = new URLSearchParams(data).toString();
        url += '?' + queryParams;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const fetchOptions = {
            method,
            headers,
            signal: controller.signal,
        };

        // Stringify data for POST requests
        if (method === 'POST' && data) {
            fetchOptions.body = JSON.stringify(data);
        }

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            const error = new StreamResponseError('Failed to fetch data', response.status);
            return {success: false, error: error};
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done, value;

        while (!done) {
            ({value, done} = await reader.read());
            const text = decoder.decode(value);
            if (messageListener(text, done) === false) {
                await reader.cancel();
                break;
            }
        }
        return {success: true};
    } catch (error) {
        const apiError = new StreamResponseError('Failed to fetch data', error);
        if (errorHandler) {
            errorHandler(apiError);
        }
        return {success: false, error: apiError};
    } finally {
        clearTimeout(timeoutId);
    }
};

