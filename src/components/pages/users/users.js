import { H2 } from '../../h2';
import { UserRow, TableRow } from './components/';
import { useServerRequest } from '../../../hooks';
import { useEffect, useState } from 'react';
import { PrivatContent } from '../../content';
import { ROLE } from '../../../constants';
import { checkAccess } from '../../utils';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../../selectors';
import styled from 'styled-components';

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const currentRole = useSelector(selectUserRole);
	const [errorMessage, setErrorMessage] = useState(null);
	const requestServer = useServerRequest();
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], currentRole)) {
			return;
		}

		Promise.all([requestServer('fetchUsers'), requestServer('fetchRoles')]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}
				setUsers(usersRes.res);
				setRoles(rolesRes.res);
			},
		);
	}, [requestServer, shouldUpdateUserList, currentRole]);

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], currentRole)) {
			return;
		}
		requestServer('removeUser', userId).then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList);
		});
	};

	return (
		<PrivatContent access={[ROLE.ADMIN]} serverErroe={errorMessage}>
			<div className={className}>
				<H2>Пользователи</H2>
				<div>
					<TableRow>
						<div className="login-column">Логин</div>
						<div className="registred-at-column">Дата регистрации</div>
						<div className="role-column">Роль</div>
					</TableRow>
					{users.map(({ id, login, registredAt, roleId }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registredAt={registredAt}
							userRoleId={roleId}
							roles={roles.filter(
								(role) => role.id !== ROLE.GUEST.toString(),
							)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</div>
		</PrivatContent>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	margin: auto;
	width: 570px;
	font-size: 18px;
`;
