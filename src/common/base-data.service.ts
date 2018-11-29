import * as createError from 'http-errors';
import * as httpStatus from 'http-status-codes';

export abstract class BaseDataService {
    throwUnProcessableEntity() {
        return Promise.reject(createError(httpStatus.UNPROCESSABLE_ENTITY, 'Unprocessable Entity'));
    }

    throwInternalServerError(err) {
        return Promise.reject(createError(httpStatus.INTERNAL_SERVER_ERROR, err));
    }
}