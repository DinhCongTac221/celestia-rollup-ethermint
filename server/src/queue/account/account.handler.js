const handlerCompleted = (job) => {
    console.info(`account event handling id:${job.id} has completed`);
    job.remove();
};

const handlerFailure = (job, err) => {
    console.info(`account event handling failed for: ${job.id} with ${err}. `);
};

const handlerStalled = (job) => {
    console.info(`account event handling stalled for: ${job.id}`);
};

module.exports = {
    handlerCompleted,
    handlerFailure,
    handlerStalled,
};
