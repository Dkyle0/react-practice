import styled from 'styled-components';
import { Icon } from '../../../../Icon';
import { TableRow } from '../table-row/table-row';
import { useState } from 'react';
import { useServerRequest } from '../../../../../hooks';

const UserRowContainer = ({
	className,
	id,
	login,
	registredAt,
	userRoleId,
	roles,
	onUserRemove,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);
	const requestServer = useServerRequest();
	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const onRoleSave = (id, newUserRoleId) => {
		requestServer('updateUserRole', id, selectedRoleId).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	const isSaveButtonDisabled = selectedRoleId === initialRoleId;

	return (
		<div className={className}>
			<TableRow border={true}>
				<div className="login-column">{login}</div>
				<div className="registred-at-column">{registredAt}</div>
				<div>
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => {
							return (
								<option value={roleId} key={roleId}>
									{roleName}
								</option>
							);
						})}
					</select>
					<div
						className="save-role-button"
						onClick={() => onRoleSave(id, selectedRoleId)}
					>
						<Icon
							id="fa-floppy-o"
							margin="3px 0 0 6px"
							disabled={isSaveButtonDisabled}
						/>
					</div>
					<div />
				</div>
			</TableRow>
			<div className="del-icon" onClick={onUserRemove}>
				<Icon id="fa-trash-o" margin="3px 0 0 6px" />
			</div>
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	margin-top: 10px;

	& select {
		font-size: 16px;
		padding: 0 0 0 5px;
	}

	& .save-role-button {
		width: 21px;
		height: 32px;
	}
`;
