const handlerCompleted = (job) => {
    console.info(`node event handling id:${job.id} has completed`);
    job.remove();
};

const handlerFailure = (job, err) => {
    console.info(`node event handling failed for: ${job.id} with ${err}. `);
};

const handlerStalled = (job) => {
    console.info(`node event handling stalled for: ${job.id}`);
};

module.exports = {
    handlerCompleted,
    handlerFailure,
    handlerStalled,
};
