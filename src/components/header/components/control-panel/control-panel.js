import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../../../Icon';
import { Button } from '../../../button/button';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const StyledBackIcon = styled.span`
	&:hover {
		cursor: pointer;
	}
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	return (
		<div className={className}>
			<RightAligned>
				<Button>
					<Link to="/login">Войти</Link>
				</Button>
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
