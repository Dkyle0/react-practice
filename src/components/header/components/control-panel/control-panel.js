import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../../../Icon';
import { Button } from '../../../button/button';
import { ROLE } from '../../../../bff/constants/role';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectUserRole,
	selectUserLogin,
	selectUserSession,
} from '../../../../selectors';
import { logout } from '../../../../actions';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	font-size: 18px;
	font-weight: bold;
`;

const StyledBackIcon = styled.span`
	display: flex;
	&:hover {
		cursor: pointer;
	}
`;

const ControlPanelContainer = ({ className }) => {
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const session = useSelector(selectUserSession);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">Войти</Link>
					</Button>
				) : (
					<>
						<div>{login}</div>
						<StyledBackIcon onClick={() => dispatch(logout(session))}>
							<Icon id="fa-sign-out" margin="0 0 0 10px" />
						</StyledBackIcon>
					</>
				)}
			</RightAligned>
			<RightAligned>
				<StyledBackIcon onClick={() => navigate(-1)}>
					<Icon id="fa-backward" margin="10px 0 0 0" />
				</StyledBackIcon>

				<Link to="/post">
					<Icon id="fa-file-text-o" margin="10px 0 0 17px" />
				</Link>
				<Link to="/users">
					<Icon id="fa-users" margin="10px 0 0 17px" />
				</Link>
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;
