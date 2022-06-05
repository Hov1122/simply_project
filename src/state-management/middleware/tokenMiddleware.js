export default function tokenMiddleware({ dispatch, getState }) {
    return next => async (action) => {
        if(action.type.startsWith('LOGIN')) {
            return next(action);
        }

        const token = getState().auth.token;

        action.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }}