import { useSelector } from 'react-redux';
import { Error } from '../error/error';
import { selectUserRole } from '../../selectors';
import { ERROR } from '../../constants';
import { checkAccess } from '../utils';

export const PrivatContent = ({ children, access, serverError = null }) => {
	const currentRole = useSelector(selectUserRole);
	const accessError = checkAccess(access, currentRole) ? null : ERROR.ACCESS_DENIED;
	const error = serverError || accessError;

	return error ? <Error error={error} /> : children;
};
