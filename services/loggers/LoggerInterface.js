let logger;

const loggerInterface = {
    create: function (loggerInterface) {
        logger = loggerInterface;
    },
    logInfo(message) {
        logger.logInfo(message);
    },
}

export {loggerInterface}