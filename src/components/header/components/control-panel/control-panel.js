import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../../../Icon';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const StyledLimk = styled(Link)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	width: 100px;
	height: 32px;
	border: 1px solid black;
	background-color: #eee;
	border-radius: 5px;
`;

const StyledBackButton = styled.span`
	&:hover {
		cursor: pointer;
	}
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	return (
		<div className={className}>
			<RightAligned>
				<StyledLimk to="/login">Войти</StyledLimk>
			</RightAligned>
			<RightAligned>
				<StyledBackButton onClick={() => navigate(-1)}>
					<Icon id="fa-backward" margin="10px 0 0 0" />
				</StyledBackButton>

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
