let logger;

const tags = {
    info: '[INFO]',
    warning: '[WARNING]',
    error: '[ERROR]',
}

const loggerService = {
    create: function (loggerInterface) {
        logger = loggerInterface;
    },
    logInfo(message) {
        logger.insertLog(`${tags.info} --${getDateAndTime()}-- ${message}`);
    },
    logError(message) {
        logger.insertLog(`${tags.error} --${getDateAndTime()}-- ${message}`);
    },
    logWarning(message) {
        logger.insertLog(`${tags.warning} --${getDateAndTime()}-- ${message}`);
    },
}

function getDateAndTime() {
    return new Date().toLocaleString('fr-FR');
}

export {loggerService}