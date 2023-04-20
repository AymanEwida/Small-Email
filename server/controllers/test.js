const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors')

async function test (req, res) {
    const {
        params: { id: testID }
    } = req;

    if (testID === '1') {
        throw new NotFoundError(`No test with id ${testID}`);
    }

    res.status(StatusCodes.OK).json({ msg: 'Working...' });
}

module.exports = {
    test
}
